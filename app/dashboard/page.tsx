"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, Clock, AlertCircle, CheckCircle2, MoreHorizontal, Loader2, Users, DollarSign } from "lucide-react"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { useAuth } from "@/contexts/AuthContext"
import { AnalyticsHub } from "@/components/dashboard/analytics-hub"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, where, limit, orderBy, updateDoc, doc, serverTimestamp } from "firebase/firestore"
import { toast } from "sonner"

export default function DashboardPage() {
    const { user } = useAuth()
    const firstName = user?.displayName ? user.displayName.split(' ')[0] : "Team"

    const [stats, setStats] = useState([
        { label: "Active Projects", value: "...", trend: "Live", icon: Clock, color: "text-blue-400" },
        { label: "Team Members", value: "...", trend: "Online", icon: Users, color: "text-amber-400" },
        { label: "Fund Requests", value: "...", trend: "Pending", icon: DollarSign, color: "text-emerald-400" },
    ])
    const [recentProjects, setRecentProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 1. Projects Count & Recent List
        const qRecent = query(collection(db, "projects"), orderBy("createdAt", "desc"), limit(5))
        const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
            setStats(prev => prev.map(s => s.label === "Active Projects" ? { ...s, value: snapshot.size.toString() } : s))
            setLoading(false)
        })

        const unsubRecent = onSnapshot(qRecent, (snapshot) => {
            const projs: any[] = []
            snapshot.forEach(doc => {
                const data = doc.data()
                projs.push({
                    id: doc.id,
                    ...data,
                    progress: Math.min(Math.floor(((data.spent || 0) / (data.budget || 1)) * 100), 100)
                })
            })
            setRecentProjects(projs)
        })

        // 2. Presence Count
        const unsubPresence = onSnapshot(query(collection(db, "presence"), where("status", "==", "online")), (snapshot) => {
            const count = snapshot.size
            setStats(prev => prev.map(s => s.label === "Team Members" ? { ...s, value: count.toString() } : s))
        })

        // 3. Pending Requests
        const unsubRequests = onSnapshot(query(collection(db, "fund_requests"), where("status", "==", "pending")), (snapshot) => {
            const count = snapshot.size
            setStats(prev => prev.map(s => s.label === "Fund Requests" ? { ...s, value: count.toString() } : s))
        })

        return () => {
            unsubProjects()
            unsubRecent()
            unsubPresence()
            unsubRequests()
        }
    }, [])

    const PROJECT_STATUSES = ["Discovery", "Planning", "Production", "Review", "Delivered"]

    const handleUpdateStatus = async (projectId: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "projects", projectId), {
                status: newStatus,
                updatedAt: serverTimestamp()
            })
            toast.success("Status updated")
        } catch (e) {
            toast.error("Update failed")
        }
    }

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div>
                <h2 className="text-3xl font-light tracking-tight">Operations Overview</h2>
                <p className="text-muted-foreground text-sm font-body mt-1">
                    Welcome back, {firstName}. Here's what's happening at Tavari today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-card border border-border/50 p-6 rounded-lg shadow-sm hover:border-border transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold">{stat.value}</h3>
                            <span className="text-xs text-muted-foreground">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analytics Hub */}
            <AnalyticsHub />

            {/* Recent Activity / Projects */}
            <div className="bg-card border border-border/50 rounded-lg shadow-sm">
                <div className="p-6 border-b border-border/50 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Recent Projects</h3>
                    <button className="text-sm text-primary hover:underline flex items-center gap-1">
                        View All <ArrowUpRight className="h-3 w-3" />
                    </button>
                </div>
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted/30 text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4">Client / Project</th>
                                <th className="px-6 py-4">Lead</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Financials</th>
                                <th className="px-6 py-4">Deadline</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {recentProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{project.client}</div>
                                        <div className="text-xs text-muted-foreground">{project.project}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                                                {project.lead?.split(' ').map((n: string) => n[0]).join('') || '?'}
                                            </div>
                                            <span className="text-muted-foreground">{project.lead?.split(' ')[0] || 'Unassigned'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                                            {project.project.split('&')[0].trim() || "General"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 w-32">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">Spent: MK{project.spent?.toLocaleString()}</span>
                                                <span className="font-medium text-foreground">MK{project.budget?.toLocaleString()}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${(project.spent / project.budget) > 0.9 ? 'bg-red-500' :
                                                        (project.spent / project.budget) > 0.7 ? 'bg-amber-500' : 'bg-emerald-500'
                                                        }`}
                                                    style={{ width: `${Math.min((project.spent / project.budget) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                                        {project.deadline}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className="bg-transparent border-none p-0 text-xs font-medium focus:ring-0 cursor-pointer hover:underline"
                                            value={project.status}
                                            onChange={(e) => handleUpdateStatus(project.id, e.target.value)}
                                        >
                                            {PROJECT_STATUSES.map(status => (
                                                <option key={status} value={status} className="bg-card text-foreground">
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="mt-1">
                                            <StatusBadge status={project.status} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-muted-foreground hover:text-foreground">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        "Discovery": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "Planning": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "Production": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "Review": "bg-orange-500/10 text-orange-400 border-orange-500/20",
        "Delivered": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    }

    const defaultStyle = "bg-muted text-muted-foreground border-border"

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || defaultStyle}`}>
            {status}
        </span>
    )
}
