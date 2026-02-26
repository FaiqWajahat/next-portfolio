"use client";

import { motion } from "framer-motion";

export default function TechMarquee() {
    const technologies = [
        "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express.js",
        "MongoDB", "PostgreSQL", "Tailwind CSS", "Framer Motion", "GraphQL", "Docker"
    ];

    // Double the array to ensure seamless infinite looping
    const duplicatedTech = [...technologies, ...technologies, ...technologies];

    return (
        <section className="py-12 md:py-20 border-t border-b border-white/5 bg-neutral-950 overflow-hidden relative rotate-0 lg:-rotate-2 my-10 lg:my-0 pb-16">

            {/* Gradient fades on edges */}
            <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-background to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap gap-12"
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 40,
                }}
                style={{ width: "max-content" }}
            >
                {duplicatedTech.map((tech, i) => (
                    <span
                        key={i}
                        className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-900 uppercase opacity-80 select-none hover:text-white transition-colors duration-300"
                        style={{
                            WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)"
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </motion.div>
        </section>
    );
}
