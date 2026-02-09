"use client"

import Link from "next/link"
import { ArrowRight, Shield, Target, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function PromiseSection() {
    return (
        <section className="py-32 px-6">
            <div className="container mx-auto max-w-4xl text-center">
                <ScrollReveal>
                    <h2 className="text-4xl md:text-5xl font-light mb-12">Our Promise</h2>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-12">
                    <ScrollReveal delay={0.1}>
                        <div>
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="h-6 w-6 text-foreground" />
                            </div>
                            <h3 className="text-xl font-light mb-4">Strategic Clarity</h3>
                            <p className="text-muted-foreground font-body text-sm leading-relaxed">
                                We give you a clear plan that gives you a real advantage.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div>
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                <Target className="h-6 w-6 text-foreground" />
                            </div>
                            <h3 className="text-xl font-light mb-4">Cultural Relevance</h3>
                            <p className="text-muted-foreground font-body text-sm leading-relaxed">
                                Our work connects with people because we understand what they care about.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <div>
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lightbulb className="h-6 w-6 text-foreground" />
                            </div>
                            <h3 className="text-xl font-light mb-4">Enduring Impact</h3>
                            <p className="text-muted-foreground font-body text-sm leading-relaxed">
                                We build brands that last by doing things right from the start.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={0.4}>
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
                </ScrollReveal>
            </div>
        </section>
    )
}
