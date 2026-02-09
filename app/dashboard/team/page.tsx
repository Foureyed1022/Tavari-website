"use client"

import { Mail, Phone, Calendar } from "lucide-react"
import { ImageWithFallback } from "@/components/ImageWithFallback"

const team = [
    {
        name: "Godfrey Kambewa",
        role: "Managing Director / Strategy Lead",
        img: "/images/team/placeholder-1.jpg",
        status: "In Meeting",
        statusColor: "bg-amber-500",
        email: "godfrey@tavari.mw",
    },
    {
        name: "Lumbani Phiri",
        role: "Operations & Project Manager",
        img: "/images/team/placeholder-2.jpg",
        status: "Available",
        statusColor: "bg-emerald-500",
        email: "lumbani@tavari.mw",
    },
    {
        name: "Ishmael Assan",
        role: "Creative Director",
        img: "/images/team/placeholder-3.jpg",
        status: "In Production",
        statusColor: "bg-purple-500",
        email: "ishmael@tavari.mw",
    },
    {
        name: "Martinez Chakwawa",
        role: "Graphic Designer",
        img: "/images/team/placeholder-4.jpg",
        status: "Designing",
        statusColor: "bg-blue-500",
        email: "martinez@tavari.mw",
    },
    {
        name: "Senza Nkunika",
        role: "Product Developer",
        img: "/images/team/placeholder-1.jpg",
        status: "Coding",
        statusColor: "bg-indigo-500",
        email: "senza@tavari.mw",
    },
    {
        name: "Victor Roman Zgambo",
        role: "Finance Officer",
        img: "/images/team/placeholder-2.jpg",
        status: "Offline",
        statusColor: "bg-slate-500",
        email: "victor@tavari.mw",
    },
]

export default function TeamPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-light tracking-tight">Team Directory</h2>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage member availability and access.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                    <div key={member.name} className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-border transition-all hover:shadow-md group">
                        <div className="h-32 bg-muted/30 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                        </div>
                        <div className="p-6 relative">
                            <div className="absolute -top-12 left-6">
                                <div className="relative w-24 h-24 rounded-full border-4 border-card overflow-hidden bg-muted">
                                    <ImageWithFallback src={member.img} alt={member.name} fill className="object-cover" />
                                </div>
                                <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-card ${member.statusColor}`} />
                            </div>

                            <div className="mt-12">
                                <h3 className="text-lg font-medium">{member.name}</h3>
                                <p className="text-sm text-primary font-medium mb-4">{member.role}</p>

                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        {member.email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        +265 999 123 456
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-border/50 flex justify-between items-center">
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                        {member.status}
                                    </span>
                                    <button className="text-xs font-medium text-primary hover:underline">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
