"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const experiences = [
  {
    period: "Dec 2024 - Dec 2025",
    title: "Software Engineer",
    company: "Neutrinos",
    description:
      "Built and enhanced insurance platforms for global clients including Al Rajhi Takaful, Sunlife Philippines, Sunlife Hong Kong, PDL Indo, and Manulife Philippines. Automated end-to-end insurance workflows with JBPM, accelerating claims processing 10x. Streamlined internal communication and ticketing via Power Automate (Microsoft Teams + Jira), boosting team productivity by 70%. Developed enterprise modules, shipped new features, and resolved production issues.",
    technologies: ["Node.js", "NestJS", "JBPM", "Power Automate", "REST APIs"],
  },
  {
    period: "Sep 2023 - Nov 2024",
    title: "Full Stack Developer",
    company: "Brototype",
    description:
      "Built full-stack web applications using the MERN stack. Developed E-commerce and HRMS platforms with responsive user interfaces and robust backend integrations, covering authentication, payments, and admin workflows.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    period: "2019 - 2022",
    title: "Bachelor of Commerce (Finance)",
    company: "University of Calicut",
    description:
      "Graduated with a focus on finance & accounting, then transitioned into tech by self-learning software development — moving from a commerce background into full-stack engineering.",
    technologies: ["Finance", "Accounting", "Self-taught Dev"],
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Career Journey</h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px timeline-line transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10"
              >
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
              </motion.div>

              {/* Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 pl-8 md:pl-0" : "md:pl-12 pl-8"}`}>
                <div className="p-6 rounded-2xl bg-card border border-border card-glow">
                  <span className="text-sm text-primary font-mono">{exp.period}</span>
                  <h3 className="text-xl font-semibold mt-2">{exp.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{exp.company}</p>
                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-card border border-border card-glow text-center"
        >
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            2+ years building scalable web applications across the{" "}
            <span className="text-foreground font-medium">insurance domain</span> and internal
            enterprise platforms for global clients like{" "}
            <span className="text-foreground font-medium">Sun Life</span> and{" "}
            <span className="text-foreground font-medium">Manulife</span>. Focused on backend
            development, feature implementation, and production support — automating workflows
            to deliver measurable efficiency gains.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
