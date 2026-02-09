"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy, limit, updateDoc, doc, arrayUnion, getDocs, setDoc, deleteDoc, arrayRemove } from "firebase/firestore"
import { MessageCircle, Send, Search, Hash, Users, Loader2, Plus, Smile, Paperclip, MoreVertical, ThumbsUp, Heart, Laugh, FileText, Image as ImageIcon, Download } from "lucide-react"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { toast } from "sonner"
import { uploadChatAttachment, sendMessageWithAttachment } from "@/lib/chat-attachments"

export default function MessagesPage() {
    const { user } = useAuth()
    const [conversations, setConversations] = useState<any[]>([])
    const [selectedConversation, setSelectedConversation] = useState<any>(null)
    const [messages, setMessages] = useState<any[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [teamMembers, setTeamMembers] = useState<any[]>([])
    const [showNewChat, setShowNewChat] = useState(false)
    const [typingUsers, setTypingUsers] = useState<string[]>([])
    const [showReactions, setShowReactions] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [uploading, setUploading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Fetch team members for DM creation
    useEffect(() => {
        const q = query(collection(db, "profiles"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const members: any[] = []
            snapshot.forEach((doc) => {
                if (doc.id !== user?.uid) {
                    members.push({ id: doc.id, ...doc.data() })
                }
            })
            setTeamMembers(members)
        })
        return () => unsubscribe()
    }, [user])

    // Fetch conversations
    useEffect(() => {
        if (!user) return

        const q = query(
            collection(db, "conversations"),
            where("participants", "array-contains", user.uid)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const convos: any[] = []
            snapshot.forEach((doc) => {
                convos.push({ id: doc.id, ...doc.data() })
            })

            // Sort by last message timestamp
            convos.sort((a, b) => {
                const timeA = a.lastMessage?.timestamp?.seconds || 0
                const timeB = b.lastMessage?.timestamp?.seconds || 0
                return timeB - timeA
            })

            setConversations(convos)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    // Fetch messages for selected conversation
    useEffect(() => {
        if (!selectedConversation) return

        const q = query(
            collection(db, "messages"),
            where("conversationId", "==", selectedConversation.id),
            limit(100)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: any[] = []
            snapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() })
            })

            // Sort by timestamp
            msgs.sort((a, b) => {
                const timeA = a.timestamp?.seconds || 0
                const timeB = b.timestamp?.seconds || 0
                return timeA - timeB
            })

            setMessages(msgs)
            scrollToBottom()
        })

        return () => unsubscribe()
    }, [selectedConversation])

    // Listen for typing indicators
    useEffect(() => {
        if (!selectedConversation || !user) return

        const q = query(
            collection(db, "typing_indicators"),
            where("conversationId", "==", selectedConversation.id)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const typing: string[] = []
            snapshot.forEach((doc) => {
                const data = doc.data()
                if (data.userId !== user.uid) {
                    typing.push(data.userName)
                }
            })
            setTypingUsers(typing)
        })

        return () => unsubscribe()
    }, [selectedConversation, user])

    const handleTyping = async () => {
        if (!selectedConversation || !user) return

        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        // Set typing indicator
        await setDoc(doc(db, "typing_indicators", `${selectedConversation.id}_${user.uid}`), {
            conversationId: selectedConversation.id,
            userId: user.uid,
            userName: user.displayName || user.email,
            timestamp: serverTimestamp()
        })

        // Remove typing indicator after 3 seconds
        typingTimeoutRef.current = setTimeout(async () => {
            await deleteDoc(doc(db, "typing_indicators", `${selectedConversation.id}_${user.uid}`))
        }, 3000)
    }

    const handleReaction = async (messageId: string, emoji: string) => {
        if (!user) return

        try {
            const msgRef = doc(db, "messages", messageId)
            const msgSnapshot = await getDocs(query(collection(db, "messages"), where("__name__", "==", messageId)))

            if (msgSnapshot.empty) return

            const msgData = msgSnapshot.docs[0].data()
            const reactions = msgData.reactions || []

            // Find existing reaction
            const existingReaction = reactions.find((r: any) => r.emoji === emoji)

            if (existingReaction) {
                // Toggle user's reaction
                if (existingReaction.userIds.includes(user.uid)) {
                    existingReaction.userIds = existingReaction.userIds.filter((id: string) => id !== user.uid)
                    if (existingReaction.userIds.length === 0) {
                        // Remove reaction if no users left
                        await updateDoc(msgRef, {
                            reactions: reactions.filter((r: any) => r.emoji !== emoji)
                        })
                    } else {
                        await updateDoc(msgRef, { reactions })
                    }
                } else {
                    existingReaction.userIds.push(user.uid)
                    await updateDoc(msgRef, { reactions })
                }
            } else {
                // Add new reaction
                await updateDoc(msgRef, {
                    reactions: arrayUnion({ emoji, userIds: [user.uid] })
                })
            }

            setShowReactions(null)
        } catch (error) {
            console.error(error)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !selectedConversation || !user) return

        setUploading(true)
        try {
            const attachment = await uploadChatAttachment(
                file,
                selectedConversation.id,
                user.uid,
                user.displayName || user.email || "Unknown"
            )

            if (attachment) {
                await sendMessageWithAttachment(
                    selectedConversation.id,
                    user.uid,
                    user.displayName || user.email || "Unknown",
                    user.photoURL || null,
                    "",
                    attachment
                )
                toast.success("File uploaded")
            } else {
                toast.error("Upload failed")
            }
        } catch (error) {
            console.error(error)
            toast.error("Upload failed")
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ""
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedConversation || !user) return

        try {
            await addDoc(collection(db, "messages"), {
                conversationId: selectedConversation.id,
                senderId: user.uid,
                senderName: user.displayName || user.email,
                senderPhoto: user.photoURL || null,
                text: newMessage,
                readBy: [user.uid],
                timestamp: serverTimestamp()
            })

            // Update conversation's last message
            await updateDoc(doc(db, "conversations", selectedConversation.id), {
                lastMessage: {
                    text: newMessage,
                    senderId: user.uid,
                    timestamp: serverTimestamp()
                },
                updatedAt: serverTimestamp()
            })

            setNewMessage("")
        } catch (error) {
            console.error(error)
            toast.error("Failed to send message")
        }
    }

    const handleCreateDM = async (recipientId: string, recipientName: string) => {
        if (!user) return

        try {
            // Check if conversation already exists
            const existingConvo = conversations.find(c =>
                c.type === 'dm' &&
                c.participants.includes(recipientId) &&
                c.participants.includes(user.uid)
            )

            if (existingConvo) {
                setSelectedConversation(existingConvo)
                setShowNewChat(false)
                return
            }

            // Create new DM conversation
            const convoRef = await addDoc(collection(db, "conversations"), {
                type: 'dm',
                participants: [user.uid, recipientId],
                participantNames: {
                    [user.uid]: user.displayName || user.email,
                    [recipientId]: recipientName
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })

            setShowNewChat(false)
            toast.success("Conversation created")
        } catch (error) {
            console.error(error)
            toast.error("Failed to create conversation")
        }
    }

    const getConversationName = (convo: any) => {
        if (convo.type === 'dm') {
            const otherUserId = convo.participants.find((id: string) => id !== user?.uid)
            return convo.participantNames?.[otherUserId] || "Unknown"
        }
        if (convo.type === 'project') return `# ${convo.projectName || 'Project'}`
        if (convo.type === 'department') return `# ${convo.departmentName || 'Department'}`
        return "# General"
    }

    const getConversationIcon = (convo: any) => {
        if (convo.type === 'dm') return null
        if (convo.type === 'project') return <Hash className="h-4 w-4" />
        return <Users className="h-4 w-4" />
    }

    // Filter conversations by search query
    const filteredConversations = conversations.filter(convo =>
        getConversationName(convo).toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-4">
            {/* Conversations Sidebar */}
            <div className="w-80 bg-card border border-border/50 rounded-lg flex flex-col">
                <div className="p-4 border-b border-border/50">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-light">Messages</h2>
                        <button
                            onClick={() => setShowNewChat(!showNewChat)}
                            className="p-2 hover:bg-muted rounded-md transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-muted/50 border-none rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* New Chat Panel */}
                {showNewChat && (
                    <div className="p-4 border-b border-border/50 bg-muted/20">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Start New Chat</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {teamMembers.length === 0 ? (
                                <div className="p-4 text-center text-xs text-muted-foreground italic">
                                    No team members available
                                </div>
                            ) : (
                                teamMembers.map((member) => (
                                    <button
                                        key={member.id}
                                        onClick={() => handleCreateDM(member.id, member.displayName)}
                                        className="w-full flex items-center gap-3 p-2 hover:bg-muted rounded-md transition-colors text-left"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                                            {member.displayName?.charAt(0) || "?"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{member.displayName}</p>
                                            <p className="text-xs text-muted-foreground truncate">{member.role || "Team Member"}</p>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center h-32">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : filteredConversations.length === 0 ? (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            {searchQuery ? "No conversations found" : "No conversations yet. Start a new chat!"}
                        </div>
                    ) : (
                        filteredConversations.map((convo) => (
                            <button
                                key={convo.id}
                                onClick={() => setSelectedConversation(convo)}
                                className={`w-full p-4 border-b border-border/30 hover:bg-muted/50 transition-colors text-left ${selectedConversation?.id === convo.id ? 'bg-primary/5' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium flex-shrink-0">
                                        {getConversationIcon(convo) || getConversationName(convo).charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium truncate">{getConversationName(convo)}</p>
                                            {convo.lastMessage?.timestamp && (
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(convo.lastMessage.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {convo.lastMessage?.text || "No messages yet"}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 bg-card border border-border/50 rounded-lg flex flex-col">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-border/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                                    {getConversationIcon(selectedConversation) || getConversationName(selectedConversation).charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-medium">{getConversationName(selectedConversation)}</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {selectedConversation.type === 'dm' ? 'Direct Message' : 'Channel'}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-muted rounded-md transition-colors">
                                <MoreVertical className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => {
                                const isOwn = msg.senderId === user?.uid
                                return (
                                    <div key={msg.id} className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                            {msg.senderName?.charAt(0) || "?"}
                                        </div>
                                        <div className={`flex-1 ${isOwn ? 'text-right' : ''}`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-medium">{msg.senderName}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {msg.timestamp && new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className="group relative inline-block">
                                                <div className={`px-4 py-2 rounded-lg ${isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                                    }`}>
                                                    <p className="text-sm">{msg.text}</p>

                                                    {/* Attachments */}
                                                    {msg.attachments && msg.attachments.length > 0 && (
                                                        <div className="mt-2 space-y-2">
                                                            {msg.attachments.map((att: any, idx: number) => (
                                                                <a
                                                                    key={idx}
                                                                    href={att.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 p-2 bg-background/50 rounded hover:bg-background/80 transition-colors"
                                                                >
                                                                    {att.type.startsWith('image/') ? (
                                                                        <ImageIcon className="h-4 w-4" />
                                                                    ) : (
                                                                        <FileText className="h-4 w-4" />
                                                                    )}
                                                                    <span className="text-xs truncate flex-1">{att.name}</span>
                                                                    <Download className="h-3 w-3" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Reactions */}
                                                {msg.reactions && msg.reactions.length > 0 && (
                                                    <div className="flex gap-1 mt-1">
                                                        {msg.reactions.map((reaction: any, idx: number) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => handleReaction(msg.id, reaction.emoji)}
                                                                className="px-2 py-0.5 bg-muted/50 hover:bg-muted rounded-full text-xs flex items-center gap-1"
                                                            >
                                                                <span>{reaction.emoji}</span>
                                                                <span className="text-[10px] text-muted-foreground">{reaction.userIds.length}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Reaction Button */}
                                                <div className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => setShowReactions(showReactions === msg.id ? null : msg.id)}
                                                        className="p-1 hover:bg-muted rounded-md transition-colors"
                                                    >
                                                        <Smile className="h-3 w-3" />
                                                    </button>
                                                    {showReactions === msg.id && (
                                                        <div className="absolute top-0 right-8 bg-card border border-border rounded-lg shadow-lg p-2 flex gap-2 z-10">
                                                            <button onClick={() => handleReaction(msg.id, '👍')} className="hover:scale-125 transition-transform">👍</button>
                                                            <button onClick={() => handleReaction(msg.id, '❤️')} className="hover:scale-125 transition-transform">❤️</button>
                                                            <button onClick={() => handleReaction(msg.id, '😂')} className="hover:scale-125 transition-transform">😂</button>
                                                            <button onClick={() => handleReaction(msg.id, '🎉')} className="hover:scale-125 transition-transform">🎉</button>
                                                            <button onClick={() => handleReaction(msg.id, '🔥')} className="hover:scale-125 transition-transform">🔥</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Typing Indicator */}
                            {typingUsers.length > 0 && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                    <span>{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-border/50">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    accept="image/*,.pdf,.doc,.docx,.txt"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="p-2 hover:bg-muted rounded-md transition-colors disabled:opacity-50"
                                >
                                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                                </button>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => {
                                        setNewMessage(e.target.value)
                                        handleTyping()
                                    }}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="flex-1 bg-muted/50 border-none rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button className="p-2 hover:bg-muted rounded-md transition-colors">
                                    <Smile className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                            <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-20" />
                            <p className="text-sm">Select a conversation to start messaging</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
