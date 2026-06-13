"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useTheme } from "next-themes"

function Particles({ count = 500 }) {
  const mesh = useRef<THREE.Points>(null)
  const { theme } = useTheme()
  const { size } = useThree()
  
  const [isDark, setIsDark] = useState(true)
  
  useEffect(() => {
    setIsDark(theme === "dark")
  }, [theme])
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 15
      positions[i3 + 1] = (Math.random() - 0.5) * 15
      positions[i3 + 2] = (Math.random() - 0.5) * 10
      scales[i] = Math.random()
    }
    
    return { positions, scales }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.getElapsedTime()
    
    mesh.current.rotation.y = time * 0.02
    mesh.current.rotation.x = time * 0.01
    
    const positions = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.001
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  const particleColor = isDark ? "#4fd1c5" : "#0d9488"
  const aspect = size.width / size.height

  return (
    <points ref={mesh} scale={[aspect > 1 ? aspect * 0.8 : 1, 1, 1]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={particleColor}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function ParticleBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10 bg-background" />
    )
  }

  return (
    <div className="fixed inset-0 -z-10 bg-background">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles count={300} />
      </Canvas>
    </div>
  )
}
