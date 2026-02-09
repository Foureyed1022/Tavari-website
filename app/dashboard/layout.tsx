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
    CheckCircle2
} from "lucide-react"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { DashboardGuard } from "@/components/auth/dashboard-guard"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const navItems = [
        { name: "Workspace", href: "/dashboard/attendance", icon: CheckCircle2 }, // New Workspace Tab for Employees
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
        { name: "Finance", href: "/dashboard/finance", icon: DollarSign },
        { name: "Team", href: "/dashboard/team", icon: Users },
        { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    ]

    const serviceLines = [
        { name: "Strategy", href: "/dashboard/projects?type=strategy", color: "bg-purple-500" },
        { name: "Identity & Design", href: "/dashboard/projects?type=design", color: "bg-blue-500" },
        { name: "Campaigns", href: "/dashboard/projects?type=campaigns", color: "bg-pink-500" },
        { name: "Production", href: "/dashboard/projects?type=production", color: "bg-amber-500" },
        { name: "Events", href: "/dashboard/projects?type=events", color: "bg-emerald-500" },
        { name: "Merchandise", href: "/dashboard/projects?type=merch", color: "bg-cyan-500" },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
                <div className="p-6 border-b border-border flex items-center gap-3">
                    <div className="relative w-8 h-8">
                        <ImageWithFallback src="/TAVARI CONNECT -White.png" alt="Tavari Logo" fill className="object-contain" />
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
                                        ? "bg-primary/10 text-primary-foreground font-medium"
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
                </nav>

                <div className="p-4 border-t border-border mt-auto">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground w-full transition-colors mb-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                    <button className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-destructive w-full transition-colors">
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
                        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary-foreground border border-primary/20">
                            GK
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
