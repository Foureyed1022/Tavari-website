"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    // Parallax efffects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center pt-32 px-6 overflow-hidden"
        >
            {/* Parallax Video Background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: backgroundY }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/ta.mp4" type="video/mp4" />
                </video>
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-background/70" />
            </motion.div>

            {/* AI Sheen Effect - kept separate or integrated */}
            <div className="absolute inset-0 opacity-20 pointer-events-none ai-sheen z-0" />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center max-w-4xl"
                style={{ y: textY, opacity }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.h1
                    className="text-5xl md:text-8xl font-light tracking-tight mb-8 leading-tight italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    Creative. <br className="md:hidden" />
                    Strategic. <br className="md:hidden" />
                    Impact-Driven.
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl font-body max-w-3xl mx-auto mb-12 leading-relaxed text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Tavari is a full-service marketing and production house offering end-to-end creative, communication, and production solutions for brands, institutions, and development partners.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Button
                        asChild
                        size="lg"
                        className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90 transition-transform hover:scale-105"
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
                        className="rounded-none px-12 py-8 font-body text-sm tracking-wider uppercase border-2 transition-transform hover:scale-105"
                    >
                        <Link href="/about">
                            View Our Approach
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    )
}
