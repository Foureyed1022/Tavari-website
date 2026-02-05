import Link from "next/link"
import { ArrowRight, Users, Target, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "For Change-Makers — TAVARI",
  description: "Opportunities for cultural producers and change-makers to collaborate with TAVARI on meaningful projects.",
}

export default function ModelCollaboratePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-8">For Cultural Producers & Change-Makers</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Opportunities to contribute to meaningful cultural strategy and brand development work
          </p>
        </div>
      </section>

      {/* Change-Maker Collaboration */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light mb-8">Our Cultural Approach</h2>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We believe that the most successful brands are those that reflect and shape culture. Our work sits at the intersection of cultural intelligence and strategic thinking.
              </p>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We're looking for cultural producers, researchers, and change-makers who understand the power of cultural currents and can help us navigate complex cultural landscapes.
              </p>
              <ul className="text-muted-foreground font-body space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Cultural research and trend analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Community engagement and mapping</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Narrative development and storytelling</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-foreground rounded-full mt-1 flex-shrink-0"></div>
                  <span>Cultural translation and interpretation</span>
                </li>
              </ul>
            </div>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Lightbulb className="h-16 w-16 mx-auto mb-4" />
                <p className="font-body">Cultural Strategy Framework</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Areas */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center">Areas of Cultural Collaboration</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg border border-border">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Cultural Research</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Conducting ethnographic research and cultural analysis to inform brand positioning and strategy.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-lg border border-border">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Community Engagement</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Mapping community networks and identifying key cultural influencers and movements.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-lg border border-border">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Narrative Development</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Crafting stories that resonate with cultural moments and drive authentic brand connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8">Ready to Shape Culture?</h2>
          <p className="text-lg text-muted-foreground font-body mb-12 leading-relaxed">
            We're always looking for cultural producers and change-makers who share our commitment to meaningful work.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase"
          >
            <Link href="/contact">
              Join Our Network
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}