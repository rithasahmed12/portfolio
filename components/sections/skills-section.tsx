"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const skills = [
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React.js", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Angular", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "MongoDB", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "Supabase", category: "database" },
  { name: "Redux Toolkit", category: "frontend" },
  { name: "RxJS", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Material UI", category: "frontend" },
  { name: "REST APIs", category: "backend" },
  { name: "JWT Auth", category: "backend" },
  { name: "Swagger/OpenAPI", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "SQL", category: "database" },
  { name: "AWS (S3, EC2)", category: "devops" },
  { name: "Docker", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "CI/CD", category: "devops" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Technologies I Work With</h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex flex-wrap justify-center gap-4"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="skill-glow px-6 py-3 rounded-full bg-secondary/50 border border-border cursor-default"
            >
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Frontend", icon: "🎨", desc: "React, Next.js, Angular" },
            { label: "Backend", icon: "⚙️", desc: "Node.js, NestJS, Express" },
            { label: "Database", icon: "🗄️", desc: "MongoDB, PostgreSQL" },
            { label: "DevOps", icon: "🚀", desc: "AWS, Docker, CI/CD" },
          ].map((category, index) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border card-glow text-center"
            >
              <span className="text-3xl mb-3 block">{category.icon}</span>
              <h3 className="font-semibold mb-1">{category.label}</h3>
              <p className="text-sm text-muted-foreground">{category.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
