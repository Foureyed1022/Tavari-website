import Link from "next/link"
import { ArrowRight, Camera, Palette, Video, FileImage, Package, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ImageWithFallback } from "@/components/ImageWithFallback"

export const metadata = {
  title: "Production — TAVARI",
  description: "Creative production capabilities at TAVARI. Photography, video, digital experiences, and physical production services.",
}

export default function ProductionPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Creative Production</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            End-to-end creative production services from concept to completion
          </p>
        </div>
      </section>

      {/* Production Capabilities */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Our Production Capabilities</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
              Comprehensive creative production services that bring strategic concepts to life with exceptional quality and attention to detail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted p-8 rounded-lg">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <Camera className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Photography</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Professional photography services for brand assets, product shots, lifestyle imagery, and marketing materials.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Inquire <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-muted p-8 rounded-lg">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <Video className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Video Production</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Complete video production from concept to final delivery, including motion graphics and animation.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Inquire <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-muted p-8 rounded-lg">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <Monitor className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Digital Experiences</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Interactive digital experiences, web design, and digital asset creation for online presence.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Inquire <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-muted p-8 rounded-lg">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <FileImage className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Graphic Design</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Comprehensive graphic design services for print and digital applications across all brand touchpoints.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Inquire <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-muted p-8 rounded-lg">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <Package className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Physical Production</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Fabrication, packaging, signage, and physical brand applications with quality craftsmanship.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Inquire <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-muted p-8 rounded-lg">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <Palette className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-light mb-4">Creative Direction</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                Creative oversight and direction to ensure consistency and quality across all production efforts.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide hover:text-foreground transition-colors"
              >
                Inquire <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Our Production Process</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
              A structured approach to creative production that ensures quality, consistency, and strategic alignment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                <ImageWithFallback
                  src="/images/brief-concept.svg"
                  alt="Brief & Concept"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-light mb-4">Brief & Concept</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Understanding requirements and developing initial creative concepts aligned with strategic objectives.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                <ImageWithFallback
                  src="/images/development.svg"
                  alt="Development"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-light mb-4">Development</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Refining concepts and creating initial designs, layouts, or production plans with client input.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                <ImageWithFallback
                  src="/images/execution.svg"
                  alt="Execution"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-light mb-4">Execution</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Bringing concepts to life with meticulous attention to detail and quality standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                <ImageWithFallback
                  src="/images/delivery.svg"
                  alt="Delivery"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-light mb-4">Delivery</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Final review, quality assurance, and delivery of production assets with documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Ready to Start Production?</h2>
          <p className="text-lg text-muted-foreground font-body mb-12 leading-relaxed">
            Partner with us for end-to-end creative production that brings your brand vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase"
            >
              <Link href="/contact">
                Discuss Your Project
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