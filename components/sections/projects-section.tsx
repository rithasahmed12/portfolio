"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Github, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

type Project = {
  id: number
  title: string
  tagline: string
  description: string
  highlights: string[]
  tech: string[]
  github?: string
  live?: string
  images: string[]
  color: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "PulseTrack",
    tagline: "Social Media Analytics Platform",
    description:
      "A full-stack analytics platform that gives trend researchers one workspace to read momentum across Instagram and TikTok. Tracks profiles, indexes posts, surfaces velocity-ranked trending content, and streams live engagement signals — so teams catch trends weeks before any industry report.",
    highlights: [
      "Real-time activity feed and live engagement signals",
      "Velocity-ranked trending posts across all tracked profiles",
      "Per-profile analytics: followers, engagement rate, post tracking",
      "Dashboard with 7/24/30-day windows and top-performer ranking",
    ],
    tech: ["NestJS", "TypeScript", "Supabase", "PostgreSQL", "React"],
    github: "https://github.com/rithasahmed12/pulseTrack",
    images: [
      "/projects/pulsetrack-dashboard.png",
      "/projects/pulsetrack-tracked.png",
      "/projects/pulsetrack-trending.png",
      "/projects/pulsetrack-login.png",
    ],
    color: "#8b5cf6",
  },
  {
    id: 2,
    title: "Aptus HRMS",
    tagline: "Multi-Tenant HR Management System",
    description:
      "A comprehensive multi-tenant HR platform covering the full onboarding-to-offboarding lifecycle. Each organization gets its own isolated workspace with role-based access control, attendance tracking, payroll, leave management, reporting, and subscription billing.",
    highlights: [
      "Multi-tenant architecture with strict per-tenant data isolation",
      "Role-based access control (RBAC) across the org hierarchy",
      "Attendance, leave & payroll management with reporting",
      "Subscription management with Stripe integration",
    ],
    tech: ["React", "NestJS", "MongoDB", "Redux Toolkit", "Stripe"],
    github: "https://github.com/rithasahmed12/AptusHRMS_Frontend",
    images: [
      "/projects/aptushrms-landing.png",
      "/projects/aptushrms-features.png",
      "/projects/aptushrms-signup.png",
    ],
    color: "#7c3a3a",
  },
  {
    id: 3,
    title: "Lecockpit",
    tagline: "Travel Agency CRM Platform",
    description:
      "A CRM solution built for travel agencies to manage enquiries, bookings, and customer workflows. Features a Kanban-style project workspace, contact pipelines with status tracking, and package management — making client tracking 75% simpler and faster through a clean, intuitive UI.",
    highlights: [
      "Kanban workspace for tour-package task management",
      "Contact pipeline with Data Y / Data N / Quoted statuses",
      "Package, booking & revenue analytics dashboard",
      "Streamlined workflows — 75% faster client tracking",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    live: "https://lecockpit.vercel.app",
    images: [
      "/projects/lecockpit-dashboard.png",
      "/projects/lecockpit-contacts.png",
      "/projects/lecockpit-workspace.png",
      "/projects/lecockpit-login.png",
    ],
    color: "#3b82f6",
  },
  {
    id: 4,
    title: "Shoetopia",
    tagline: "Full-Stack E-Commerce Website",
    description:
      "An end-to-end footwear e-commerce store built on the MERN stack. Includes product catalog with categories and search, wishlist, cart, coupons, address management, and a cash-on-delivery checkout flow — along with user authentication and an admin side.",
    highlights: [
      "Product catalog with categories, search & price filters",
      "Cart, wishlist, coupons & address management",
      "Order checkout with multiple payment options",
      "User authentication and admin management",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/rithasahmed12/Shoetopia",
    live: "https://www.linkedin.com/feed/update/urn:li:activity:7166055306483990529/",
    images: [
      "/projects/shoetopia-home.png",
      "/projects/shoetopia-shop.png",
      "/projects/shoetopia-product.png",
      "/projects/shoetopia-cart.png",
      "/projects/shoetopia-register.png",
    ],
    color: "#d4c25a",
  },
]

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border card-glow cursor-pointer"
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-secondary">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `linear-gradient(135deg, ${project.color}40 0%, transparent 70%)`,
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="text-sm font-medium text-primary">View Details →</span>
        </motion.div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <span className="text-xs text-muted-foreground">{project.tagline}</span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [active, setActive] = useState(0)
  const total = project.images.length

  const next = () => setActive((i) => (i + 1) % total)
  const prev = () => setActive((i) => (i - 1 + total) % total)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-8 bg-card border border-border rounded-3xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/70 hover:bg-background transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image carousel */}
        <div className="relative aspect-[16/9] bg-secondary overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={project.images[active]}
                alt={`${project.title} screenshot ${active + 1}`}
                fill
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 60%, ${project.color}30 100%)`,
            }}
          />

          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 hover:bg-background transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 hover:bg-background transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "w-6 bg-primary" : "w-1.5 bg-foreground/40"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {total > 1 && (
          <div className="flex gap-2 p-4 pb-0 overflow-x-auto">
            {project.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActive(i)}
                className={`relative h-14 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === active ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover object-top" />
              </button>
            ))}
          </div>
        )}

        <div className="p-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <span className="text-sm text-primary">{project.tagline}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Highlights
            </h3>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:bg-secondary transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                {project.id === 4 ? "Watch Walkthrough" : "Live Demo"}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A collection of full-stack products I&apos;ve designed and built — from analytics platforms to e-commerce stores
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
