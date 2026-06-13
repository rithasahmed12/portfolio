"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false)
  
  const cursorX = useSpring(0, { stiffness: 100, damping: 30 })
  const cursorY = useSpring(0, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="cursor-glow hidden md:block"
      style={{
        left: cursorX,
        top: cursorY,
        opacity: isVisible ? 0.6 : 0,
      }}
    />
  )
}
