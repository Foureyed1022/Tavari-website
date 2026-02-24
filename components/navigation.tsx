"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <nav
      className={`z-50 transition-all duration-300 ${isHome
        ? "absolute top-0 left-0 right-0 bg-transparent py-6"
        : "relative bg-background border-b border-border/20 py-4 shadow-sm"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/TAVARI CONNECT -White.png"
              alt="TAVARI"
              width={240}
              height={72}
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/about"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
            >
              Services
            </Link>
            <Link
              href="/production"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
            >
              Production
            </Link>
            <Link
              href="/work"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
            >
              Work
            </Link>
            <Link
              href="/contact"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-primary/10"
              title="Dashboard Login"
            >
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="rounded-none px-8 py-6 font-body text-xs tracking-wider uppercase"
            >
              <Link href="/contact">Work With Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-6 pb-4 flex flex-col gap-4">
            <Link
              href="/about"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/production"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
              onClick={() => setIsMenuOpen(false)}
            >
              Production
            </Link>
            <Link
              href="/work"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="/contact"
              className={`text-sm tracking-wide ${isHome ? "text-white" : "text-primary"} hover:opacity-80 transition-opacity font-body uppercase`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="default"
                className="rounded-none px-8 py-6 font-body text-xs tracking-wider uppercase flex-1"
              >
                <Link href="/contact">Work With Us</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav >
  )
}
