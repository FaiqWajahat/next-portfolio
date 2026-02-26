"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
    const skills = [
        {
            category: "Frontend Engineering",
            smallCategory: "Frontend Core",
            items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
            color: "text-blue-400",
            bgGradient: "from-blue-500/10 to-transparent",
        },
        {
            category: "Backend Engineering  ",
            smallCategory: "Backend Core",
            items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Redis"],
            color: "text-emerald-400",
            bgGradient: "from-emerald-500/10 to-transparent",
        },
        {
            category: "Systems & Design",
            smallCategory:"Systems & Design",
            items: ["System Design", "RESTful APIs", "Microservices", "Docker", "AWS"],
            color: "text-purple-400",
            bgGradient: "from-purple-500/10 to-transparent",
        },
    ];

    // --- Advanced 3D Tilt Card with Spotlight ---
    const TiltCard = ({ group }) => {
        const cardRef = useRef(null);

        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
        const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

        const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
        const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

        const handleMouseMove = (e) => {
            const rect = cardRef.current.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        // Use motion values directly for linear background position (no spring here to prevent lag)
        const bgX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
        const bgY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

        return (
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full w-full rounded-3xl "
            >
                <motion.div
                    className={`h-full w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col relative overflow-hidden group`}
                    style={{ transform: "translateZ(50px)" }} // Push content out in 3D space
                >
                    {/* Spotlight Effect */}
                    <motion.div
                        className={`absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_farthest-corner_at_var(--x)_var(--y),_rgba(255,255,255,0.06)_0%,_transparent_50%)]`}
                        style={{
                            "--x": bgX,
                            "--y": bgY,
                        }}
                    />

                    <h3 className={`text-3xl text-left hidden md:block font-black mb-8 tracking-tighter ${group.color} drop-shadow-md`}>
                        {group.category}
                    </h3>
                    <h3 className={`text-3xl text-left block md:hidden font-black mb-8 tracking-tighter ${group.color} drop-shadow-md`}>
                        {group.smallCategory}
                    </h3>
                    <ul className="flex flex-col gap-5 flex-grow font-mono text-sm uppercase tracking-widest">
                        {group.items.map((item) => (
                            <li key={item} className="flex items-center text-neutral-400 font-bold">
                                <span className={`w-2 h-2 rounded-sm ${group.color.replace('text-', 'bg-')} bg-opacity-50 mr-4 shadow-[0_0_10px_currentColor]`} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <section
            id="expertise"
            className="min-h-screen   py-32 container mx-auto px-6 max-w-[100vw] flex flex-col justify-center  relative"

        >
            {/* Background grain continuation */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"

            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="max-w-7xl mx-auto w-full relative z-10"
            >
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-20 text-foreground text-center lg:text-left">
                    Core Expertise.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {skills.map((group, index) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.15 }}
                            className="h-[400px]" // Fixed height for consistent 3D effect
                        >
                            <TiltCard group={group} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
