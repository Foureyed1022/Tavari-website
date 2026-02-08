import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/TAVARI CONNECT -White.png"
                alt="TAVARI"
                width={180}
                height={54}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed font-body">
              Culture-led brand strategy and creative production.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs tracking-wider uppercase mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/production"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  Production
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-body text-xs tracking-wider uppercase mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  Work With Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:partnerships@tavari.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  partnerships@tavari.com
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground font-body block mt-2">
                  Lilongwe, Malawi
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-body text-xs tracking-wider uppercase mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center font-body">
            © {new Date().getFullYear()} TAVARI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
