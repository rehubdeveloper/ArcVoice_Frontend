"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    setCanvasSize()

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = []

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      })
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      time++
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener("resize", setCanvasSize)

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-white">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 text-balance">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 text-balance">
            Join hundreds of organizations using Arc Voice for emotionally intelligent automation and seamless
            productivity
          </p>
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 text-sm sm:text-base rounded-lg hover:bg-blue-50 transition font-semibold flex items-center gap-2 justify-center hover:gap-3">
              Start Free Trial
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white text-sm sm:text-base rounded-lg hover:bg-white/10 transition font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
