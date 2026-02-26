"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { name: "About", href: "#about", id: "about" },
    {name: "Expertise", href:"#expertise", id:"expertise"},
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState("");

    /* ── Glassmorphism on scroll ─────────────────────────── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ── Active section detection ────────────────────────── */
    const detectActive = useCallback(() => {
        const winH = window.innerHeight;

        // ① Check footer (contact) first — activates as soon as ANY part is visible
        const footer = document.getElementById("contact");
        if (footer && footer.getBoundingClientRect().top < winH) {
            setActiveId("contact");
            return;
        }

        // ② For other sections, find whose top just crossed 45% of viewport height
        let best = "";
        let bestTop = -Infinity;
        const line = winH * 0.45;

        NAV_LINKS.forEach(({ id }) => {
            if (id === "contact") return;
            const el = document.getElementById(id);
            if (!el) return;
            const top = el.getBoundingClientRect().top;
            if (top <= line && top > bestTop) {
                bestTop = top;
                best = id;
            }
        });

        if (best) setActiveId(best);
    }, []);

    useEffect(() => {
        detectActive(); // run on mount
        window.addEventListener("scroll", detectActive, { passive: true });
        // Also re-detect after anchor scroll animations finish
        window.addEventListener("hashchange", detectActive);
        return () => {
            window.removeEventListener("scroll", detectActive);
            window.removeEventListener("hashchange", detectActive);
        };
    }, [detectActive]);

    /* ── Handle nav link click ───────────────────────────── */
    const handleLinkClick = (id) => {
        setActiveId(id); // immediately highlight on click
        setMenuOpen(false);
        // Re-detect after scroll animation completes (~600ms)
        setTimeout(detectActive, 650);
    };

    const fadeDown = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 28 } },
        exit: { opacity: 0, y: -16, transition: { duration: 0.15 } },
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.1 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/60 backdrop-blur-xl py-4" : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

                    {/* Logo */}
                    <a
                        href="#about"
                        onClick={() => { setActiveId(""); }}
                        className="group flex items-center gap-2.5 font-black text-xl tracking-tight text-white"
                    >
                        <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-black transition-transform duration-300 group-hover:rotate-12">
                            FW
                        </span>
                        <span className="hidden sm:block">Portfolio</span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map(({ name, href, id }) => {
                            const isActive = activeId === id;
                            return (
                                <a
                                    key={id}
                                    href={href}
                                    onClick={() => handleLinkClick(id)}
                                    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${isActive ? "text-white" : "text-neutral-500 hover:text-neutral-200"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                                            transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                        />
                                    )}
                                    <span className="relative z-10">{name}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA + Hamburger */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://wa.me/923146997979"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white text-sm font-bold hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-200"
                        >
                            Let's Talk
                            <span className="text-[10px] font-black">↗</span>
                        </a>

                        <button
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={16} /> : <Menu size={16} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        variants={fadeDown}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-[60px] left-4 right-4 z-40 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/10 p-5 flex flex-col gap-1 shadow-2xl md:hidden"
                    >
                        {NAV_LINKS.map(({ name, href, id }) => {
                            const isActive = activeId === id;
                            return (
                                <a
                                    key={id}
                                    href={href}
                                    onClick={() => handleLinkClick(id)}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${isActive
                                        ? "bg-primary/15 text-primary border border-primary/20"
                                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {name}
                                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                </a>
                            );
                        })}
                        <div className="border-t border-white/8 mt-2 pt-4">
                            <a
                                href="https://wa.me/923146997979"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMenuOpen(false)}
                                className="w-full flex justify-center py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-400 transition-colors"
                            >
                                Let's Talk 
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
