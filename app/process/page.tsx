import { ArrowRight, Search, Target, Palette, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ImageWithFallback } from "@/components/ImageWithFallback"
export const metadata = {
  title: "Process — TAVARI",
  description: "Our strategic approach to brand development: from discovery to delivery, ensuring meaningful and enduring brand experiences.",
}

export default function ProcessPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Our Process</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            A strategic approach to brand development from discovery to delivery
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-8">
                <Search className="h-8 w-8 text-foreground" />
              </div>
              <h2 className="text-3xl font-light mb-6">01. Discovery & Research</h2>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We begin by deeply understanding your organization, market landscape, competitive positioning, audience insights, and cultural context. This foundational research informs all strategic recommendations.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                Through interviews, surveys, competitive analysis, and cultural trend assessment, we uncover opportunities for differentiation and meaningful connection.
              </p>
            </div>
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback 
                src="/images/research-analysis.svg" 
                alt="Research & Analysis Dashboard"
                width={500}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center order-2 md:order-1 overflow-hidden">
              <ImageWithFallback 
                src="/images/strategic-framework.svg" 
                alt="Strategic Framework"
                width={500}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-8">
                <Target className="h-8 w-8 text-foreground" />
              </div>
              <h2 className="text-3xl font-light mb-6">02. Strategy Development</h2>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                Based on research insights, we develop positioning frameworks, brand architecture, and strategic recommendations that create genuine competitive advantage.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                We define core brand values, personality, voice, and messaging hierarchy that will guide all creative development and ensure consistency across touchpoints.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-8">
                <Palette className="h-8 w-8 text-foreground" />
              </div>
              <h2 className="text-3xl font-light mb-6">03. Creative Execution</h2>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We translate strategy into compelling visual identity, messaging, and brand experiences. Every creative decision stems from strategic insight.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                From logo design to brand applications, we create cohesive visual systems that bring strategy to life and ensure consistency across all touchpoints.
              </p>
            </div>
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback 
                src="/images/creative-concepts.svg" 
                alt="Creative Concepts Gallery"
                width={500}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center order-2 md:order-1 overflow-hidden">
              <ImageWithFallback 
                src="/images/implementation-rollout.svg" 
                alt="Implementation & Rollout"
                width={500}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-8">
                <Rocket className="h-8 w-8 text-foreground" />
              </div>
              <h2 className="text-3xl font-light mb-6">04. Implementation & Support</h2>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We manage end-to-end production, rollout strategy, and ongoing brand stewardship to ensure successful deployment and lasting impact.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                From asset production to team training, we provide comprehensive support to ensure your brand thrives in market and delivers on strategic objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8">Ready to Transform Your Brand?</h2>
          <p className="text-lg text-muted-foreground font-body mb-12 leading-relaxed">
            Our process ensures strategic clarity, cultural relevance, and enduring impact for your brand.
          </p>
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
        </div>
      </section>

      <Footer />
    </div>
  )
}