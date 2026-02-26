"use client";

import { motion } from "framer-motion";

export default function Services() {
    const services = [
        {
            id: "01",
            title: "Full-Stack Development",
            description: "End-to-end development of scalable web applications. Building highly responsive frontends coupled with robust, secure backend architectures using the dynamic MERN stack.",
        },
        {
            id: "02",
            title: "System Architecture",
            description: "Designing high-performance, fault-tolerant systems. Specializing in microservices, REST APIs, and database modeling for platforms that demand heavy data processing.",
        },
        {
            id: "03",
            title: "UI/UX Engineering",
            description: "Translating static designs into pixel-perfect, interactive digital experiences. Leveraging Framer Motion and modern CSS to craft premium interfaces with deep, tactile physics.",
        },
    ];

    return (
        <section id="services" className="min-h-screen py-32 container mx-auto px-6 max-w-7xl border-t border-white/10 flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-20 text-foreground text-center lg:text-left">
                    Capabilities.
                </h2>

                <div className="flex flex-col ">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.7 }}
                            whileHover="hover"
                            className={` group ${index===2?"border-none": "border-b border-white/10"}  py-10 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 relative overflow-hidden text-center md:text-left  `}
                        >
                            {/* Dynamic hover background */}
                            <motion.div
                                className="absolute inset-0 bg-primary/5 -z-10 origin-bottom"
                                variants={{
                                    initial: { scaleY: 0 },
                                    hover: { scaleY: 1 }
                                }}
                                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                initial="initial"
                            />

                            <div className="md:col-span-2 text-primary font-bold text-2xl md:text-4xl tracking-tighter pt-2 flex justify-center md:justify-start">
                                {service.id}
                            </div>

                            <div className="md:col-span-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300 md:w-1/2 text-center md:text-left">
                                    {service.title}
                                </h3>

                                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed md:w-1/2 font-medium group-hover:text-neutral-300 transition-colors duration-300 text-center md:text-left">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
