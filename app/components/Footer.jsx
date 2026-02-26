"use client";

import { motion } from "framer-motion";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="w-full bg-neutral-950 pt-32 pb-12 border-t border-white/10 relative overflow-hidden flex flex-col items-center justify-center">

            {/* Massive Typography Background */}
            <div className="w-full flex justify-center mb-24 px-4 overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="text-[15vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-neutral-900 to-neutral-700 select-none text-center"
                >
                    GET IN TOUCH
                </motion.h2>
            </div>

            <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 z-10">
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Faiq Wajahat.</h3>
                    <p className="text-neutral-400 font-medium">Software Engineer & MERN Architect</p>
                </div>

                <div className="flex gap-8">
                    {[
                        { label: "LinkedIn", href: "https://www.linkedin.com/in/faiq-wajahat/", external: true },
                        { label: "GitHub", href: "https://github.com/FaiqWajahat", external: true },
                        { label: "WhatsApp", href: "https://wa.me/923146997979", external: true },
                        { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=faiqwajahat20022@gmail.com", external: true },
                    ].map(({ label, href, external }) => (
                        <motion.a
                            key={label}
                            href={href}
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            whileHover={{ y: -5, color: "var(--primary-color)" }}
                            className="text-neutral-400 font-semibold uppercase tracking-widest text-sm hover:text-primary transition-colors duration-300"
                        >
                            {label}
                        </motion.a>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center z-10">
                <p className="text-neutral-500 text-sm font-medium">
                    &copy; {currentYear} Faiq Wajahat. All rights reserved.
                </p>
                <p className="text-neutral-500 text-sm font-medium mt-4 md:mt-0">
                    Built with Next.js, Framer Motion & Tailwind V4.
                </p>
            </div>

            {/* Decorative bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm" />
        </footer>
    );
}
