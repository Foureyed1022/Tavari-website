"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Calendar,
    Settings,
    LogOut,
    Bell,
    Search,
    Menu,
    DollarSign,
    CheckCircle2,
    MessageCircle
} from "lucide-react"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { DashboardGuard } from "@/components/auth/dashboard-guard"
import { useAuth } from "@/contexts/AuthContext"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { DEPARTMENTS } from "@/lib/constants"
import { LivePresence } from "@/components/dashboard/presence"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, onSnapshot, orderBy, limit, doc, updateDoc, writeBatch, getDocs } from "firebase/firestore"
import { toast } from "sonner"
import { useTheme } from "next-themes"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const { user } = useAuth()
    const router = useRouter()
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [notifications, setNotifications] = useState<any[]>([])
    const [userProfile, setUserProfile] = useState<any>(null)
    const [showNotifications, setShowNotifications] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (!user) return

        // 1. Fetch User Profile
        const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
            if (docSnap.exists()) {
                setUserProfile(docSnap.data())
            }
        }, (error) => {
            console.error("Firestore Profile Error:", error)
        })

        return () => unsubProfile()
    }, [user])

    useEffect(() => {
        if (!user) return

        // 2. Subscribe to Notifications
        // Fetch and sort client-side to avoid requiring composite indexes
        const q = query(
            collection(db, "notifications"),
            where("recipientId", "in", [user.uid, 'finance']),
            limit(50)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notifs: any[] = []
            snapshot.forEach((doc) => {
                notifs.push({ id: doc.id, ...doc.data() })
            })

            // Sort client-side
            notifs.sort((a, b) => {
                const timeA = a.timestamp?.seconds || 0
                const timeB = b.timestamp?.seconds || 0
                return timeB - timeA
            })

            setNotifications(notifs.slice(0, 20))
        }, (error) => {
            console.error("Firestore Notifications Error:", error)
            // If the failure is due to 'finance' query, we might want to split the queries
            // but for now, we just handle the error gracefully
            setNotifications([])
        })

        return () => unsubscribe()
    }, [user])

    const unreadCount = notifications.filter(n => !n.read).length

    const handleMarkAllRead = async () => {
        const unread = notifications.filter(n => !n.read)
        if (unread.length === 0) return

        try {
            const batch = writeBatch(db)
            unread.forEach(n => {
                batch.update(doc(db, "notifications", n.id), { read: true })
            })
            await batch.commit()
            setShowNotifications(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            router.push("/login")
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    const userInitials = user?.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : user?.email?.substring(0, 2).toUpperCase() || ".."

    const navItems = [
        { name: "Workspace", href: "/dashboard/attendance", icon: CheckCircle2 },
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
        { name: "Messages", href: "/dashboard/messages", icon: MessageCircle },
        { name: "Finance", href: "/dashboard/finance", icon: DollarSign },
        { name: "Team", href: "/dashboard/team", icon: Users },
        { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    ]

    const deptColors: Record<string, string> = {
        strategy: "bg-purple-500",
        design: "bg-blue-500",
        production: "bg-amber-500",
        digital: "bg-pink-500",
        pr: "bg-indigo-500",
        events: "bg-emerald-500",
        talent: "bg-orange-500",
        consultancy: "bg-slate-500",
    }

    const serviceLines = DEPARTMENTS.map(dept => ({
        name: dept.name.split(' & ')[0], // Shorten for sidebar
        full: dept.name,
        href: `/dashboard/projects?type=${dept.id}`,
        color: deptColors[dept.id] || "bg-slate-500"
    }))

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
                <div className="p-6 border-b border-border flex items-center gap-3">
                    <div className="relative w-8 h-8">
                        <ImageWithFallback
                            src={mounted && theme === 'light' ? "/TAVARI CONNECT - R.png" : "/TAVARI CONNECT -White.png"}
                            alt="Tavari Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <Link href="/" className="block">
                        <h1 className="text-xl font-light tracking-wider flex items-center">TAVARI <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded ml-2 align-middle">OPS</span></h1>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                    {/* Main Nav */}
                    <div className="space-y-1">
                        <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Menu</h3>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-body ${isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Service Lines */}
                    <div className="space-y-1">
                        <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Departments</h3>
                        {serviceLines.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-body text-muted-foreground hover:bg-muted hover:text-foreground group"
                            >
                                <span className={`w-2 h-2 rounded-full ${item.color} opacity-70 group-hover:opacity-100`} />
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Live Presence */}
                    <div className="pt-4 border-t border-border/50">
                        <LivePresence />
                    </div>
                </nav>

                <div className="p-4 border-t border-border mt-auto">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground w-full transition-colors mb-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-destructive w-full transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Trigger (Visible only on small screens) */}
                        <button className="md:hidden text-muted-foreground">
                            <Menu className="h-5 w-5" />
                        </button>
                        {/* Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="bg-muted/50 border-none rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative text-muted-foreground hover:text-foreground transition-colors p-2"
                            >
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
                                    <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-2xl z-30 animate-in slide-in-from-top-2 duration-200">
                                        <div className="p-4 border-b border-border flex items-center justify-between">
                                            <h4 className="text-sm font-semibold">Notifications</h4>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={handleMarkAllRead}
                                                    className="text-[10px] text-primary hover:underline uppercase font-bold tracking-wider"
                                                >
                                                    Mark all as read
                                                </button>
                                            )}
                                        </div>
                                        <div className="max-h-96 overflow-y-auto divide-y divide-border/50">
                                            {notifications.length === 0 ? (
                                                <div className="p-8 text-center text-xs text-muted-foreground italic">
                                                    No notifications yet.
                                                </div>
                                            ) : (
                                                notifications.map((n) => (
                                                    <div
                                                        key={n.id}
                                                        className={`p-4 hover:bg-muted/30 transition-colors cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`}
                                                        onClick={async () => {
                                                            if (!n.read) await updateDoc(doc(db, "notifications", n.id), { read: true })
                                                            if (n.link) router.push(n.link)
                                                            setShowNotifications(false)
                                                        }}
                                                    >
                                                        <p className="text-xs font-semibold mb-1">{n.title}</p>
                                                        <p className="text-[11px] text-muted-foreground leading-relaxed">{n.message}</p>
                                                        <p className="text-[9px] text-muted-foreground/60 mt-2 uppercase tracking-tighter">
                                                            {new Date(n.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary-foreground border border-primary/20">
                            {userInitials}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <DashboardGuard>
                        {children}
                    </DashboardGuard>
                </main>
            </div>
        </div>
    )
}
