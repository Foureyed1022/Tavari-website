"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ImageWithFallback } from "@/components/ImageWithFallback"

export function ServicesSection() {
    const services = [
        {
            title: "Brand Strategy & Marketing",
            description: "Brand development, positioning, and identity design for impactful market presence.",
            deliverables: ["Brand toolkits", "Strategy decks", "Campaign plans"],
            gradient: "from-slate-900 to-slate-800",
            border: "border-r border-b",
        },
        {
            title: "Creative Design & Content",
            description: "Visual storytelling through graphic design, copywriting, and motion graphics.",
            deliverables: ["Marketing collateral", "Digital assets", "Creative packs"],
            gradient: "from-zinc-900 to-zinc-800",
            border: "border-r border-b",
        },
        {
            title: "Audio-Visual Production",
            description: "High-end commercials, documentaries, photography, and event coverage.",
            deliverables: ["TVCs & Films", "Edited videos", "Photo libraries"],
            gradient: "from-neutral-900 to-neutral-800",
            border: "border-b",
        },
        {
            title: "Digital Marketing & Media",
            description: "Comprehensive social media, digital advertising, and influencer management.",
            deliverables: ["Content calendars", "Ad reports", "Influencer packages"],
            gradient: "from-stone-900 to-stone-800",
            border: "border-r border-b",
        },
        {
            title: "PR & Communications",
            description: "Media relations, reputation management, and strategic press monitoring.",
            deliverables: ["Press kits", "Media reports", "PR summaries"],
            gradient: "from-slate-950 to-slate-900",
            border: "border-r border-b",
        },
        {
            title: "Events & Activations",
            description: "Memorable brand experiences, product launches, and cultural event execution.",
            deliverables: ["Concepts", "Activation toolkits", "Recap reports"],
            gradient: "from-zinc-950 to-zinc-900",
            border: "border-b",
        },
        {
            title: "Talent Management",
            description: "Coordinating influencers, brand ambassadors, and creative talent for campaigns.",
            deliverables: ["Talent portfolios", "Engagement reports"],
            gradient: "from-neutral-950 to-neutral-900",
            border: "border-r",
        },
        {
            title: "Consultancy & Research",
            description: "Market research, campaign evaluation, and creative skills training.",
            deliverables: ["Training manuals", "Research reports", "Assessments"],
            gradient: "from-stone-950 to-stone-900",
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
                                        <h3 className="text-xl font-light text-white mb-2 leading-tight">{service.title}</h3>
                                        <p className="text-white/70 font-body text-xs leading-relaxed mb-4 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {service.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            {service.deliverables?.map(d => (
                                                <span key={d} className="text-[10px] uppercase tracking-widest text-white/50 border border-white/20 px-2 py-1 rounded-sm bg-white/5">
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                        <Link
                                            href="/services"
                                            className="inline-flex items-center gap-2 text-[10px] font-body uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                                        >
                                            Inquire <ArrowRight className="h-3 w-3" />
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
