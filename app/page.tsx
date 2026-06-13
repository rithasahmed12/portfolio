"use client"

import { Navbar } from "@/components/navbar"
import { CursorGlow } from "@/components/cursor-glow"
import { ParticleBackground } from "@/components/particle-background"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <CursorGlow />
      <ParticleBackground />
      <Navbar />
      
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />

      <WhatsAppButton />
    </main>
  )
}
