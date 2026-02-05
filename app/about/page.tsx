import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import Link from "next/link"

export const metadata = {
  title: "About — TAVARI",
  description:
    "Learn about TAVARI's culture-led approach to brand strategy and creative production. Our philosophy, methodology, and commitment to strategic excellence.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Our Philosophy</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Culture-led thinking. Strategy before aesthetics. End-to-end execution.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-center">
            Building Brands That Matter
          </h2>
          <div className="space-y-8 text-lg text-muted-foreground leading-relaxed font-body">
            <p>
              TAVARI was founded on the belief that great brands are built through strategic thinking, cultural intelligence, and exceptional execution—not trends or superficial aesthetics.
            </p>
            <p>
              We partner with organizations to create brands that stand the test of time. Our approach combines deep cultural understanding with rigorous strategic methodology to build meaningful connections between brands and their audiences.
            </p>
            <p>
              We believe the strongest brands are those that reflect authentic cultural values while driving measurable business results. This is why we place strategy before aesthetics, insight before execution, and purpose before profit.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">How We Work</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-light mb-4">Culture-Led Thinking</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We begin every engagement by understanding the cultural context, audience behaviors, and market dynamics that shape brand perception and success.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4">Strategy-First Methodology</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Every creative decision stems from strategic insight. We develop positioning frameworks that create genuine competitive advantage and measurable impact.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4">End-to-End Creative Production</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                From initial research to final delivery, we manage every aspect of creative production to ensure consistency, quality, and alignment with strategic objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8">Our Process</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-light mb-2">01. Discovery & Research</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    In-depth analysis of market landscape, competitive positioning, audience insights, and cultural context.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-2">02. Strategy Development</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    Creation of positioning frameworks, brand architecture, and strategic recommendations based on insights.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-2">03. Creative Execution</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    Translation of strategy into compelling visual identity, messaging, and brand experiences.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-2">04. Production & Delivery</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    End-to-end creative production, rollout strategy, and ongoing brand stewardship to ensure success.
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[500px] bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/TAVARI CONNECT - R.png"
                alt="Creative Production Process Framework"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-foreground text-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Ready to Build Something Meaningful?</h2>
          <p className="text-lg mb-12 font-body leading-relaxed opacity-90">
            Partner with TAVARI to create a brand that truly matters. We work with forward-thinking organizations to build lasting competitive advantage.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase bg-background text-foreground hover:bg-background/90"
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
