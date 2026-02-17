import Link from "next/link"
import { ArrowRight, Target, Lightbulb, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ImageWithFallback } from "@/components/ImageWithFallback"

export const metadata = {
  title: "Work TAVARI",
  description: "Selected case studies showcasing our strategic approach to brand development and creative execution.",
}

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Selected Work</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Case studies demonstrating our approach to strategic brand development and creative production
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            {/* Case Study 1 */}
            <div className="bg-muted rounded-lg p-8">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Financial Services Rebrand</h3>
              <div className="h-48 bg-background rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <ImageWithFallback
                  src="/images/case-study-finance.svg"
                  alt="Financial Services Rebrand"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                Complete brand transformation including strategy, identity design, and end-to-end production across digital and physical touchpoints for a leading financial institution.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Brand Strategy</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Identity Design</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Digital Production</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Physical Assets</span>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  View Case Study
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>

            {/* Case Study 2 */}
            <div className="bg-muted rounded-lg p-8">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Tech Startup Positioning</h3>
              <div className="h-48 bg-background rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <ImageWithFallback
                  src="/images/case-study-tech.svg"
                  alt="Tech Startup Positioning"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                Full-service creative production from brand conception to market launch, including photography, video content, digital experiences, and physical brand applications.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Brand Positioning</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Video Production</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Digital Assets</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Campaign Execution</span>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  View Case Study
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Case Study 3 */}
            <div className="bg-muted rounded-lg p-8">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <Palette className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Cultural Institution Identity</h3>
              <div className="h-48 bg-background rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <ImageWithFallback
                  src="/images/case-study-cultural.svg"
                  alt="Cultural Institution Identity"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                Comprehensive creative production project including environmental design, exhibition materials, digital experiences, and multimedia installations.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Brand Identity</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Environmental Design</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Multimedia Production</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Fabrication</span>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  View Case Study
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>

            {/* Case Study 4 */}
            <div className="bg-muted rounded-lg p-8">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-light mb-4">Consumer Brand Campaign</h3>
              <div className="h-48 bg-background rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <ImageWithFallback
                  src="/images/case-study-consumer.svg"
                  alt="Consumer Brand Campaign"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                Integrated campaign production featuring photography, video content, digital assets, packaging design, and experiential activations.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Campaign Strategy</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Content Creation</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Video Production</span>
                <span className="px-3 py-1 bg-background text-xs font-body uppercase tracking-wide rounded">Physical Production</span>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  View Case Study
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-center mt-20 pt-12 border-t border-border">
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto mb-8 leading-relaxed">
              Interested in seeing how we can help transform your brand?
            </p>
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
