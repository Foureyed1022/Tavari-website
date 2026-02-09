"use client"

import { User, Lock, Bell, Palette, Globe } from "lucide-react"
import { ImageWithFallback } from "@/components/ImageWithFallback"

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-light tracking-tight">Settings</h2>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage your account and dashboard preferences.
                </p>
            </div>

            <div className="grid gap-8">
                {/* Profile Card */}
                <div className="bg-card border border-border/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Profile Information
                    </h3>

                    <div className="flex items-start gap-8">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
                            <ImageWithFallback src="/images/team/placeholder-4.jpg" alt="Profile" fill className="object-cover" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <input type="text" defaultValue="Martinez Chakwawa" className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Role</label>
                                    <input type="text" defaultValue="Graphic Designer" className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <input type="email" defaultValue="martinez@tavari.mw" className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm" />
                                </div>
                            </div>
                            <button className="text-xs text-primary hover:underline">Change Profile Picture</button>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-card border border-border/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                        <Palette className="h-5 w-5 text-primary" />
                        Appearance & System
                    </h3>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium">Theme Preference</h4>
                                <p className="text-xs text-muted-foreground">Select your interface theme.</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">Dark (Tavari)</button>
                                <button className="px-3 py-1.5 rounded-md bg-muted text-foreground text-xs font-medium hover:bg-muted/80">Light</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-border/50 pt-4">
                            <div>
                                <h4 className="text-sm font-medium">Currency Display</h4>
                                <p className="text-xs text-muted-foreground">Default currency for financial reports.</p>
                            </div>
                            <select className="bg-muted/30 border border-border rounded-md px-2 py-1 text-sm text-foreground">
                                <option>MWK (Malawian Kwacha)</option>
                                <option>USD ($)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-card border border-border/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Notifications
                    </h3>
                    <div className="space-y-4">
                        {["Project Deadlines", "Budget Alerts", "Team Mentions", "System Updates"].map(item => (
                            <div key={item} className="flex items-center justify-between py-2 border-b border-border/30 last:border-none">
                                <span className="text-sm">{item}</span>
                                <div className="w-10 h-5 bg-primary/20 rounded-full relative cursor-pointer">
                                    <div className="w-3 h-3 bg-primary rounded-full absolute top-1 right-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
