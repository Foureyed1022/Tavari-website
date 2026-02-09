"use client"

import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

export default function CalendarPage() {
    const days = Array.from({ length: 35 }, (_, i) => i + 1) // 5 weeks
    const today = 8 // Simulation

    const events = [
        { day: 5, title: "Horizon Finance Delivery", type: "delivery", color: "bg-emerald-500" },
        { day: 12, title: "Malawi Tourism Review", type: "meeting", color: "bg-blue-500" },
        { day: 15, title: "Nebula Tech Launch", type: "milestone", color: "bg-purple-500" },
        { day: 22, title: "Tavari Team Offsite", type: "internal", color: "bg-slate-500" },
    ]

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-light tracking-tight">February 2026</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Production schedule and deadlines.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-card border border-border rounded-md">
                        <button className="p-2 hover:bg-muted transition-colors"><ChevronLeft className="h-4 w-4" /></button>
                        <span className="px-4 text-sm font-medium">Today</span>
                        <button className="p-2 hover:bg-muted transition-colors"><ChevronRight className="h-4 w-4" /></button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                        <Plus className="h-4 w-4" />
                        Add Event
                    </button>
                </div>
            </div>

            <div className="bg-card border border-border/50 rounded-lg flex-1 shadow-sm overflow-hidden">
                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-border/50 bg-muted/30">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <div key={d} className="py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 h-[600px]">
                    {days.map((day) => {
                        const isToday = day === today
                        const dayEvents = events.filter(e => e.day === day)

                        return (
                            <div key={day} className={`border-r border-b border-border/50 p-2 relative group hover:bg-muted/10 transition-colors ${day > 28 ? "bg-muted/20 text-muted-foreground" : ""}`}>
                                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? "bg-primary text-primary-foreground" : "text-foreground"}`}>
                                    {day <= 28 ? day : day - 28}
                                </span>

                                <div className="mt-2 space-y-1">
                                    {dayEvents.map((event, idx) => (
                                        <div key={idx} className="text-[10px] px-2 py-1 rounded bg-muted/80 border-l-2 border-primary truncate font-medium cursor-pointer hover:bg-muted transition-colors">
                                            <div className={`w-1.5 h-1.5 rounded-full ${event.color} inline-block mr-1`} />
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
