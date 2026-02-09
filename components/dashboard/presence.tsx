"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { User as LucideUser } from "lucide-react"

interface PresenceUser {
    id: string
    name: string
    status: string
    lastSeen: any
    project?: string
}

export function LivePresence() {
    const [activeUsers, setActiveUsers] = useState<PresenceUser[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Query for users who are currently "online" or "clocked-in"
        // In a real app, we'd use Firestore presence or a 'sessions' collection
        const q = query(
            collection(db, "presence"),
            where("status", "==", "online")
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users: PresenceUser[] = []
            snapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() } as PresenceUser)
            })
            setActiveUsers(users)
            setLoading(false)
        }, (error) => {
            console.error("Presence error:", error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    if (loading) return <div className="p-4 text-xs text-muted-foreground animate-pulse">Loading presence...</div>

    return (
        <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Live Team</h3>
            <div className="space-y-1">
                {activeUsers.length === 0 ? (
                    <p className="px-3 text-xs text-muted-foreground italic">No one clocked in.</p>
                ) : (
                    activeUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 transition-colors group">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-card rounded-full"></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{user.project || "Available"}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
