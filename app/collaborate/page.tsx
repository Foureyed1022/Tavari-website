import Link from "next/link"
import { ArrowRight, Users, Building, Target, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Collaborate — TAVARI",
  description: "Partnership opportunities with TAVARI for organizations seeking strategic brand development and creative production.",
}

export default function CollaboratePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Partner With Us</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Opportunities for collaboration with forward-thinking organizations
          </p>
        </div>
      </section>

      {/* Collaboration Types */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Organizations */}
            <div className="bg-muted rounded-lg p-12">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-8">
                <Building className="h-8 w-8 text-foreground" />
              </div>
              <h2 className="text-3xl font-light mb-6">Organizations</h2>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We partner with businesses, institutions, and nonprofits seeking to build meaningful, relevant, and enduring brands through strategic thinking and cultural intelligence.
              </p>
              <ul className="text-muted-foreground font-body mb-8 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Brand strategy and positioning</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Identity design and visual systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Creative campaign development</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Production house services</span>
                </li>
              </ul>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-none px-8 py-6 font-body text-sm tracking-wider uppercase"
              >
                <Link href="/contact">
                  Start Partnership Discussion
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Creatives */}
            <div className="bg-foreground text-background rounded-lg p-12">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-8">
                <Lightbulb className="h-8 w-8 text-foreground" />
              </div>
              <h2 className="text-3xl font-light mb-6">Creatives & Change-Makers</h2>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We collaborate with designers, strategists, cultural producers, and innovators who share our commitment to meaningful work.
              </p>
              <ul className="text-muted-foreground font-body mb-8 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-background rounded-full mt-1 flex-shrink-0"></div>
                  <span>Strategic creative partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-background rounded-full mt-1 flex-shrink-0"></div>
                  <span>Cultural research initiatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-background rounded-full mt-1 flex-shrink-0"></div>
                  <span>Experimental brand projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-background rounded-full mt-1 flex-shrink-0"></div>
                  <span>Thought leadership initiatives</span>
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="rounded-none px-8 py-6 font-body text-sm tracking-wider uppercase bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/contact">
                  Explore Collaboration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center">Our Collaborative Approach</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Strategy-First</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We begin every collaboration with strategic clarity, ensuring all creative efforts serve meaningful business objectives.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Cultural Intelligence</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We embed deep cultural understanding into every aspect of brand development for authentic audience connections.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">End-to-End Execution</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We manage every aspect of brand development to ensure consistency, quality, and alignment with strategic goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8">Ready to Create Something Meaningful?</h2>
          <p className="text-lg text-muted-foreground font-body mb-12 leading-relaxed">
            We work with organizations and individuals committed to building brands that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase"
            >
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase"
            >
              <Link href="/work">
                View Our Work
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}