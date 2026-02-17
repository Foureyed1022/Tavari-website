"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, DollarSign, Loader2, Send } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore"
import { toast } from "sonner"
import { DEPARTMENTS } from "@/lib/constants"
import { sendNotification } from "@/lib/notifications"

export default function FundRequestPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [projects, setProjects] = useState<any[]>([])
    const [userProfile, setUserProfile] = useState<any>(null)
    const [formData, setFormData] = useState({
        amount: "",
        projectId: "",
        project: "",
        category: "production",
        description: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return
            try {
                // 1. Fetch Profile
                const profileSnap = await getDoc(doc(db, "profiles", user.uid))
                let profileDept = ""
                let isPowerUser = false
                if (profileSnap.exists()) {
                    const data = profileSnap.data()
                    setUserProfile(data)
                    profileDept = data.department || ""
                    isPowerUser = ['admin', 'CEO', 'Finance Manager'].includes(data.role)
                }

                // 2. Fetch Projects
                const q = query(collection(db, "projects"), orderBy("createdAt", "desc"))
                const querySnapshot = await getDocs(q)
                let projs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as any[]

                // 3. Filter by department if not power user
                if (!isPowerUser && profileDept) {
                    projs = projs.filter(p => p.department === profileDept)
                }

                setProjects(projs)
                if (projs.length > 0) {
                    setFormData(prev => ({ ...prev, projectId: projs[0].id, project: projs[0].project }))
                }
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [user])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        try {
            await addDoc(collection(db, "fund_requests"), {
                userId: user.uid,
                userName: user.displayName || user.email,
                amount: parseFloat(formData.amount),
                projectId: formData.projectId,
                project: formData.project,
                category: formData.category,
                description: formData.description,
                targetDepartment: "finance",
                status: "pending",
                timestamp: serverTimestamp(),
                date: new Date().toLocaleDateString('en-GB')
            })

            // Notify Finance
            await sendNotification(
                'finance',
                'New Fund Request',
                `${user.displayName || user.email} requested MK ${parseFloat(formData.amount).toLocaleString()} for ${formData.project}`,
                'request_new',
                '/dashboard/finance/requests'
            )

            toast.success("Fund request submitted successfully")
            router.push("/dashboard/finance")
        } catch (error) {
            console.error("Fund request error:", error)
            toast.error("Failed to submit request")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <Link href="/dashboard/finance" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Finance
            </Link>

            <div>
                <h2 className="text-3xl font-light tracking-tight">New Fund Request</h2>
                <p className="text-muted-foreground text-sm mt-1">
                    Request funds for project-related expenses. All requests are routed to the Finance Department.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border border-border/50 rounded-lg p-8 space-y-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Amount (MK)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-mono">MK</span>
                            <input
                                required
                                type="number"
                                placeholder="0.00"
                                className="w-full bg-muted/30 border border-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Expense Category</label>
                        <select
                            className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="production">Production Gear</option>
                            <option value="talent">Talent & Crew</option>
                            <option value="travel">Travel & Logistics</option>
                            <option value="software">Software & Licenses</option>
                            <option value="admin">Office & Admin</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Select Project</label>
                    <select
                        required
                        className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        value={formData.projectId}
                        onChange={(e) => {
                            const p = projects.find(proj => proj.id === e.target.value)
                            setFormData({ ...formData, projectId: e.target.value, project: p?.project || "" })
                        }}
                    >
                        {projects.length === 0 && <option value="">Loading projects...</option>}
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.client} — {p.project}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description / Reason</label>
                    <textarea
                        required
                        className="w-full h-32 bg-muted/30 border border-border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Explain why these funds are needed..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    Submit to Finance
                </button>
            </form>
        </div>
    )
}
