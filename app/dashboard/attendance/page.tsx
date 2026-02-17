"use client"

import { useState, useEffect } from "react"
import { Play, Square, Plus, CheckCircle2, Clock, FileText, Send, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    serverTimestamp,
    getDocs,
    setDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    orderBy
} from "firebase/firestore"
import { toast } from "sonner"
import { DEPARTMENTS } from "@/lib/constants"

export default function AttendancePage() {
    const { user } = useAuth()
    const [isClockedIn, setIsClockedIn] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [activities, setActivities] = useState<any[]>([])
    const [newTask, setNewTask] = useState("")
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [eodReport, setEodReport] = useState("")
    const [userProfile, setUserProfile] = useState<any>(null)

    const [projects, setProjects] = useState<any[]>([])

    // Load Data & Sync
    useEffect(() => {
        if (!user) return

        const today = new Date().toISOString().split('T')[0]

        // 1. Sync Session
        const sessionRef = doc(db, "sessions", user.uid)
        getDoc(sessionRef).then((docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data()
                if (data.status === "active") {
                    setIsClockedIn(true)
                    setSelectedDept(data.department || "")
                    setSelectedProject(data.project)
                    setCurrentSessionProject(data.project)

                    const startTime = data.startTime.toDate().getTime()
                    const now = Date.now()
                    setElapsedTime(Math.floor((now - startTime) / 1000))
                }
            }
        })

        // 2. Sync Activities
        const q = query(
            collection(db, "activities"),
            where("userId", "==", user.uid),
            where("date", "==", today)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const acts: any[] = []
            snapshot.forEach((doc) => {
                acts.push({ id: doc.id, ...doc.data() })
            })

            // Sort client-side to avoid needing a composite index
            acts.sort((a, b) => {
                const timeA = a.timestamp?.seconds || 0
                const timeB = b.timestamp?.seconds || 0
                return timeB - timeA
            })

            setActivities(acts)
            setLoading(false)
        }, (error) => {
            console.error("Firestore Activities Error:", error)
            setLoading(false)
        })

        // 3. Fetch Projects
        const fetchProjects = async () => {
            const qProj = query(collection(db, "projects"), orderBy("createdAt", "desc"))
            const snap = await getDocs(qProj)
            setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        }
        fetchProjects()

        // 4. Fetch User Profile
        const unsubscribeProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data()
                setUserProfile(data)
                // Set default department if not already set by session sync
                setSelectedDept(prev => prev || data.department || "")
            }
        }, (error) => {
            console.error("Firestore Profile Error:", error)
        })

        return () => {
            unsubscribe()
            unsubscribeProfile()
        }
    }, [user])

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isClockedIn) {
            interval = setInterval(() => {
                setElapsedTime((prev) => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isClockedIn])

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const [selectedDept, setSelectedDept] = useState("")
    const [workMode, setWorkMode] = useState<'general' | 'project'>('general')
    const [selectedProject, setSelectedProject] = useState("General / Agency Work")
    const [currentSessionProject, setCurrentSessionProject] = useState("")

    const departments = DEPARTMENTS
    const isPowerUser = ['admin', 'CEO', 'Finance Manager'].includes(userProfile?.role)

    const availableProjects = selectedDept
        ? projects.filter(p => p.department === selectedDept)
        : []

    const handleClockIn = async () => {
        if (!user) return

        try {
            const sessionRef = doc(db, "sessions", user.uid)
            const projectToSave = workMode === 'project' ? selectedProject : "General / Agency Work"
            const deptToSave = workMode === 'project' ? selectedDept : (userProfile?.department || "Unassigned")

            await setDoc(sessionRef, {
                userId: user.uid,
                status: "active",
                startTime: serverTimestamp(),
                project: projectToSave,
                department: deptToSave,
                workMode: workMode
            })

            // Update Presence
            await setDoc(doc(db, "presence", user.uid), {
                name: user.displayName || user.email,
                status: "online",
                project: projectToSave,
                workMode: workMode,
                lastSeen: serverTimestamp()
            })

            setIsClockedIn(true)
            setCurrentSessionProject(projectToSave)

            await addDoc(collection(db, "activities"), {
                userId: user.uid,
                date: new Date().toISOString().split('T')[0],
                timestamp: serverTimestamp(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                task: `Clocked In: ${projectToSave} (${workMode})`,
                type: "system"
            })

            toast.success("Clocked in successfully")
        } catch (error) {
            console.error("Clock in error:", error)
            toast.error("Failed to clock in")
        }
    }

    const handleClockOut = async () => {
        if (!user) return

        try {
            const sessionRef = doc(db, "sessions", user.uid)
            await updateDoc(sessionRef, {
                status: "inactive",
                endTime: serverTimestamp()
            })

            // Update Presence
            await setDoc(doc(db, "presence", user.uid), {
                name: user.displayName || user.email,
                status: "offline",
                lastSeen: serverTimestamp()
            })

            setIsClockedIn(false)
            setCurrentSessionProject("")
            setElapsedTime(0)

            await addDoc(collection(db, "activities"), {
                userId: user.uid,
                date: new Date().toISOString().split('T')[0],
                timestamp: serverTimestamp(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                task: "Clocked Out",
                type: "system"
            })

            toast.success("Clocked out successfully")
        } catch (error) {
            console.error("Clock out error:", error)
            toast.error("Failed to clock out")
        }
    }

    const handleAddTask = async () => {
        if (!user || !newTask.trim()) return

        try {
            await addDoc(collection(db, "activities"), {
                userId: user.uid,
                date: new Date().toISOString().split('T')[0],
                timestamp: serverTimestamp(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                task: newTask,
                type: "work"
            })
            setNewTask("")
        } catch (error) {
            console.error("Add task error:", error)
            toast.error("Failed to add task")
        }
    }

    const handleSubmitReport = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user || !eodReport.trim()) return

        setIsSubmitting(true)
        try {
            await addDoc(collection(db, "reports"), {
                userId: user.uid,
                userName: user.displayName || user.email,
                date: new Date().toISOString().split('T')[0],
                timestamp: serverTimestamp(),
                report: eodReport,
                activities: activities
            })
            setEodReport("")
            toast.success("EOD Report submitted successfully")
        } catch (error) {
            console.error("Report sub error:", error)
            toast.error("Failed to submit report")
        } finally {
            setIsSubmitting(false)
        }
    }

    const [mounted, setMounted] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        setMounted(true)
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // ... existing timer effect ...

    // ... formatTime function ...

    // ... handlers ...

    if (!mounted || loading) {
        return (
            <div className="h-[60vh] w-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-light tracking-tight">My Workspace</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Track your daily activity and submit reports.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-medium text-muted-foreground">
                        {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-3xl font-mono font-bold text-primary">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Timer & Actions */}
                <div className="space-y-6">
                    {/* Clock In/Out Card */}
                    <div className="bg-card border border-border/50 rounded-lg p-8 text-center shadow-lg relative overflow-hidden group transition-all">
                        <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${isClockedIn ? "bg-emerald-500" : "bg-card"}`} />

                        <div className="relative z-10">
                            <h3 className="text-muted-foreground uppercase tracking-widest text-xs font-semibold mb-4">Current Session</h3>
                            <div className="text-6xl font-mono font-bold tracking-tighter mb-8 tabular-nums">
                                {formatTime(elapsedTime)}
                            </div>

                            {!isClockedIn ? (
                                <div className="space-y-4">
                                    <div className="flex bg-muted/50 p-1 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => setWorkMode('general')}
                                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${workMode === 'general' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                        >
                                            General Work
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setWorkMode('project')}
                                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${workMode === 'project' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                        >
                                            Specific Project
                                        </button>
                                    </div>

                                    {workMode === 'project' && (
                                        <div className="grid grid-cols-2 gap-4 text-left animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-muted-foreground">Department</label>
                                                <select
                                                    className="w-full bg-muted/30 border border-border rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-70 disabled:grayscale-[0.5]"
                                                    value={selectedDept}
                                                    disabled={!isPowerUser}
                                                    onChange={(e) => {
                                                        setSelectedDept(e.target.value)
                                                        setSelectedProject("General / Agency Work")
                                                    }}
                                                >
                                                    <option value="">Select Dept...</option>
                                                    {departments.map(dept => (
                                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-muted-foreground">Project</label>
                                                <select
                                                    className="w-full bg-muted/30 border border-border rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                                    value={selectedProject}
                                                    onChange={(e) => setSelectedProject(e.target.value)}
                                                >
                                                    <option value="General / Agency Work">Select Project...</option>
                                                    {availableProjects.map(proj => (
                                                        <option key={proj.id} value={proj.client + " - " + (proj.project || "Unnamed Project")}>
                                                            {proj.client} - {proj.project || "Unnamed Project"}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleClockIn}
                                        disabled={workMode === 'project' && (!selectedDept || selectedProject === "General / Agency Work")}
                                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md font-medium flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        <Play className="h-5 w-5 fill-current" />
                                        CLOCK IN
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-muted/30 rounded-md p-3 text-sm text-left border border-border/50">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Active Project</span>
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        </div>
                                        <p className="font-medium truncate">{currentSessionProject}</p>
                                    </div>

                                    <button
                                        onClick={handleClockOut}
                                        className="w-full py-4 bg-destructive hover:bg-destructive/90 text-white rounded-md font-medium flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        <Square className="h-5 w-5 fill-current" />
                                        CLOCK OUT
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-card border border-border/50 rounded-lg hover:border-border hover:bg-muted/50 transition-colors text-left group">
                            <FileText className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-medium">Request Leave</span>
                        </button>
                        <button className="p-4 bg-card border border-border/50 rounded-lg hover:border-border hover:bg-muted/50 transition-colors text-left group">
                            <Clock className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-medium">Overtime</span>
                        </button>
                    </div>
                </div>

                {/* Middle Column: Activity Feed */}
                <div className="bg-card border border-border/50 rounded-lg p-6 flex flex-col h-[500px]">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Daily Activity Log
                    </h3>

                    {/* Add Task Input */}
                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="What are you working on?"
                            className="flex-1 bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                        />
                        <button
                            onClick={handleAddTask}
                            className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Feed */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {activities.map((activity, index) => (
                            <div key={activity.id || index} className="flex gap-3 text-sm group">
                                <div className="w-16 font-mono text-muted-foreground text-xs pt-0.5 shrink-0 text-right">{activity.time}</div>
                                <div className="relative pt-1">
                                    <div className={`w-2 h-2 rounded-full absolute -left-[19px] top-1.5 ${activity.type === 'system' ? 'bg-muted-foreground' : 'bg-primary'}`} />
                                    <p className={`${activity.type === 'system' ? 'text-muted-foreground italic' : 'text-foreground'}`}>
                                        {activity.task}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {activities.length === 0 && (
                            <div className="text-center text-muted-foreground text-sm py-8">
                                No activity logged yet today.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: EOD Report */}
                <div className="bg-card border border-border/50 rounded-lg p-6 flex flex-col">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        End of Day Report
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                        Summarize your achievements, blockers, and plan for tomorrow. This will be sent to your Team Lead.
                    </p>

                    <form onSubmit={handleSubmitReport} className="flex-1 flex flex-col gap-4">
                        <div className="space-y-2 flex-1">
                            <textarea
                                className="w-full h-full min-h-[200px] bg-muted/30 border border-border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="- Completed Phase 1 of Nebula Tech design&#10;- Fixed bug in Services page&#10;- Blocker: Waiting for client asset approval"
                                value={eodReport}
                                onChange={(e) => setEodReport(e.target.value)}
                                required
                            />
                        </div>

                        <div className="bg-muted/30 rounded-md p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Metrics</h4>
                            <div className="flex justify-between text-sm">
                                <span>Task Completion</span>
                                <span className="font-mono">85%</span>
                            </div>
                            <div className="w-full h-1 bg-muted rounded-full mt-1">
                                <div className="h-full w-[85%] bg-primary rounded-full" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !eodReport.trim()}
                            className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            Submit Report
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
