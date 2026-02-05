import Link from "next/link"
import { ArrowRight, Target, Lightbulb, Palette, Camera, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ImageWithFallback } from "@/components/ImageWithFallback"

export const metadata = {
  title: "TAVARI — Culture-Led Brand Strategy & Creative Production",
  description: "We help organizations build meaningful, relevant, and enduring brands through strategy-first thinking and world-class creative execution.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
            Strategy-First. Culture-Led.
          </h1>
          <p className="text-xl md:text-2xl font-body max-w-3xl mx-auto mb-12 leading-relaxed text-muted-foreground">
            We help organizations build meaningful, relevant, and enduring brands through strategic thinking and world-class creative production.
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
              We partner with organizations to build brands through comprehensive creative production—from strategic insight to tangible execution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Brand Strategy</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We develop brand architectures and positioning strategies that create lasting competitive advantage through deep cultural understanding.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Creative Direction</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                From concept to execution, we craft compelling brand experiences that resonate with audiences and drive meaningful engagement.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Creative Production</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                End-to-end creative production capabilities ensuring consistent quality across all brand touchpoints and experiences.
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
              Culture-led thinking. Strategy before aesthetics. End-to-end creative production.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-light mb-6">Strategy First</h3>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                Every successful brand begins with a clear strategic foundation. We start by understanding your organization's purpose, audience, and competitive landscape.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                Through research, analysis, and cultural insight, we develop positioning strategies that create genuine differentiation and lasting relevance.
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
                Great brands require exceptional execution. We manage all aspects of creative production, from photography and video to digital experiences and physical applications.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                Our end-to-end production capabilities ensure that strategic concepts become tangible realities with consistent quality across all touchpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Creative Production Services</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
              Comprehensive creative production from strategy to final delivery
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg border border-border">
              <h3 className="text-xl font-light mb-4">Brand Strategy & Architecture</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Positioning, naming, brand architecture, and strategic frameworks that drive business results.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-background p-8 rounded-lg border border-border">
              <h3 className="text-xl font-light mb-4">Brand Identity & Design</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Visual identity systems, brand guidelines, and design applications that bring strategy to life.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-background p-8 rounded-lg border border-border">
              <h3 className="text-xl font-light mb-4">Creative Strategy & Campaigns</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Integrated campaigns, content strategies, and creative concepts that drive engagement and growth.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-background p-8 rounded-lg border border-border">
              <h3 className="text-xl font-light mb-4">Production House Services</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                End-to-end production capabilities for photography, video, digital assets, and brand applications.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-background p-8 rounded-lg border border-border">
              <h3 className="text-xl font-light mb-4">Content, Culture & Experiences</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Cultural strategy, content creation, and experiential design that builds authentic brand connections.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-background p-8 rounded-lg border border-border overflow-hidden">
              <ImageWithFallback 
                src="/images/creative-production-process.svg" 
                alt="Creative Production Process"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
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
                We deliver positioning strategies that create genuine competitive advantage and measurable business impact.
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Cultural Relevance</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Our work reflects deep cultural understanding and creates authentic connections with target audiences.
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Enduring Impact</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                We build brands that stand the test of time through thoughtful strategy and exceptional creative production.
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
