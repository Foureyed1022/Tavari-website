"use client"

import { DollarSign, TrendingUp, TrendingDown, PieChart, CreditCard, Download } from "lucide-react"
import Link from "next/link"

export default function FinancePage() {
    const stats = [
        { label: "Total Budget (YTD)", value: "MK 145,000,000", change: "+12% vs last year", icon: DollarSign, color: "text-emerald-400" },
        { label: "Total Spent", value: "MK 98,450,000", change: "68% of budget", icon: CreditCard, color: "text-blue-400" },
        { label: "Remaining", value: "MK 46,550,000", change: "Healthy", icon: PieChart, color: "text-purple-400" },
    ]

    const expenses = [
        { category: "Production Gear", amount: 45000000, color: "bg-blue-500" },
        { category: "Talent & Crew", amount: 28000000, color: "bg-purple-500" },
        { category: "Travel & Logistics", amount: 15450000, color: "bg-amber-500" },
        { category: "Software & Licenses", amount: 5000000, color: "bg-emerald-500" },
        { category: "Office & Admin", amount: 5000000, color: "bg-slate-500" },
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
                {/* Spending Breakdown */}
                <div className="bg-card border border-border/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-6">Expense Breakdown</h3>
                    <div className="space-y-4">
                        {expenses.map((item) => (
                            <div key={item.category}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{item.category}</span>
                                    <span className="font-mono text-muted-foreground">MK {item.amount.toLocaleString()}</span>
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${item.color}`}
                                        style={{ width: `${(item.amount / 100000000) * 100}%` }} // Rough % based on total
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Column */}
                <div className="space-y-8">
                    {/* Pending Requests */}
                    <div className="bg-card border border-border/50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium">Pending Requests</h3>
                            <button className="text-xs text-primary hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { project: "Urban Culture Festival", item: "Stage Deposit", amount: 2500000, date: "Feb 08" },
                                { project: "Nebula Tech", item: "Premium Fonts", amount: 450000, date: "Feb 07" }
                            ].map((req, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-none">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                            <DollarSign className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{req.project}</p>
                                            <p className="text-xs text-muted-foreground">{req.item} • {req.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-mono font-medium block">MK {req.amount.toLocaleString()}</span>
                                        <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded uppercase tracking-wider">Pending</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-card border border-border/50 rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-6">Recent Transactions</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-none">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Camera Rental - RED Komodo</p>
                                            <p className="text-xs text-muted-foreground">Feb 0{i}, 2026 • Production</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-mono text-foreground">- MK 450,000</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
