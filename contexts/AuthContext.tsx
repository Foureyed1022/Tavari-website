"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
interface AuthContextType {
    user: User | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })
const ROLE_MAPPINGS: Record<string, string> = {
    "admin@tavariconnect.site": "admin",
    "ceo@tavariconnect.site": "CEO",
    "operations@tavariconnect.site": "Operations",
    "victorroman@tavariconnect.site": "Finance Manager",
    "senzangakhona@tavariconnect.site": "admin"
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && user.email) {
                const assignedRole = ROLE_MAPPINGS[user.email.toLowerCase()]
                if (assignedRole) {
                    try {
                        const profileRef = doc(db, "profiles", user.uid)
                        const profileSnap = await getDoc(profileRef)
                        if (!profileSnap.exists() || profileSnap.data()?.role !== assignedRole) {
                            await setDoc(profileRef, {
                                role: assignedRole,
                                email: user.email,
                                displayName: user.displayName || user.email.split('@')[0],
                                updatedAt: new Date().toISOString()
                            }, { merge: true })
                        }
                    } catch (error) {
                        console.error("Error auto-assigning role:", error)
                    }
                }
            }
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
