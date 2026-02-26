"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

const ROLES = [
    "Full-Stack Engineer",
    "MERN Stack Architect",
    "UI/UX Craftsman",
    "Next.js Specialist",
];

export default function Hero() {
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const [roleIndex, setRoleIndex] = useState(0);
    // Use MotionValues instead of useState to avoid re-renders on magnetic move
    const buttonX = useMotionValue(0);
    const buttonY = useMotionValue(0);

    // Scroll-based parallax
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const yBg = useTransform(scrollYProgress, [0, 1], [0, 160]);
    const opacitySection = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Spring-based mouse tracker for the ambient glow
    const springCfg = { stiffness: 80, damping: 20 };
    const glowX = useSpring(0, springCfg);
    const glowY = useSpring(0, springCfg);

    useEffect(() => {
        const move = (e) => {
            glowX.set(e.clientX - 500);
            glowY.set(e.clientY - 500);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [glowX, glowY]);

    // Cycle through role titles every 2.5 seconds
    useEffect(() => {
        const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2500);
        return () => clearInterval(id);
    }, []);

    // Magnetic button — uses MotionValue.set() so no React re-render fires
    const handleButtonMouse = (e) => {
        const rect = buttonRef.current.getBoundingClientRect();
        buttonX.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
        buttonY.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
    };

    // Stagger entrance animation variants
    const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } };
    const fadeUp = {
        hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 90, damping: 22 } },
    };

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative min-h-screen w-full overflow-hidden bg-[#030303] flex items-center pt-10"
        >
            {/* ── Dot Grid Background ─────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />
            {/* Vignette to fade out grid edges */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#030303_100%)]" />

            {/* ── Ambient Mouse-Following Glow ─────────────── */}
            <motion.div
                style={{ x: glowX, y: glowY }}
                className="absolute w-[1000px] h-[1000px] rounded-full pointer-events-none"
                style2={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 60%)",
                }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 60%)" }}
                />
            </motion.div>

            {/* ── Accent Aurora Orbs (Parallaxed) ──────────── */}
            <motion.div
                style={{ y: yBg }}
                className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-blue-700/10 blur-[140px] pointer-events-none mix-blend-screen"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
                className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/8 blur-[120px] pointer-events-none mix-blend-screen"
            />

            {/* ── Main Content ──────────────────────────────── */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                style={{ opacity: opacitySection }}
                className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-28 pb-20 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-16"
            >
                {/* LEFT: Big name + role switcher */}
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                    {/* Overline label */}
                    <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                        <div className="w-8 h-[2px] bg-primary" />
                        <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">
                            Portfolio — 2026
                        </span>
                    </motion.div>

                    {/* Giant name — the real hero */}
                    <div className="pb-2 mb-0">
                        <motion.h1
                            variants={fadeUp}
                            className="text-[14vw] lg:text-[10vw] font-black tracking-[-0.04em] leading-none pb-4 text-white"
                        >
                            Faiq
                        </motion.h1>
                    </div>
                    <div>
                        <motion.h1
                            variants={fadeUp}
                            className="text-[14vw] lg:text-[10vw] font-black tracking-[-0.04em] leading-none pb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-indigo-400"
                        >
                            Wajahat.
                        </motion.h1>
                    </div>

                    {/* Animated role switcher */}
                    <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center lg:justify-start gap-4 h-12 overflow-hidden">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                        <div className="relative flex-1 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={roleIndex}
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    exit={{ y: "-100%", opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute left-0 top-0 text-2xl md:text-3xl font-semibold text-neutral-300 tracking-tight whitespace-nowrap"
                                >
                                    {ROLES[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: Description + CTA + Stats */}
                <div className="lg:max-w-[380px] flex flex-col items-center lg:items-start gap-10 lg:pb-4 text-center lg:text-left">
                    <motion.p variants={fadeUp} className="text-neutral-400 text-lg leading-relaxed">
                        I architect and engineer uncompromised, high-performance web applications — blending deep MERN stack expertise with obsessive UI/UX polish to create digital experiences that set industry standards.
                    </motion.p>

                    {/* Stats row */}
                    <motion.div variants={fadeUp} className="flex gap-8 border-t border-white/10 pt-8 justify-center lg:justify-start w-full">
                        {[["3+", "Years Exp."], ["15+", "Projects"], ["100%", "Client Sat."]].map(([num, label]) => (
                            <div key={label} className="flex flex-col gap-1">
                                <span className="text-3xl font-black text-white tracking-tight">{num}</span>
                                <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">{label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Magnetic CTA */}
                    <motion.div variants={fadeUp}>
                        <motion.a
                            href="#projects"
                            ref={buttonRef}
                            onMouseMove={handleButtonMouse}
                            onMouseLeave={() => { buttonX.set(0); buttonY.set(0); }}
                            style={{ x: buttonX, y: buttonY }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
                            whileTap={{ scale: 0.96 }}
                            className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white font-semibold text-lg hover:bg-white/10 hover:border-primary/60 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] transition-all duration-300"
                        >
                            <span>Explore My Work</span>
                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary group-hover:bg-white group-hover:text-black transition-all duration-300 text-sm font-black">
                                ↗
                            </span>
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Bottom scroll indicator ───────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute md:bottom-8 bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600 z-10"
            >
                <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-px h-8 bg-linear-to-b from-neutral-600 to-transparent"
                />
            </motion.div>
        </section>
    );
}
