"use client"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.push("/dashboard")
        } catch (err: any) {
            console.error("Login error:", err)
            if (err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.")
            } else {
                setError("Failed to sign in. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-block">
                        <h1 className="text-4xl font-light tracking-tighter">TAVARI</h1>
                    </Link>
                    <h2 className="text-2xl font-medium tracking-tight">Sign in to Dashboard</h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to access the workspace
                    </p>
                </div>

                <div className="bg-card border border-border/50 p-8 rounded-lg shadow-sm">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@tavari.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-muted/30"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-muted/30"
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Sign In
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Restricted access. Authorized personnel only.
                </p>
            </div>
        </div>
    )
}
