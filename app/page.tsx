import Link from "next/link"
import { ArrowRight, Target, Lightbulb, Palette, Camera, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { TeamSection } from "@/components/team-section"

export const metadata = {
  title: "TAVARI — Culture-Led Brand Strategy & Creative Production",
  description: "We help organizations build meaningful, relevant, and enduring brands through strategy-first thinking and world-class creative execution.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/ta.mp4" type="video/mp4" />
          </video>
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-background/80" />
        </div>

        {/* AI Sheen Effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none ai-sheen z-0" />

        <div className="relative z-10 text-center max-w-4xl fade-in-up">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
            Building Brands <br className="hidden md:block" /> for the Bold.
          </h1>
          <p className="text-xl md:text-2xl font-body max-w-3xl mx-auto mb-12 leading-relaxed text-muted-foreground">
            We work with organizations, businesses, and individuals to build meaningful brands through clear strategy and world-class creative production.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90 transition-transform hover:scale-105"
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
              className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase border-2 transition-transform hover:scale-105"
            >
              <Link href="/about">
                View Our Approach
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6">What We Do</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
              We partner with you to build your brand from the ground up—from the big idea to the final product.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Brand Strategy</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We help you define who you are, who you're speaking to, and how to stand out in a crowded market.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Creative Direction</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We create the look, feel, and voice of your brand to make sure it connects with people.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Creative Production</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We handle the making of everything—photos, videos, websites, and more—so your brand looks great everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Our Approach</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
              We think before we design. We focus on culture. We handle everything from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-light mb-6">Strategy First</h3>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                Success starts with a plan. We begin by understanding your goals, your audience, and what makes you unique.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                By looking at what's happening in culture and your industry, we find the best way for you to show up and stand out.
              </p>
            </div>
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/images/strategic-framework-home.svg"
                alt="Strategic Framework Visualization"
                width={500}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mt-24">
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center order-2 md:order-1 overflow-hidden">
              <ImageWithFallback
                src="/images/creative-execution-home.svg"
                alt="Creative Execution Showcase"
                width={500}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-light mb-6">Creative Production</h3>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                Great ideas need to look good. We manage all the creative work, from photography and video to your website and printed materials.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                Since we handle the production, we ensure your brand looks consistent and professional wherever people see it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-0 px-0 bg-background">
        <div className="w-full">
          <div className="container mx-auto max-w-6xl py-32 px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light mb-6">Creative Production Services</h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                Everything you need to bring your brand to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
              {/* Service 1 */}
              {/* Service 1 */}
              <div className="group relative aspect-[3/4] overflow-hidden border-r border-b border-border/20">
                <div className="absolute inset-0 bg-muted">
                  {/* Placeholder for service image */}
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-light text-white mb-3">Brand Strategy</h3>
                    <p className="text-white/80 font-body text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Naming, positioning, and planning to help your business grow.
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-white hover:text-white/80 transition-colors"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="group relative aspect-[3/4] overflow-hidden border-r border-b border-border/20">
                <div className="absolute inset-0 bg-muted">
                  <div className="w-full h-full bg-gradient-to-bl from-muted to-muted/50" />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-light text-white mb-3">Brand Identity</h3>
                    <p className="text-white/80 font-body text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Logos, colors, fonts, and design systems that bring your story to life.
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-white hover:text-white/80 transition-colors"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="group relative aspect-[3/4] overflow-hidden border-b border-border/20">
                <div className="absolute inset-0 bg-muted">
                  <div className="w-full h-full bg-gradient-to-tr from-muted to-muted/50" />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-light text-white mb-3">Creative Vision</h3>
                    <p className="text-white/80 font-body text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Campaigns and content that get people talking and engaging with you.
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-white hover:text-white/80 transition-colors"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Service 4 */}
              <div className="group relative aspect-[3/4] overflow-hidden border-r border-border/20">
                <div className="absolute inset-0 bg-muted">
                  <div className="w-full h-full bg-gradient-to-tl from-muted to-muted/50" />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-light text-white mb-3">Production</h3>
                    <p className="text-white/80 font-body text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Full-service production for photos, videos, and digital assets.
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-white hover:text-white/80 transition-colors"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Service 5 */}
              <div className="group relative aspect-[3/4] overflow-hidden border-r border-border/20">
                <div className="absolute inset-0 bg-muted">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-light text-white mb-3">Culture</h3>
                    <p className="text-white/80 font-body text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Creating moments and content that build real connections.
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-white hover:text-white/80 transition-colors"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Service 6 - Image */}
              <div className="group relative aspect-[3/4] overflow-hidden bg-background">
                <ImageWithFallback
                  src="/images/creative-production-process.svg"
                  alt="Creative Production Process"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Our Promise</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Strategic Clarity</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We give you a clear plan that gives you a real advantage.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Cultural Relevance</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Our work connects with people because we understand what they care about.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Enduring Impact</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We build brands that last by doing things right from the start.
              </p>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-border">
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
              Ready to build a brand that truly matters?
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase mt-8"
            >
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <section className="py-32 px-6">
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
      </section>

      <Footer />
    </div>
  )
}
