"use client";

import { motion } from "framer-motion";

export default function Experience() {
    const education = [
    {
        year: "2022 - 2026",
        role: "Bachelor in Computer Science",
        company: "Superior University",
        description:
            "Focusing on core computer science fundamentals including Data Structures, Algorithms, Object-Oriented Programming, and Software Engineering. Developing practical skills through hands-on academic projects involving modern web technologies and database management.",
    },
    {
        year: "2020 - 2021",
        role: "Intermediate in Science",
        company: "Aspire College",
        description:
            "Built a strong academic foundation in Mathematics, Physics, and Computer Science. Developed analytical problem-solving skills and learned foundational programming concepts that paved the way for advanced software engineering studies.",
    },
    {
        year: "2018 - 2020",
        role: "Matriculation in Science",
        company: "Umer High School",
        description:
            "Graduated with a focus on core science subjects. Developed early analytical skills and a strong, growing interest in technology, logic, and computational problem-solving.",
    },
];

    return (
        <section
            id="education"
            className="min-h-screen py-32 container mx-auto px-6 max-w-7xl flex flex-col justify-center border-t border-white/10"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-20 text-foreground text-center lg:text-left">
                    Education.
                </h2>

                <div className="max-w-4xl w-full mx-auto space-y-20">
                    {education.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.5 }}
                            whileHover={{ scale: 1.01 }}
                            className="flex flex-col md:flex-row gap-6 md:gap-14 group p-4 rounded-3xl hover:bg-white/5 transition-colors duration-300 items-center md:items-start text-center md:text-left"
                        >
                            {/* Year Column */}
                            <div className="md:w-1/4 pt-1 flex justify-center md:justify-start">
                                <span className="inline-block px-5 py-2 rounded-full border border-primary/30 text-primary font-semibold text-sm bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                    {exp.year}
                                </span>
                            </div>

                            {/* Content Column */}
                            <div className="md:w-3/4 relative flex flex-col items-center md:items-start">
                                {/* Timeline connector visual (visible on md+) */}
                                <div className="hidden md:block absolute -left-[30px] top-3 w-4 h-4 rounded-full bg-primary/30 group-hover:bg-primary transition-colors duration-300 shadow-[0_0_10px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10" />
                                <div className="hidden md:block absolute -left-[23px] top-5 w-[2px] h-[calc(100%+5rem)] bg-white/10 group-last:hidden" />

                                <h3 className="text-3xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {exp.role}
                                </h3>
                                <h4 className="text-xl text-neutral-300 mb-6 font-medium">
                                    {exp.company}
                                </h4>
                                <p className="text-neutral-400 leading-relaxed text-lg">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
