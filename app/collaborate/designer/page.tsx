import Link from "next/link"
import { ArrowRight, Palette, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "For Designers — TAVARI",
  description: "Opportunities for designers to collaborate with TAVARI on culture-led brand strategy and creative production projects.",
}

export default function DesignerCollaboratePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-8">For Designers & Strategists</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Opportunities to contribute to meaningful brand strategy and creative production work
          </p>
        </div>
      </section>

      {/* Designer Collaboration */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light mb-8">Our Approach to Design</h2>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We believe the most impactful design emerges from strategic insight and cultural intelligence. Our projects begin with deep research and strategic frameworks that inform every creative decision.
              </p>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We're looking for designers who share our commitment to meaningful work—those who understand that great design serves business objectives and cultural relevance, not just aesthetic preferences.
              </p>
              <ul className="text-muted-foreground font-body space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Strategy-informed creative decisions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Cultural intelligence in design practice</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>End-to-end project ownership</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Collaborative, not ego-driven</span>
                </li>
              </ul>
            </div>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Palette className="h-16 w-16 mx-auto mb-4" />
                <p className="font-body">Design Process Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Areas */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center">Areas of Collaboration</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg border border-border">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Brand Strategy</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Contributing to strategic frameworks, positioning, and brand architecture that guide creative execution.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-lg border border-border">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6">
                <Palette className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Visual Identity</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Creating cohesive visual systems that bring strategic concepts to life across all touchpoints.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-lg border border-border">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Cultural Research</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Conducting cultural analysis and trend research to inform brand positioning and creative direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8">Interested in Collaborating?</h2>
          <p className="text-lg text-muted-foreground font-body mb-12 leading-relaxed">
            We're always looking for talented designers and strategists who share our commitment to meaningful work.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase"
          >
            <Link href="/contact">
              Share Your Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}