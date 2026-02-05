import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Thinking — TAVARI",
  description: "Insights and perspectives on creative production, culture-led strategy, and brand development from our work at TAVARI.",
}

export default function LookbookPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8">Our Thinking</h1>
          <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Insights and perspectives on creative production and culture-led brand strategy
          </p>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Insight 1 */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-light mb-4">The Cultural Imperative</h3>
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                Why brands that tap into cultural currents outperform those that don't, with examples from recent market shifts.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>

            {/* Insight 2 */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-light mb-4">Strategy-First Production</h3>
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                How strategic thinking before production decisions leads to more effective and enduring creative outputs.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>

            {/* Insight 3 */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-light mb-4">Production as Differentiator</h3>
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                Exploring how exceptional production quality creates genuine differentiation in saturated markets.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Insight 4 */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-light mb-4">End-to-End Execution</h3>
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                The importance of maintaining strategic coherence across all brand touchpoints and experiences.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>

            {/* Insight 5 */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-light mb-4">Cultural Mapping</h3>
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                A framework for understanding cultural movements and positioning brands within them.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>

            {/* Insight 6 */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-light mb-4">Brand Stewardship</h3>
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                Ensuring brand consistency and evolution in rapidly changing cultural landscapes.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Insight 4 */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-light mb-4">The Production Imperative</h3>
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                Why exceptional production quality is essential for brand differentiation in today's saturated markets.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>

            {/* Insight 5 */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-light mb-4">From Strategy to Screen</h3>
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                Bridging the gap between strategic concepts and tangible creative output with end-to-end production workflows.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>

            {/* Insight 6 */}
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-light mb-4">Quality Assurance in Production</h3>
              <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">
                Ensuring consistent quality across all creative production touchpoints and brand applications.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-none px-6 py-2 font-body text-xs tracking-wider uppercase"
              >
                <Link href="#">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-muted">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8">Want More Insights?</h2>
          <p className="text-lg text-muted-foreground font-body mb-12 leading-relaxed">
            Subscribe to our newsletter for quarterly insights on culture, strategy, and creative production.
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