"use client"

import { useState, useEffect, useRef } from "react"
import { User, Lock, Bell, Palette, Globe, Camera, Loader2, LogOut } from "lucide-react"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { useAuth } from "@/contexts/AuthContext"
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile, signOut } from "firebase/auth"
import { auth, db, storage } from "@/lib/firebase"
import { toast } from "sonner"
import { DEPARTMENTS } from "@/lib/constants"
import { useTheme } from "next-themes"

export default function SettingsPage() {
    const { user } = useAuth()
    const { theme, setTheme } = useTheme()
    const handleSignOut = () => signOut(auth)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [profile, setProfile] = useState({
        displayName: "",
        role: "",
        department: "strategy",
        bio: "",
        photoURL: ""
    })

    useEffect(() => {
        if (!user) return

        const unsub = onSnapshot(doc(db, "profiles", user.uid), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data()
                setProfile({
                    displayName: data.displayName || user.displayName || "",
                    role: data.role || "",
                    department: data.department || "strategy",
                    bio: data.bio || "",
                    photoURL: data.photoURL || user.photoURL || ""
                })
            } else {
                setProfile(prev => ({
                    ...prev,
                    displayName: user.displayName || "",
                    photoURL: user.photoURL || ""
                }))
            }
            setLoading(false)
        }, (error) => {
            console.error("Firestore Profile Error:", error)
            setLoading(false)
        })

        return () => unsub()
    }, [user])

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return
        setSaving(true)

        try {
            // 1. Update Firestore
            await setDoc(doc(db, "profiles", user.uid), {
                ...profile,
                updatedAt: new Date().toISOString(),
                email: user.email
            }, { merge: true })

            // 2. Update Auth Profile
            await updateProfile(user, {
                displayName: profile.displayName,
                photoURL: profile.photoURL
            })

            toast.success("Profile updated successfully")
        } catch (error) {
            console.error(error)
            toast.error("Failed to update profile")
        } finally {
            setSaving(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !user) return

        // Validate file type and size
        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file")
            return
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image size must be less than 2MB")
            return
        }

        setUploading(true)
        try {
            const storageRef = ref(storage, `profiles/${user.uid}`)
            await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(storageRef)

            setProfile(prev => ({ ...prev, photoURL: downloadURL }))

            // Auto-save the new photo URL to Firestore and Auth
            await setDoc(doc(db, "profiles", user.uid), {
                photoURL: downloadURL
            }, { merge: true })

            await updateProfile(user, { photoURL: downloadURL })

            toast.success("Profile picture updated")
        } catch (error) {
            console.error(error)
            toast.error("Failed to upload image")
        } finally {
            setUploading(false)
        }
    }

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-light tracking-tight">Settings</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your account and dashboard preferences.
                    </p>
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>

            <div className="grid gap-8">
                {/* Profile Card */}
                <form onSubmit={handleSaveProfile} className="bg-card border border-border/50 rounded-lg p-6 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Profile Information
                        </h3>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="relative group">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted border-4 border-card shadow-xl">
                                {profile.photoURL ? (
                                    <ImageWithFallback src={profile.photoURL} alt="Profile" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-light bg-primary/10 text-primary">
                                        {profile.displayName?.charAt(0) || user?.email?.charAt(0) || "?"}
                                    </div>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                                title="Change Profile Picture"
                            >
                                <Camera className="h-4 w-4" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>

                        <div className="flex-1 w-full space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                                    <input
                                        type="text"
                                        value={profile.displayName}
                                        onChange={e => setProfile({ ...profile, displayName: e.target.value })}
                                        className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Professional Role</label>
                                    <input
                                        type="text"
                                        value={profile.role}
                                        onChange={e => setProfile({ ...profile, role: e.target.value })}
                                        placeholder="e.g. Creative Director"
                                        className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Department</label>
                                    <select
                                        value={profile.department}
                                        disabled={!['admin', 'CEO', 'Finance Manager'].includes(profile.role)}
                                        onChange={e => setProfile({ ...profile, department: e.target.value })}
                                        className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-70 disabled:grayscale-[0.5]"
                                    >
                                        {DEPARTMENTS.map(dept => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2 invisible md:visible">
                                    {/* Placeholder for alignment */}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Personal Bio</label>
                                <textarea
                                    rows={4}
                                    value={profile.bio}
                                    onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                    placeholder="Tell the team and public about your expertise..."
                                    className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Type</label>
                                <div className="flex items-center gap-3 bg-muted/10 border border-border/50 rounded-md px-3 py-2">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${profile.role?.toLowerCase() === 'admin' ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {profile.role?.toLowerCase() === 'admin' ? 'Administrator' : 'Standard Member'}
                                    </span>
                                    {profile.role?.toLowerCase() === 'admin' && (
                                        <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold">FULL ACCESS</span>
                                    )}
                                </div>
                                {profile.role?.toLowerCase() === 'admin' && (
                                    <p className="text-[10px] text-muted-foreground italic mt-1">
                                        As an administrator, you can manage team roles and permissions in the <a href="/dashboard/team" className="text-primary hover:underline">Team Directory</a>.
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address (Read-only)</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="w-full bg-muted/10 border border-border/50 rounded-md px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>
                </form>

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
                                <button
                                    onClick={() => setTheme("dark")}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${theme === "dark"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-foreground hover:bg-muted/80"
                                        }`}
                                >
                                    Dark (Tavari)
                                </button>
                                <button
                                    onClick={() => setTheme("light")}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${theme === "light"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-foreground hover:bg-muted/80"
                                        }`}
                                >
                                    Light
                                </button>
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
