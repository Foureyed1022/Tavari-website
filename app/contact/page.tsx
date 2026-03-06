"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, User, Building, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-32">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-light mb-8">Message Received</h1>
            <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
              Thank you for reaching out to TAVARI. We have received your inquiry and will contact you within 2 business days to discuss potential collaboration opportunities.
            </p>
            <p className="text-muted-foreground font-body text-sm mb-12">
              Our team reviews all partnership inquiries carefully to ensure we can provide the strategic support your organization needs.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none px-12 py-6 font-body text-xs tracking-wider uppercase border-2 bg-transparent"
            >
              <a href="/">Return Home</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Work With Us</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Partner with TAVARI to build a brand that truly matters. We work with organizations, institutions, and forward-thinking leaders.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Email</h3>
              <a
                href="mailto:partnerships@tavari.com"
                className="text-muted-foreground font-body hover:text-foreground transition-colors"
              >
                info@tavariconnect.site
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Phone</h3>
              <a
                href="tel:+1234567890"
                className="text-muted-foreground font-body hover:text-foreground transition-colors"
              >
                +265 996 263 843
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Location</h3>
              <p className="text-muted-foreground font-body">
                Lilongwe, Malawi<br />
                Global Partnerships Welcome
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-muted rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-light mb-8 text-center">Start a Conversation</h2>
            <p className="text-muted-foreground font-body text-center mb-12 max-w-2xl mx-auto">
              Tell us about your organization and brand challenges. We'll respond within 2 business days to discuss how we can help.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Organization Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-light border-b border-border pb-4">Organization Details</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="font-body text-xs uppercase tracking-wide">
                      <Building className="inline h-4 w-4 mr-2" />
                      Organization Name *
                    </Label>
                    <Input
                      id="organization"
                      required
                      className="rounded-none border-2 h-12 font-body"
                      placeholder="Your company or institution name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="font-body text-xs uppercase tracking-wide">
                      <User className="inline h-4 w-4 mr-2" />
                      Contact Name *
                    </Label>
                    <Input
                      id="contactName"
                      required
                      className="rounded-none border-2 h-12 font-body"
                      placeholder="Full name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-body text-xs uppercase tracking-wide">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="rounded-none border-2 h-12 font-body"
                      placeholder="business@organization.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-body text-xs uppercase tracking-wide">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="rounded-none border-2 h-12 font-body"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-light border-b border-border pb-4">Project Overview</h3>

                <div className="space-y-2">
                  <Label htmlFor="projectType" className="font-body text-xs uppercase tracking-wide">
                    Project Type *
                  </Label>
                  <select
                    id="projectType"
                    required
                    className="w-full rounded-none border-2 border-input h-12 px-3 font-body bg-background"
                  >
                    <option value="">Select project type...</option>
                    <option value="brand-strategy">Brand Strategy & Positioning</option>
                    <option value="identity-design">Brand Identity Design</option>
                    <option value="campaign">Creative Campaign Development</option>
                    <option value="rebrand">Complete Rebrand</option>
                    <option value="production">Production Services</option>
                    <option value="other">Other Brand Initiative</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline" className="font-body text-xs uppercase tracking-wide">
                    Project Timeline
                  </Label>
                  <select
                    id="timeline"
                    className="w-full rounded-none border-2 border-input h-12 px-3 font-body bg-background"
                  >
                    <option value="">Select timeline...</option>
                    <option value="immediate">Immediate (0-3 months)</option>
                    <option value="short">Short-term (3-6 months)</option>
                    <option value="medium">Medium-term (6-12 months)</option>
                    <option value="long">Long-term (12+ months)</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="font-body text-xs uppercase tracking-wide">
                    Budget Range (Optional)
                  </Label>
                  <select
                    id="budget"
                    className="w-full rounded-none border-2 border-input h-12 px-3 font-body bg-background"
                  >
                    <option value="">Select range...</option>
                    <option value="5-10m">MK 5,000,000 - MK 10,000,000</option>
                    <option value="10-25m">MK 10,000,000 - MK 25,000,000</option>
                    <option value="25-50m">MK 25,000,000 - MK 50,000,000</option>
                    <option value="50m+">MK 50,000,000+</option>
                    <option value="tbd">To be determined</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-6">
                <h3 className="text-xl font-light border-b border-border pb-4">Your Message</h3>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-body text-xs uppercase tracking-wide">
                    <MessageSquare className="inline h-4 w-4 mr-2" />
                    How can we help? *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    className="rounded-none border-2 min-h-32 font-body"
                    placeholder="Tell us about your brand challenges, goals, and what you're hoping to achieve through this partnership..."
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-8">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="rounded-none px-12 py-6 font-body text-xs tracking-wider uppercase w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-xs text-muted-foreground font-body mt-4 text-center">
                  We'll respond within 2 business days to discuss your project
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}