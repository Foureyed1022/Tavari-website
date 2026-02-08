"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-8">
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
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
            >
              Services
            </Link>
            <Link
              href="/production"
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
            >
              Production
            </Link>
            <Link
              href="/work"
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
            >
              Work
            </Link>
            <Link
              href="/contact"
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
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
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/production"
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Production
            </Link>
            <Link
              href="/work"
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="/contact"
              className="text-sm tracking-wide text-primary hover:text-primary-foreground/80 transition-colors font-body uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button
              asChild
              variant="default"
              className="rounded-none px-8 py-6 font-body text-xs tracking-wider uppercase w-full"
            >
              <Link href="/contact">Work With Us</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
