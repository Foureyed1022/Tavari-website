"use client"

import { DollarSign, TrendingUp, TrendingDown, PieChart, CreditCard, Download, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot, limit, getDocs, doc } from "firebase/firestore"
import { useAuth } from "@/contexts/AuthContext"
import { DEPARTMENTS, getDepartmentName } from "@/lib/constants"

export default function FinancePage() {
    const { user } = useAuth()
    const [requests, setRequests] = useState<any[]>([])
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState<any>(null)

    useEffect(() => {
        if (!user) return

        // Fetch User Profile for Department context
        const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
            if (docSnap.exists()) {
                setUserProfile(docSnap.data())
            }
        })

        // Fetch Fund Requests
        const qReq = query(
            collection(db, "fund_requests"),
            orderBy("timestamp", "desc"),
            limit(5)
        )

        const unsubReq = onSnapshot(qReq, (snapshot) => {
            const reqs: any[] = []
            snapshot.forEach((doc) => {
                reqs.push({ id: doc.id, ...doc.data() })
            })
            setRequests(reqs)
        })

        // Fetch Projects for Budget Aggregation
        const qProj = query(collection(db, "projects"))
        const unsubProj = onSnapshot(qProj, (snapshot) => {
            const projs: any[] = []
            snapshot.forEach((doc) => {
                projs.push({ id: doc.id, ...doc.data() })
            })
            setProjects(projs)
            setLoading(false)
        })

        return () => {
            unsubProfile()
            unsubReq()
            unsubProj()
        }
    }, [user])

    // Aggregate Stats
    const totalBudget = projects.reduce((acc, curr) => acc + (curr.budget || 0), 0)
    const totalSpent = projects.reduce((acc, curr) => acc + (curr.spent || 0), 0)
    const remainingBudget = totalBudget - totalSpent

    const deptStats = DEPARTMENTS.map(dept => {
        const deptProjects = projects.filter(p => p.department === dept.id)
        const budget = deptProjects.reduce((acc, curr) => acc + (curr.budget || 0), 0)
        const spent = deptProjects.reduce((acc, curr) => acc + (curr.spent || 0), 0)
        return {
            id: dept.id,
            name: dept.name,
            budget,
            spent,
            remaining: budget - spent,
            color: dept.id === 'strategy' ? 'bg-purple-500' :
                dept.id === 'design' ? 'bg-blue-500' :
                    dept.id === 'production' ? 'bg-amber-500' :
                        dept.id === 'digital' ? 'bg-pink-500' :
                            dept.id === 'pr' ? 'bg-indigo-500' :
                                dept.id === 'events' ? 'bg-emerald-500' :
                                    dept.id === 'talent' ? 'bg-orange-500' :
                                        'bg-slate-500'
        }
    }).filter(d => d.budget > 0) // Only show departments with projects

    const myDeptStats = deptStats.find(d => d.id === userProfile?.department)

    const stats = [
        { label: "Total Budget (Global)", value: `MK ${totalBudget.toLocaleString()}`, change: "Aggregated from all projects", icon: DollarSign, color: "text-emerald-400" },
        { label: "Total Spent", value: `MK ${totalSpent.toLocaleString()}`, change: `${totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% of budget`, icon: CreditCard, color: "text-blue-400" },
        { label: "Remaining", value: `MK ${remainingBudget.toLocaleString()}`, change: "Total available liquidity", icon: PieChart, color: "text-purple-400" },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-light tracking-tight">Financial Overview</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Track project profitability and operational expenses.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/finance/request" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                        <DollarSign className="h-4 w-4" />
                        Request Funds
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm font-medium rounded-md transition-colors">
                        <Download className="h-4 w-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* My Department Summary */}
            {myDeptStats && (
                <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="h-24 w-24 text-primary" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">My Department</span>
                            <h3 className="text-2xl font-light">{myDeptStats.name}</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase mb-1">Budget</p>
                                <p className="font-mono font-medium">MK {myDeptStats.budget.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase mb-1">Spent</p>
                                <p className="font-mono font-medium text-blue-500">MK {myDeptStats.spent.toLocaleString()}</p>
                            </div>
                            <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-primary/20 pt-4 md:pt-0 md:pl-8">
                                <p className="text-xs text-muted-foreground uppercase mb-1">Available</p>
                                <p className="text-xl font-mono font-bold text-emerald-500">MK {myDeptStats.remaining.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* High Level Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-card border border-border/50 p-6 rounded-lg shadow-sm hover:border-border transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1 block">{stat.change}</span>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Departmental Spending Breakdown */}
                <div className="bg-card border border-border/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-6">Departmental Budgets</h3>
                    <div className="space-y-6">
                        {deptStats.map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="font-mono text-muted-foreground">MK {item.spent.toLocaleString()} / MK {item.budget.toLocaleString()}</span>
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${item.color}`}
                                        style={{ width: `${item.budget > 0 ? (item.spent / item.budget) * 100 : 0}%` }}
                                    />
                                </div>
                                <div className="flex justify-end mt-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.remaining > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {item.remaining > 0 ? `Remaining: MK ${item.remaining.toLocaleString()}` : `Overspent: MK ${Math.abs(item.remaining).toLocaleString()}`}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {deptStats.length === 0 && (
                            <p className="text-sm text-muted-foreground italic text-center py-8">No departmental project data available.</p>
                        )}
                    </div>
                </div>

                {/* Recent Activity Column */}
                <div className="space-y-8">
                    {/* Pending Requests */}
                    <div className="bg-card border border-border/50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium">Recent Requests</h3>
                            <Link href="/dashboard/finance/requests" className="text-xs text-primary hover:underline">View All</Link>
                        </div>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex justify-center py-4">
                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                </div>
                            ) : requests.length === 0 ? (
                                <p className="text-xs text-muted-foreground italic text-center py-4">No recent requests.</p>
                            ) : (
                                requests.map((req) => (
                                    <div key={req.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-none">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-[10px] font-bold">
                                                {req.category[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{req.project}</p>
                                                <p className="text-xs text-muted-foreground">{req.userName} • {req.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-mono font-medium block">MK {req.amount.toLocaleString()}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider ${req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                                req.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                                    'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-card border border-border/50 rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-6">Recent Transactions</h3>
                        <div className="space-y-4">
                            <p className="text-xs text-muted-foreground italic text-center py-4">No recent transactions recorded.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
