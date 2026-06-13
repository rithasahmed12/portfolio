"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.3em] text-primary mb-4 block"
          >
            About
          </motion.span>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground font-light"
          >
            Full Stack Software Engineer building{" "}
            <span className="text-gradient font-medium">scalable web applications</span>{" "}
            across the insurance domain and enterprise platforms. Focused on{" "}
            <span className="text-gradient font-medium">backend development</span>,{" "}
            <span className="text-gradient font-medium">clean architecture</span>, and{" "}
            <span className="text-gradient font-medium">automated workflows</span> — with the MERN stack, NestJS, and TypeScript.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex justify-center gap-4 sm:gap-8"
          >
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary">2+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Years Experience</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary">5+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Insurance Clients</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary">10x</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Faster Workflows</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
