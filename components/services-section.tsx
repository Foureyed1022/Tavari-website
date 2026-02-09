"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ImageWithFallback } from "@/components/ImageWithFallback"

export function ServicesSection() {
    const services = [
        {
            title: "Brand Strategy",
            description: "Naming, positioning, and planning to help your business grow.",
            gradient: "from-muted to-muted/50",
            border: "border-r border-b",
        },
        {
            title: "Brand Identity",
            description: "Logos, colors, fonts, and design systems that bring your story to life.",
            gradient: "from-muted to-muted/50", // Adjusted for variation ideally
            border: "border-r border-b",
        },
        {
            title: "Creative Vision",
            description: "Campaigns and content that get people talking and engaging with you.",
            gradient: "from-muted to-muted/50",
            border: "border-b",
        },
        {
            title: "Production",
            description: "Full-service production for photos, videos, and digital assets.",
            gradient: "from-muted to-muted/50",
            border: "border-r",
        },
        {
            title: "Culture",
            description: "Creating moments and content that build real connections.",
            gradient: "from-muted to-muted/50",
            border: "border-r",
        },
        {
            title: "Events",
            description: "We plan and deliver well-designed events and experiences that bring people, brands, and ideas together.",
            gradient: "from-muted to-muted/50",
            border: "border-b",
        },
        {
            title: "Merchandise (Apparel)",
            description: "We design and produce apparel and branded merchandise that reflects identity, culture, and purpose.",
            gradient: "from-muted to-muted/50",
            border: "border-r",
        }
    ]

    return (
        <section className="py-0 px-0 bg-background">
            <div className="w-full">
                <div className="container mx-auto max-w-6xl py-32 px-6">
                    <ScrollReveal>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-light mb-6">Creative Production Services</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                                Everything you need to bring your brand to life.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
                        {services.map((service, index) => (
                            <ScrollReveal key={index} delay={index * 0.1} className={`group relative aspect-[3/4] overflow-hidden ${service.border} border-border/20`}>
                                <div className="absolute inset-0 bg-muted">
                                    <div className={`w-full h-full bg-gradient-to-br ${service.gradient}`} />
                                </div>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-2xl font-light text-white mb-3">{service.title}</h3>
                                        <p className="text-white/80 font-body text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {service.description}
                                        </p>
                                        <Link
                                            href="/services"
                                            className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-white hover:text-white/80 transition-colors"
                                        >
                                            Learn More <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}

                        {/* Image Card */}
                        <ScrollReveal delay={0.8} className="group relative aspect-[3/4] overflow-hidden bg-background">
                            <ImageWithFallback
                                src="/images/creative-production-process.svg"
                                alt="Creative Production Process"
                                width={800}
                                height={1000}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
