"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com",
            icon: <Github size={28} />,
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com",
            icon: <Linkedin size={28} />,
        },
        {
            name: "Email",
            href: "mailto:hello@example.com",
            icon: <Mail size={28} />,
        },
    ];

    return (
        <section
            id="contact"
            className="min-h-[80vh] py-32 container mx-auto px-6 max-w-7xl flex flex-col justify-center items-center text-center border-t border-white/10 relative overflow-hidden"
        >
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="max-w-3xl w-full"
            >
                <h2 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter">
                    Let's Build Something<br />
                    <span className="text-primary italic">Together.</span>
                </h2>

                <p className="text-2xl text-neutral-400 mb-16 leading-relaxed">
                    I'm currently looking for new opportunities and open to discussing
                    interesting projects. My inbox is always open.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                    <motion.a
                        href="mailto:faiq@example.com"
                        whileHover={{
                            scale: 1.05,
                            textShadow: "0px 0px 8px rgb(255 255 255 / 0.5)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-5 text-xl font-bold rounded-full bg-foreground text-background hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 w-full sm:w-auto"
                    >
                        Say Hello
                    </motion.a>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-10 border-t border-white/10 pt-16">
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.1 }}
                            className="text-neutral-400 transition-colors hover:text-primary flex flex-col items-center gap-4 group"
                        >
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                {link.icon}
                            </div>
                            <span className="text-md font-semibold tracking-tight">{link.name}</span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
