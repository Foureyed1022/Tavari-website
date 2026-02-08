"use client"

import { ImageWithFallback } from "@/components/ImageWithFallback"

const teamMembers = [
    {
        name: "Godfrey Kambewa",
        role: "Managing Director / Agency Lead",
        bio: "Leads Tavari’s overall vision and direction, working closely with clients and partners to turn ideas into meaningful strategies. He focuses on building strong relationships and ensuring the agency delivers work that creates real impact.",
        image: "/images/team/placeholder-1.jpg",
    },
    {
        name: "Lumbani Phiri",
        role: "Operations & Project Manager",
        bio: "Lumbani keeps everything running smoothly. From timelines to coordination, he ensures projects stay on track and teams have what they need to deliver quality work efficiently.",
        image: "/images/team/placeholder-2.jpg",
    },
    {
        name: "Ishmael Assan",
        role: "Creative Director",
        bio: "Ishmael shapes Tavari’s creative direction, translating ideas and insights into compelling visual and creative outcomes. He leads the creative process with a strong focus on storytelling, culture, and design quality.",
        image: "/images/team/placeholder-3.jpg",
    },
    {
        name: "Martinez Chakwawa",
        role: "Graphic Designer",
        bio: "Martinez brings ideas to life through thoughtful and clean visual design. He focuses on creating graphics that are clear, engaging, and aligned with Tavari’s brand and client goals.",
        image: "/images/team/placeholder-4.jpg",
    },
    {
        name: "Senzangakhona Nkunika",
        role: "Product Developer",
        bio: "Senza designs and builds Tavari’s digital products and platforms. He focuses on creating functional, user-friendly experiences while ensuring the technology supports the brand’s long-term vision.",
        image: "/images/team/placeholder-1.jpg",
    },
    {
        name: "Victor Roman Zgambo",
        role: "Finance & Administration Officer",
        bio: "Victor oversees finance and administration, ensuring the agency operates responsibly and sustainably. He supports the team by managing budgets, records, and internal systems.",
        image: "/images/team/placeholder-2.jpg",
    },
]

export function TeamSection() {
    return (
        <section className="py-32 px-6 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-20 fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-light mb-6">The Team</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed font-body max-w-3xl mx-auto">
                        A collective of strategists, creators, and producers dedicated to your vision.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group relative bg-background rounded-lg border border-border/50 overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                                <ImageWithFallback
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-sm text-foreground/90 font-body translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                                <p className="text-sm text-muted-foreground font-body uppercase tracking-wider text-xs">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
