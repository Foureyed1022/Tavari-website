"use client"

import { useState } from "react"
import { ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FundRequestPage() {
    const router = useRouter()
    const [submitted, setSubmitted] = useState(false)

    // Selection State
    const [selectedDept, setSelectedDept] = useState("")
    const [selectedProject, setSelectedProject] = useState("")

    // Form State
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    const departments = [
        { id: "strategy", name: "Strategy" },
        { id: "design", name: "Identity & Design" },
        { id: "campaigns", name: "Campaigns" },
        { id: "production", name: "Production" },
        { id: "events", name: "Events" },
        { id: "merch", name: "Merchandise" },
    ]

    const allProjects = [
        { id: "PROJ-24-001", client: "Nebula Tech", project: "Rebrand & Website", department: "strategy" },
        { id: "PROJ-24-005", client: "Malawi Tourism", project: "Destination Campaign", department: "campaigns" },
        { id: "PROJ-24-003", client: "Urban Culture Festival", project: "Event Branding & Merch", department: "events" },
        { id: "PROJ-24-008", client: "Horizon Finance", project: "Corporate Strategy", department: "strategy" },
        { id: "PROJ-24-012", client: "EcoSolutions", project: "Sustainability Report", department: "design" },
        { id: "PROJ-24-015", client: "Tavari Merch Drop 1", project: "Apparel Collection", department: "merch" },
        { id: "PROJ-24-018", client: "Music Video: 'Roots'", project: "Video Production", department: "production" },
    ]

    const availableProjects = selectedDept
        ? allProjects.filter(p => p.department === selectedDept || (selectedDept === 'events' && p.department === 'merch'))
        : []

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        // Simulate API call
        setTimeout(() => {
            router.push("/dashboard/finance")
        }, 2000)
    }

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-medium">Request Submitted</h2>
                <p className="text-muted-foreground max-w-md">
                    Your fund request for <span className="font-medium text-foreground">{selectedProject}</span> has been sent to Finance for approval. Redirecting...
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/finance" className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h2 className="text-3xl font-light tracking-tight">Request Funds</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Submit expenses or budget requests for project approval.
                    </p>
                </div>
            </div>

            <div className="bg-card border border-border/50 rounded-lg p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Project Context */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Department</label>
                            <select
                                required
                                className="w-full bg-muted/30 border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                value={selectedDept}
                                onChange={(e) => {
                                    setSelectedDept(e.target.value)
                                    setSelectedProject("")
                                }}
                            >
                                <option value="">Select Department...</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Project</label>
                            <select
                                required
                                className="w-full bg-muted/30 border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                                disabled={!selectedDept}
                            >
                                <option value="">Select Project...</option>
                                {availableProjects.map(proj => (
                                    <option key={proj.id} value={proj.client + " - " + proj.project}>{proj.client} - {proj.project}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Amount & Date */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Amount Needed (MWK)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">MK</span>
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    placeholder="0.00"
                                    className="w-full bg-muted/30 border border-border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date Required</label>
                            <input
                                required
                                type="date"
                                className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description / Reason</label>
                        <textarea
                            required
                            className="w-full min-h-[120px] bg-muted/30 border border-border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="E.g., Procurement of 2x specialized lenses for the music video shoot..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Helper Text */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-4 flex gap-3 text-sm text-blue-400">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p>Requests over MK 500,000 require secondary approval from the Finance Director.</p>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Link href="/dashboard/finance" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={!selectedProject || !amount || !description}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Send className="h-4 w-4" />
                            Submit Request
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
