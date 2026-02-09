"use client"

import { useState, useEffect } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from "recharts"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { Loader2, TrendingUp, DollarSign, Briefcase, PieChart as PieIcon, BarChart as BarIcon, Activity } from "lucide-react"
import { DEPARTMENTS, getDepartmentName } from "@/lib/constants"

export function AnalyticsHub() {
    const [projectData, setProjectData] = useState<any[]>([])
    const [requestData, setRequestData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
            const projs: any[] = []
            snapshot.forEach(doc => projs.push(doc.data()))
            setProjectData(projs)
            setLoading(false)
        })

        const unsubRequests = onSnapshot(collection(db, "fund_requests"), (snapshot) => {
            const reqs: any[] = []
            snapshot.forEach(doc => reqs.push(doc.data()))
            setRequestData(reqs)
        })

        return () => {
            unsubProjects()
            unsubRequests()
        }
    }, [])

    if (loading) {
        return (
            <div className="h-64 flex items-center justify-center bg-card border border-border/50 rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    // Process data for charts
    const budgetVsSpent = projectData.map(p => ({
        name: p.project.length > 15 ? p.project.substring(0, 12) + "..." : p.project,
        budget: p.budget || 0,
        spent: p.spent || 0
    })).slice(0, 5)

    const statusCounts = projectData.reduce((acc: any, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1
        return acc
    }, {})

    const pieData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }))

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#f97316']

    const deptUtilization = DEPARTMENTS.map(dept => {
        const deptProjects = projectData.filter(p => p.department === dept.id)
        return {
            name: dept.name.split(' & ')[0],
            budget: deptProjects.reduce((sum, p) => sum + (p.budget || 0), 0),
            count: deptProjects.length
        }
    }).filter(d => d.count > 0)

    return (
        <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Budget vs Spent Bar Chart */}
                <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-emerald-400" />
                            <h3 className="font-medium">Budget vs. Actual Spending</h3>
                        </div>
                    </div>
                    <div className="h-64 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={budgetVsSpent} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="budget" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="spent" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Project Status Pie Chart */}
                <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <PieIcon className="h-4 w-4 text-blue-400" />
                            <h3 className="font-medium">Project Pipeline Status</h3>
                        </div>
                    </div>
                    <div className="h-64 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-col gap-2 text-xs ml-4 min-w-[120px]">
                            {pieData.map((entry, index) => (
                                <div key={entry.name} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="text-muted-foreground">{entry.name}: {entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Departmental Utilization */}
            <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-purple-400" />
                        <h3 className="font-medium">Departmental Budget Allocation</h3>
                    </div>
                </div>
                <div className="h-72 w-full text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={deptUtilization} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="rgba(255,255,255,0.05)" />
                            <XAxis type="number" axisLine={false} tickLine={false} hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="budget" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={25} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
