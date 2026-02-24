"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, Calendar, Loader2 } from "lucide-react"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

export default function TeamPage() {
    const { user } = useAuth()
    const [userProfile, setUserProfile] = useState<any>(null)
    const [members, setMembers] = useState<any[]>([])
    const [presence, setPresence] = useState<Record<string, any>>({})
    const [loading, setLoading] = useState(true)

    const isAdmin = userProfile?.role?.toLowerCase() === 'admin'

    useEffect(() => {
        if (!user) return

        const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
            if (docSnap.exists()) setUserProfile(docSnap.data())
        }, (error) => console.error("Team Profile Listener Error:", error))

        const qMembers = query(collection(db, "profiles"), orderBy("displayName", "asc"))
        const unsubMembers = onSnapshot(qMembers, (snapshot) => {
            const teamData: any[] = []
            snapshot.forEach((doc) => {
                teamData.push({ id: doc.id, ...doc.data() })
            })
            setMembers(teamData)
            setLoading(false)
        }, (error) => console.error("Team Members Listener Error:", error))

        const qPresence = query(collection(db, "presence"))
        const unsubPresence = onSnapshot(qPresence, (snapshot) => {
            const presenceMap: Record<string, any> = {}
            snapshot.forEach((doc) => {
                presenceMap[doc.id] = doc.data()
            })
            setPresence(presenceMap)
        }, (error) => console.error("Team Presence Listener Error:", error))

        return () => {
            unsubProfile()
            unsubMembers()
            unsubPresence()
        }
    }, [user])

    const handleUpdateRole = async (memberId: string, newRole: string) => {
        try {
            await updateDoc(doc(db, "profiles", memberId), {
                role: newRole,
                updatedAt: new Date().toISOString()
            })
            toast.success("Role updated successfully")
        } catch (error) {
            console.error(error)
            toast.success("Failed to update role")
        }
    }

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-light tracking-tight">Team Directory</h2>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage member availability and access.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => {
                    const isOnline = presence[member.id]?.status === "online"
                    const activeProject = presence[member.id]?.project
                    const workMode = presence[member.id]?.workMode

                    return (
                        <div key={member.id} className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-border transition-all hover:shadow-md group">
                            <div className="h-32 bg-muted/30 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                                {isOnline && (
                                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider animate-in fade-in zoom-in duration-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        In Session
                                    </div>
                                )}
                            </div>
                            <div className="p-6 relative">
                                <div className="absolute -top-12 left-6">
                                    <div className="relative w-24 h-24 rounded-full border-4 border-card overflow-hidden bg-muted shadow-lg">
                                        {member.photoURL ? (
                                            <ImageWithFallback src={member.photoURL} alt={member.displayName} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-2xl font-light bg-primary/10 text-primary">
                                                {member.displayName?.charAt(0) || "?"}
                                            </div>
                                        )}
                                    </div>
                                    <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-card ${isOnline ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                                </div>

                                <div className="mt-12">
                                    <h3 className="text-lg font-medium">{member.displayName}</h3>
                                    {isAdmin ? (
                                        <select
                                            className="text-sm text-primary font-medium bg-transparent border-none p-0 focus:ring-0 cursor-pointer hover:underline mb-4"
                                            value={member.role || "Team Member"}
                                            onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Producer">Producer</option>
                                            <option value="Creative Director">Creative Director</option>
                                            <option value="Art Director">Art Director</option>
                                            <option value="Project Manager">Project Manager</option>
                                            <option value="Finance Manager">Finance Manager</option>
                                            <option value="Team Member">Team Member</option>
                                        </select>
                                    ) : (
                                        <p className="text-sm text-primary font-medium mb-4">{member.role || "Team Member"}</p>
                                    )}

                                    {isOnline && activeProject && (
                                        <div className="mb-4 bg-muted/50 rounded-md p-3 border border-border/50 animate-in slide-in-from-top-2 duration-300">
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Current Action</p>
                                            <p className="text-xs font-medium truncate capitalize">
                                                {workMode === 'project' ? `Working on: ${activeProject}` : `Doing: ${activeProject}`}
                                            </p>
                                        </div>
                                    )}

                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            {member.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center">
                                                <Phone className="h-4 w-4" />
                                            </div>
                                            {member.phone || "+265 999 123 456"}
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${isOnline ? 'bg-emerald-500/10 text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                                            {isOnline ? "Online Now" : "Currently Offline"}
                                        </span>
                                        <button className="text-xs font-medium text-primary hover:underline">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
