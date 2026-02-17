"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, MoreHorizontal, Plus, Loader2 } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, query, onSnapshot, orderBy, where, serverTimestamp, addDoc, updateDoc, doc } from "firebase/firestore"
import { toast } from "sonner"
import { DEPARTMENTS, getDepartmentName } from "@/lib/constants"
import { useAuth } from "@/contexts/AuthContext"

// Firestore Projects Page

export default function ProjectsPage() {
    const searchParams = useSearchParams()
    const departmentFilter = searchParams.get("type")

    const { user } = useAuth()
    const [userProfile, setUserProfile] = useState<any>(null)
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newProject, setNewProject] = useState({
        client: "",
        project: "",
        department: "design",
        lead: "",
        budget: "",
        deadline: ""
    })

    useEffect(() => {
        if (!user) return
        const unsub = onSnapshot(doc(db, "profiles", user.uid), (snap) => {
            if (snap.exists()) {
                const data = snap.data()
                setUserProfile(data)
                setNewProject(prev => ({ ...prev, department: data.department || "design" }))
            }
        }, (error) => {
            console.error("Firestore Profile Error:", error)
        })
        return () => unsub()
    }, [user])

    const isPowerUser = ['admin', 'CEO', 'Finance Manager'].includes(userProfile?.role)
    const canEditDepartment = (deptId: string) => {
        if (isPowerUser) return true
        return userProfile?.department === deptId
    }

    const isViewOnly = departmentFilter ? !canEditDepartment(departmentFilter) : false

    const handleSeedData = async () => {
        const mockProjs = [
            { client: "Nebula Tech", project: "Rebrand & Website", department: "strategy", lead: "Godfrey Kambewa", status: "Production", deadline: "Feb 15, 2026", budget: 12000000, spent: 8500000, createdAt: serverTimestamp() },
            { client: "Malawi Tourism", project: "Destination Campaign", department: "campaigns", lead: "Lumbani Phiri", status: "Review", deadline: "Feb 12, 2026", budget: 25000000, spent: 22100000, createdAt: serverTimestamp() },
            { client: "Music Video: 'Roots'", project: "Video Production", department: "production", lead: "Lumbani Phiri", status: "Planning", deadline: "Apr 15, 2026", budget: 18000000, spent: 1500000, createdAt: serverTimestamp() },
        ]

        try {
            for (const p of mockProjs) {
                await addDoc(collection(db, "projects"), p)
            }
            toast.success("Seeded successfully")
        } catch (e) {
            toast.error("Seed failed")
        }
    }

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await addDoc(collection(db, "projects"), {
                ...newProject,
                budget: parseFloat(newProject.budget),
                spent: 0,
                status: "Discovery",
                createdAt: serverTimestamp()
            })
            setIsModalOpen(false)
            setNewProject({ client: "", project: "", department: "design", lead: "", budget: "", deadline: "" })
            toast.success("Project created successfully")
        } catch (e) {
            toast.error("Failed to create project")
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        let q = query(collection(db, "projects"))

        if (departmentFilter) {
            // Handle 'events' type that includes 'merch'
            if (departmentFilter === 'events') {
                // Fetch all and filter client-side for complex departmental logic
                q = query(collection(db, "projects"))
            } else {
                q = query(collection(db, "projects"), where("department", "==", departmentFilter))
            }
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let projs: any[] = []
            snapshot.forEach((doc) => {
                projs.push({ id: doc.id, ...doc.data() })
            })

            // Special handling for legacy 'events' filter that includes 'merch'
            if (departmentFilter === 'events') {
                projs = projs.filter(p => p.department === 'events' || p.department === 'merch')
            }

            // Sort client-side to avoid needing composite indexes
            projs.sort((a, b) => {
                const timeA = a.createdAt?.seconds || 0
                const timeB = b.createdAt?.seconds || 0
                return timeB - timeA
            })

            setProjects(projs)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [departmentFilter])

    const getTitle = () => {
        if (!departmentFilter) return "All Projects"
        return getDepartmentName(departmentFilter)
    }

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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-light tracking-tight">{getTitle()}</h2>
                    <p className="text-muted-foreground text-sm font-body mt-1">
                        {projects.length} active projects in this view
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {projects.length === 0 && !loading && isPowerUser && (
                        <button
                            onClick={handleSeedData}
                            className="px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-md hover:bg-muted/80 transition-colors"
                        >
                            Seed Data
                        </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-md hover:bg-muted/80 transition-colors">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                    {!isViewOnly && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            New Project
                        </button>
                    )}
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
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                    </td>
                                </tr>
                            ) : projects.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground italic">
                                        No projects found.
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
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
                                                    {project.lead.split(' ').map((n: string) => n[0]).join('')}
                                                </div>
                                                <span className="text-muted-foreground">{project.lead.split(' ')[0]}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                                                {getDepartmentName(project.department)}
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
                                            <select
                                                className={`bg-transparent border-none p-0 text-xs font-medium focus:ring-0 ${canEditDepartment(project.department) ? 'cursor-pointer hover:underline' : 'cursor-default opacity-70'}`}
                                                value={project.status}
                                                disabled={!canEditDepartment(project.department)}
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
                                )))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-lg shadow-2xl max-w-md w-full p-8 space-y-6">
                        <div>
                            <h3 className="text-2xl font-light">New Project</h3>
                            <p className="text-muted-foreground text-sm">Initialize a new production workflow.</p>
                        </div>

                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client Name</label>
                                <input
                                    required
                                    className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={newProject.client}
                                    onChange={e => setNewProject({ ...newProject, client: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Title</label>
                                <input
                                    required
                                    className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={newProject.project}
                                    onChange={e => setNewProject({ ...newProject, project: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Department</label>
                                    <select
                                        className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-70 disabled:grayscale-[0.5]"
                                        value={newProject.department}
                                        disabled={!isPowerUser}
                                        onChange={e => setNewProject({ ...newProject, department: e.target.value })}
                                    >
                                        {DEPARTMENTS.map(dept => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lead</label>
                                    <input
                                        required
                                        className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                        value={newProject.lead}
                                        onChange={e => setNewProject({ ...newProject, lead: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Budget (MK)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                                        value={newProject.budget}
                                        onChange={e => setNewProject({ ...newProject, budget: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deadline</label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                        value={newProject.deadline}
                                        onChange={e => setNewProject({ ...newProject, deadline: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
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
