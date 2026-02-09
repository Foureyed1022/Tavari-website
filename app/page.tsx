import Link from "next/link"
import { ArrowRight, Target, Lightbulb, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { TeamSection } from "@/components/team-section"
import { HeroSection } from "@/components/hero-section"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ServicesSection } from "@/components/services-section"
import { PromiseSection } from "@/components/promise-section"

export const metadata = {
  title: "TAVARI — Culture-Led Brand Strategy & Creative Production",
  description: "We help organizations build meaningful, relevant, and enduring brands through strategy-first thinking and world-class creative execution.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* What We Do Section */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Our Services</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
              We combine strategy, creativity, and execution to deliver measurable impact and compelling storytelling across every touchpoint.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-light mb-4">Brand Strategy</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  We help you define who you are, who you're speaking to, and how to stand out in a crowded market.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-light mb-4">Creative Direction</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  We create the look, feel, and voice of your brand to make sure it connects with people.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="text-center">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-light mb-4">Creative Production</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  We handle the making of everything—photos, videos, websites, and more—so your brand looks great everywhere.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6">The Tavari Approach</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
              Turning ideas into powerful stories and results through a seamless integration of strategic thinking and world-class production.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <h3 className="text-3xl font-light mb-6">Strategy First</h3>
                <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                  Success starts with a plan. We begin by understanding your goals, your audience, and what makes you unique.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  By looking at what's happening in culture and your industry, we find the best way for you to show up and stand out.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="h-80 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src="/images/strategic-framework-home.svg"
                  alt="Strategic Framework Visualization"
                  width={500}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
            <ScrollReveal delay={0.2}>
              <div className="h-80 bg-muted rounded-lg flex items-center justify-center order-2 md:order-1 overflow-hidden">
                <ImageWithFallback
                  src="/images/creative-execution-home.svg"
                  alt="Creative Execution Showcase"
                  width={500}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-light mb-6">Creative Production</h3>
                <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                  Great ideas need to look good. We manage all the creative work, from photography and video to your website and printed materials.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Since we handle the production, we ensure your brand looks consistent and professional wherever people see it.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <ServicesSection />

      {/* Our Promise Section */}
      <PromiseSection />

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <section className="py-32 px-6">
        <ScrollReveal>
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-8">Ready to Bring Your Vision to Life?</h2>
            <p className="text-lg text-muted-foreground font-body mb-12 leading-relaxed">
              Partner with us for end-to-end creative production that transforms strategic concepts into tangible realities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/contact">
                  Work With Tavari
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase border-2"
              >
                <Link href="/production">
                  View Our Production
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Focus Areas Section */}
      <section className="py-32 px-6 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light mb-6">Our Focus Areas</h2>
              <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                Specialized expertise across diverse sectors to drive meaningful change and commercial success.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Corporate & Commercial", icon: Target },
              { title: "NGOs & Development", icon: Lightbulb },
              { title: "Tourism & Destination", icon: Camera },
              { title: "Creative & Culture", icon: ArrowRight }
            ].map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 0.1}>
                <div className="p-8 bg-background border border-border/50 hover:border-primary/50 transition-colors group text-center h-full flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <area.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h4 className="text-lg font-medium leading-tight">{area.title}</h4>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
