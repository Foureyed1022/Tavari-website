"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { ArrowLeft, Loader2, DollarSign, Check, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { doc, getDoc, updateDoc, onSnapshot, query, collection, orderBy } from "firebase/firestore"
import { toast } from "sonner"
import { sendNotification } from "@/lib/notifications"

export default function FundRequestsListPage() {
    const { user } = useAuth()
    const [requests, setRequests] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [userDept, setUserDept] = useState("")

    useEffect(() => {
        if (!user) return
        // Fetch user department
        const unsubProfile = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
            if (docSnap.exists()) {
                setUserDept(docSnap.data().department || "")
            }
        })

        const q = query(collection(db, "fund_requests"), orderBy("timestamp", "desc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reqs: any[] = []
            snapshot.forEach((doc) => {
                reqs.push({ id: doc.id, ...doc.data() })
            })
            setRequests(reqs)
            setLoading(false)
        })
        return () => {
            unsubProfile()
            unsubscribe()
        }
    }, [user])

    const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected') => {
        try {
            const reqSnap = await getDoc(doc(db, "fund_requests", id))
            if (!reqSnap.exists()) return

            const reqData = reqSnap.data()
            const requesterId = reqData.userId

            await updateDoc(doc(db, "fund_requests", id), {
                status: newStatus,
                updatedAt: new Date().toISOString()
            })

            // Notify Requester
            await sendNotification(
                requesterId,
                `Request ${newStatus.toUpperCase()}`,
                `Your fund request for "${reqData.project}" has been ${newStatus}.`,
                newStatus === 'approved' ? 'approval' : 'rejection',
                '/dashboard/finance'
            )

            toast.success(`Request ${newStatus}`)
        } catch (error) {
            console.error(error)
            toast.error("Failed to update status")
        }
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <Link href="/dashboard/finance" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Finance
            </Link>

            <div>
                <h2 className="text-3xl font-light tracking-tight">All Fund Requests</h2>
                <p className="text-muted-foreground text-sm mt-1">
                    History of all fund requests submitted by the team.
                </p>
            </div>

            <div className="bg-card border border-border/50 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-muted/30 text-muted-foreground font-medium border-b border-border/50">
                        <tr>
                            <th className="px-6 py-4">Request / Category</th>
                            <th className="px-6 py-4">Requested By</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            {userDept === 'finance' && <th className="px-6 py-4 text-right">Action</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                </td>
                            </tr>
                        ) : requests.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                                    No fund requests found.
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{req.project}</div>
                                        <div className="text-xs text-muted-foreground">{req.category}</div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {req.userName}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-xs">
                                        {req.date}
                                    </td>
                                    <td className="px-6 py-4 font-mono font-medium">
                                        MK {req.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                            req.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                                'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    {userDept === 'finance' && (
                                        <td className="px-6 py-4 text-right">
                                            {req.status === 'pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(req.id, 'approved')}
                                                        className="p-1 hover:bg-emerald-500/10 text-emerald-500 rounded transition-colors"
                                                        title="Approve"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(req.id, 'rejected')}
                                                        className="p-1 hover:bg-red-500/10 text-red-500 rounded transition-colors"
                                                        title="Reject"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
