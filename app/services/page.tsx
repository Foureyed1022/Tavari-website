import { ArrowRight, Check, Target, Palette, Lightbulb, Camera, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import Link from "next/link"

export const metadata = {
  title: "Services — TAVARI",
  description:
    "Comprehensive brand strategy, identity design, creative campaigns, and production services. Building brands that matter through strategic thinking and cultural insight.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Our Services</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Comprehensive brand development from strategy to execution
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">End-to-End Creative Production</h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-body">
            We partner with organizations to build brands through comprehensive creative production services—from concept to completion, ensuring strategic vision becomes tangible reality.
          </p>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Our Strategic Process</h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-body mb-12">
            From discovery to delivery, we guide organizations through every step of building meaningful brands
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-none px-12 py-6 font-body text-xs tracking-wider uppercase border-2 bg-transparent"
          >
            <Link href="/about">
              Explore Our Approach
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          {/* Brand Strategy & Architecture */}
          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-4xl font-light mb-6">Brand Strategy & Architecture</h3>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                Foundation for brand success. We develop positioning strategies, naming frameworks, and brand architectures that create genuine competitive advantage.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Market research and competitive analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Brand positioning and messaging frameworks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Naming strategy and brand architecture</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Strategic brand partnerships and extensions</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 h-[500px] bg-background rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/images/strategy-framework.png"
                alt="Strategic Framework Visualization"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Brand Identity & Design */}
          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="h-[500px] bg-background rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/brand.png"
                alt="Identity Design Showcase"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-4xl font-light mb-6">Brand Identity & Design</h3>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                Visual systems that bring strategy to life. We create cohesive brand identities, design guidelines, and applications that ensure consistency across all touchpoints.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Logo design and visual identity systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Brand guidelines and style manuals</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Digital and print design applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Environmental and experiential design</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Creative Strategy & Campaign Development */}
          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-4xl font-light mb-6">Creative Strategy & Campaign Development</h3>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                Compelling campaigns that drive engagement. We develop integrated marketing strategies, creative concepts, and content that build authentic brand connections.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Integrated campaign strategy and planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Creative concept development and storytelling</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Content creation and brand journalism</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Performance marketing and attribution</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 h-[500px] bg-background rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/images/creative-campaign.png"
                alt="Creative Campaign Showcase"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Production House Services */}
          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="h-[500px] bg-background rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/images/production-capabilities.svg"
                alt="Production Capabilities"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-4xl font-light mb-6">Creative Production & Execution</h3>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                Complete creative production services from concept to delivery. We manage every aspect of creative asset creation, from photography and video to digital experiences and physical applications.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Photography, video, and motion graphics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Digital experiences and interactive design</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Physical production and fabrication</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Project management and quality assurance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Content, Culture & Experiences */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-4xl font-light mb-6">Content, Culture & Experiences</h3>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                Cultural intelligence and experiential design. We create content strategies, cultural frameworks, and brand experiences that build authentic connections.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Cultural strategy and trend analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Content strategy and brand storytelling</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Experiential design and brand activations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Community building and cultural programming</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 h-[500px] bg-background rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/images/cultural-experience.svg"
                alt="Cultural Experience Design"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Events */}
          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="h-[500px] bg-background rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/images/events-experience.svg"
                alt="Events & Experience Design"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-4xl font-light mb-6">Events</h3>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                We plan and deliver well-designed events and experiences that bring people, brands, and ideas together. Each event is curated with intention, from concept to execution.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Event concept and strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Experience design and production</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Guest management and logistics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Brand activation and engagement</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Merchandise (Apparel) */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-4xl font-light mb-6">Merchandise (Apparel)</h3>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">
                We design and produce apparel and branded merchandise that reflects identity, culture, and purpose. Our focus is on clean design, quality materials, and meaningful expression.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Apparel design and production</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Branded merchandise collections</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Sourcing and material selection</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-1 flex-shrink-0" />
                  <span className="font-body text-sm">Quality control and logistics</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 h-[500px] bg-background rounded-lg flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/images/merchandise-design.svg"
                alt="Merchandise Design"
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
