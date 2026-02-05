import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service — TAVARI",
  description: "Terms of service for TAVARI brand strategy and creative consultancy services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Terms of Service</h1>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-light mb-6">1. Services</h2>
            <p className="text-muted-foreground font-body mb-8">
              TAVARI provides brand strategy, identity design, creative strategy, production services, and related consulting services to organizations and institutions.
            </p>

            <h2 className="text-2xl font-light mb-6">2. Client Responsibilities</h2>
            <p className="text-muted-foreground font-body mb-8">
              Clients are responsible for providing accurate information, timely feedback, and necessary approvals throughout the project process.
            </p>

            <h2 className="text-2xl font-light mb-6">3. Intellectual Property</h2>
            <p className="text-muted-foreground font-body mb-8">
              All work product remains the property of TAVARI until full payment is received. Upon payment, intellectual property rights transfer to the client as specified in the project agreement.
            </p>

            <h2 className="text-2xl font-light mb-6">4. Confidentiality</h2>
            <p className="text-muted-foreground font-body mb-8">
              Both parties agree to maintain confidentiality of proprietary information shared during the engagement.
            </p>

            <h2 className="text-2xl font-light mb-6">5. Limitation of Liability</h2>
            <p className="text-muted-foreground font-body mb-8">
              TAVARI's liability is limited to the total fees paid for the specific project. We are not liable for indirect, incidental, or consequential damages.
            </p>

            <h2 className="text-2xl font-light mb-6">6. Governing Law</h2>
            <p className="text-muted-foreground font-body">
              These terms are governed by the laws of the jurisdiction where TAVARI operates, with disputes resolved through arbitration.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}