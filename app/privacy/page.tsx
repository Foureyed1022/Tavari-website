import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy — TAVARI",
  description: "Privacy policy for TAVARI brand strategy and creative consultancy services.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-24 px-6">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Privacy Policy</h1>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-light mb-6">Information We Collect</h2>
            <p className="text-muted-foreground font-body mb-8">
              We collect information you provide directly to us through our website contact forms, email communications, and project inquiries. This may include your name, organization, email address, phone number, and project details.
            </p>

            <h2 className="text-2xl font-light mb-6">How We Use Your Information</h2>
            <p className="text-muted-foreground font-body mb-8">
              We use the information we collect to:
            </p>
            <ul className="text-muted-foreground font-body mb-8 list-disc pl-6 space-y-2">
              <li>Respond to your inquiries and provide our services</li>
              <li>Communicate with you about potential projects and collaborations</li>
              <li>Send you relevant updates about our services</li>
              <li>Improve our website and service offerings</li>
            </ul>

            <h2 className="text-2xl font-light mb-6">Information Sharing</h2>
            <p className="text-muted-foreground font-body mb-8">
              We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners who assist us in operating our business, provided they agree to keep this information confidential.
            </p>

            <h2 className="text-2xl font-light mb-6">Data Security</h2>
            <p className="text-muted-foreground font-body mb-8">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-light mb-6">Your Rights</h2>
            <p className="text-muted-foreground font-body mb-8">
              You have the right to access, update, or delete your personal information. You may opt out of receiving our communications at any time.
            </p>

            <h2 className="text-2xl font-light mb-6">Contact Us</h2>
            <p className="text-muted-foreground font-body">
              If you have questions about this privacy policy, please contact us at privacy@tavari.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}