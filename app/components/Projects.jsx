"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useTransform, useSpring } from "framer-motion";

/* ── Tilt + magnetic card wrapper ─────────────────────────────── */
function TiltCard({ children, className, style }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], ["4deg", "-4deg"]);
    const rotateY = useTransform(x, [-0.5, 0.5], ["-4deg", "4deg"]);

    const springConfig = { stiffness: 200, damping: 25 };
    const sRotateX = useSpring(rotateX, springConfig);
    const sRotateY = useSpring(rotateY, springConfig);
    const sScale = useSpring(1, { stiffness: 250, damping: 22 });

    const shineXVal = useMotionValue(50);
    const shineYVal = useMotionValue(50);
    const shineX = useSpring(shineXVal, { stiffness: 180, damping: 20 });
    const shineY = useSpring(shineYVal, { stiffness: 180, damping: 20 });

    const shineBackground = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.07) 0%, transparent 65%)`;

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;
        x.set(nx - 0.5);
        y.set(ny - 0.5);
        shineXVal.set(nx * 100);
        shineYVal.set(ny * 100);
        sScale.set(1.025);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        shineXVal.set(50);
        shineYVal.set(50);
        sScale.set(1);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: sRotateX,
                rotateY: sRotateY,
                scale: sScale,
                transformStyle: "preserve-3d",
                transformPerspective: 800,
                ...style,
            }}
            className={className}
        >
            {/* Specular shine that follows cursor */}
            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: shineBackground }}
            />
            {children}
        </motion.div>
    );
}

/* ── Scroll-in card variants ──────────────────────────────────── */
const scrollVariants = {
    hidden: (i) => ({
        opacity: 0,
        y: 50 + i * 8,
        scale: 0.92,
        filter: "blur(8px)",
    }),
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 18,
            delay: i * 0.12,
            filter: { duration: 0.4, delay: i * 0.12 },
        },
    }),
};

/* ── Tag stagger variants ─────────────────────────────────────── */
const tagContainerVariants = {
    rest: {},
    hover: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const tagVariants = {
    rest: { opacity: 0.7, y: 0, scale: 1 },
    hover: {
        opacity: 1, y: -3, scale: 1.08,
        transition: { type: "spring", stiffness: 300, damping: 18 },
    },
};

/* ── Main component ───────────────────────────────────────────── */
export default function Projects() {
    const [showAll, setShowAll] = useState(false);

    const projects = [
        {
            title: "MockMate AI",
            description:
                "A proprietary, AI-driven mock interview platform. Architected with a highly unique evaluation engine to provide real-time, context-aware feedback, setting a new technical standard for automated interview preparation.",
            tags: ["Next.js", "GPT-4 API", "Tailwind CSS"],
            span: "md:col-span-2 md:row-span-2",
            color: "from-blue-500/30 to-purple-500/30",
            border: "hover:border-blue-500/40",
            glow: "rgba(99,102,241,0.35)",
        },
        {
            title: "Fintech Analytics Core",
            description:
                "A high-frequency trading analytics dashboard visualizing massive datasets with sub-second latency.",
            tags: ["React", "D3.js", "WebSockets"],
            span: "md:col-span-1 md:row-span-1",
            color: "from-emerald-500/30 to-teal-500/30",
            border: "hover:border-emerald-500/40",
            glow: "rgba(16,185,129,0.3)",
        },
        {
            title: "OmniChain DEX",
            description:
                "A decentralized exchange interface focusing on cross-chain interoperability and military-grade security UX.",
            tags: ["Web3.js", "Solidity", "Tailwind"],
            span: "md:col-span-1 md:row-span-2",
            color: "from-orange-500/30 to-red-500/30",
            border: "hover:border-orange-500/40",
            glow: "rgba(249,115,22,0.3)",
        },
        {
            title: "Enterprise ERP",
            description:
                "Enterprise-grade resource planning architecture designed explicitly for construction workflows and dynamic payroll.",
            tags: ["Node.js", "PostgreSQL", "Redis"],
            span: "md:col-span-1 md:row-span-1",
            color: "from-indigo-500/30 to-cyan-500/30",
            border: "hover:border-indigo-500/40",
            glow: "rgba(99,102,241,0.3)",
        },
        {
            title: "SaaS Comms Platform",
            description:
                "A real-time, unified communications suite for remote teams bridging VoIP, video, and text.",
            tags: ["WebRTC", "Socket.io", "React"],
            span: "md:col-span-1 md:row-span-1",
            color: "from-pink-500/30 to-rose-500/30",
            border: "hover:border-pink-500/40",
            glow: "rgba(236,72,153,0.3)",
        },
        {
            title: "B2B Custom Apparel",
            description:
                "A full-stack headless storefront engineered for bulk orders with complex variable pricing engines.",
            tags: ["Next.js", "Stripe API", "GraphQL"],
            span: "md:col-span-3 md:row-span-1",
            color: "from-yellow-500/30 to-amber-500/30",
            border: "hover:border-yellow-500/40",
            glow: "rgba(234,179,8,0.3)",
        },
    ];

    return (
        <section
            id="projects"
            className="min-h-screen py-32 container mx-auto px-6 max-w-7xl border-t border-white/10"
        >
            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-20 text-foreground text-center lg:text-left">
                    Selected Works.
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[250px] md:auto-rows-[300px]">
                    {projects.map((project, index) => {
                        const mobileHidden = !showAll && index >= 3;

                        return (
                            /* ── Scroll-in wrapper ── */
                            <motion.div
                                key={index}
                                custom={index}
                                variants={scrollVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-80px" }}
                                className={`${project.span} ${mobileHidden ? "hidden md:block" : "block"}`}
                            >
                                {/* ── Tilt / hover card ── */}
                                <TiltCard
                                    style={{ boxShadow: `0 0 0 0 ${project.glow}` }}
                                    className={`group h-full flex flex-col justify-end p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 ${project.border} relative overflow-hidden cursor-default transition-[border-color,box-shadow] duration-500`}
                                >
                                    {/* Hover gradient fill */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${project.color} pointer-events-none rounded-3xl`}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />

                                    {/* Drifting colour blob */}
                                    <motion.div
                                        className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${project.color} blur-3xl pointer-events-none`}
                                        animate={{ x: [0, 10, -6, 0], y: [0, -8, 6, 0] }}
                                        transition={{
                                            duration: 8 + index,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    {/* Index badge */}
                                    <span className="absolute top-6 right-7 text-[11px] font-black tracking-widest text-white/20 group-hover:text-white/50 transition-colors duration-500 select-none">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Card content */}
                                    <motion.div
                                        className="relative z-10 flex flex-col h-full justify-end"
                                        initial={false}
                                        whileHover="hover"
                                        animate="rest"
                                    >
                                        <motion.h3
                                            className="text-3xl font-black mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors duration-300"
                                            variants={{
                                                rest: { y: 0 },
                                                hover: { y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } },
                                            }}
                                        >
                                            {project.title}
                                        </motion.h3>

                                        <motion.p
                                            className={`text-neutral-400 leading-relaxed mb-5 font-medium max-w-xl drop-shadow-lg ${index === 0 || index===5 ? "md:text-xl textt-sm h-auto overflow-hidden" : "text-sm"}`}
                                            variants={{
                                                rest: { opacity: 0.7, y: 0 },
                                                hover: { opacity: 1, y: -3, transition: { type: "spring", stiffness: 200, damping: 20 } },
                                            }}
                                        >
                                            {project.description}
                                        </motion.p>

                                        {/* Tags */}
                                        <motion.div
                                            className="flex flex-wrap gap-2 mt-auto"
                                            variants={tagContainerVariants}
                                        >
                                            {project.tags.map((tag, tagIndex) => (
                                                <motion.span
                                                    key={tagIndex}
                                                    variants={tagVariants}
                                                    className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/5 border border-white/10 text-neutral-300 backdrop-blur-md"
                                                >
                                                    {tag}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View More — mobile only */}
                {!showAll && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center mt-10 md:hidden"
                    >
                        <button
                            onClick={() => setShowAll(true)}
                            className="group relative px-8 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View More Projects
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                        </button>
                    </motion.div>
                )}

                {/* Show Less — mobile only */}
                {showAll && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mt-10 md:hidden"
                    >
                        <button
                            onClick={() => setShowAll(false)}
                            className="group relative px-8 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Show Less
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
