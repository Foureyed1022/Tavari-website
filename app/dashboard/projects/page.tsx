"use client"

import { useSearchParams } from "next/navigation"
import { Search, Filter, MoreHorizontal, Plus } from "lucide-react"

// Extended Mock Data
const allProjects = [
    {
        id: "PROJ-24-001",
        client: "Nebula Tech",
        project: "Rebrand & Website",
        department: "strategy",
        lead: "Godfrey Kambewa",
        status: "Production",
        deadline: "Feb 15, 2026",
        budget: 12000000,
        spent: 8500000,
    },
    {
        id: "PROJ-24-005",
        client: "Malawi Tourism",
        project: "Destination Campaign",
        department: "campaigns",
        lead: "Lumbani Phiri",
        status: "Review",
        deadline: "Feb 12, 2026",
        budget: 25000000,
        spent: 22100000,
    },
    {
        id: "PROJ-24-003",
        client: "Urban Culture Festival",
        project: "Event Branding & Merch",
        department: "events", // also fits merch
        lead: "Ishmael Assan",
        status: "Discovery",
        deadline: "Mar 01, 2026",
        budget: 8500000,
        spent: 1200000,
    },
    {
        id: "PROJ-24-008",
        client: "Horizon Finance",
        project: "Corporate Strategy",
        department: "strategy",
        lead: "Godfrey Kambewa",
        status: "Delivered",
        deadline: "Feb 05, 2026",
        budget: 15000000,
        spent: 14800000,
    },
    {
        id: "PROJ-24-012",
        client: "EcoSolutions",
        project: "Sustainability Report",
        department: "design",
        lead: "Martinez Chakwawa",
        status: "Planning",
        deadline: "Feb 28, 2026",
        budget: 5000000,
        spent: 0,
    },
    {
        id: "PROJ-24-015",
        client: "Tavari Merch Drop 1",
        project: "Apparel Collection",
        department: "merch",
        lead: "Ishmael Assan",
        status: "Production",
        deadline: "Mar 10, 2026",
        budget: 4500000,
        spent: 2000000,
    },
    {
        id: "PROJ-24-018",
        client: "Music Video: 'Roots'",
        project: "Video Production",
        department: "production",
        lead: "Lumbani Phiri",
        status: "Planning",
        deadline: "Apr 15, 2026",
        budget: 18000000,
        spent: 1500000,
    },
]

export default function ProjectsPage() {
    const searchParams = useSearchParams()
    const departmentFilter = searchParams.get("type")

    const filteredProjects = departmentFilter
        ? allProjects.filter((p) => p.department === departmentFilter || (departmentFilter === 'events' && p.department === 'merch')) // simplified logic
        : allProjects

    const getTitle = () => {
        switch (departmentFilter) {
            case "strategy": return "Strategy Department"
            case "design": return "Identity & Design"
            case "campaigns": return "Campaigns"
            case "production": return "Production"
            case "events": return "Events & Experiences"
            case "merch": return "Merchandise"
            default: return "All Projects"
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-light tracking-tight">{getTitle()}</h2>
                    <p className="text-muted-foreground text-sm font-body mt-1">
                        {filteredProjects.length} active projects in this view
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-md hover:bg-muted/80 transition-colors">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        New Project
                    </button>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-card border border-border/50 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted/30 text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Client / Project</th>
                                <th className="px-6 py-4">Lead</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Financials (MWK)</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                                        {project.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{project.client}</div>
                                        <div className="text-xs text-muted-foreground">{project.project}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                                                {project.lead.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-muted-foreground">{project.lead.split(' ')[0]}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground capitalize">
                                            {project.department}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 w-36">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">MK{project.spent.toLocaleString()}</span>
                                                <span className="font-medium text-foreground">MK{project.budget.toLocaleString()}</span>
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
                                    <td className="px-6 py-4">
                                        <StatusBadge status={project.status} />
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
