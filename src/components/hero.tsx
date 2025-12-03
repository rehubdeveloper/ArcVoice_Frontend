"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Zap, Mic2 } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    setCanvasSize()

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }

    let time = 0

    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 1)"
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw grid background
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"
      ctx.lineWidth = 1
      const gridSize = 40
      for (let i = 0; i <= canvas.offsetWidth; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.offsetHeight)
        ctx.stroke()
      }
      for (let i = 0; i <= canvas.offsetHeight; i += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.offsetWidth, i)
        ctx.stroke()
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1

        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw floating circles
      const circleY1 = Math.sin(time * 0.003) * 20 + 80
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(canvas.offsetWidth * 0.8, circleY1, 120, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(canvas.offsetWidth * 0.8, circleY1, 160, 0, Math.PI * 2)
      ctx.stroke()

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
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden px-4 sm:px-6">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
              Human-Like Conversations at Scale
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed text-balance">
              Arc Voice enables emotionally intelligent conversations for counseling, guidance, and automated workflows
              powered by advanced LLMs and voice technology.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
            <Link href="/signup" className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2 justify-center">
              Start Free Trial
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </Link>
            <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg hover:border-blue-600 hover:text-blue-600 transition font-semibold flex items-center gap-2 justify-center">
              <Mic2 className="w-4 sm:w-5 h-4 sm:h-5" />
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center">
          <div className="absolute w-56 sm:w-64 h-56 sm:h-64 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute w-40 sm:w-48 h-40 sm:h-48 bg-blue-300 rounded-full filter blur-2xl opacity-10 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="relative z-10 animate-bounce md:translate-y-8">
            <img
              src="/robot.png"
              alt="AI Robot"
              className="w-40 h-40 sm:w-50 sm:h-50 md:w-80 md:h-80 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
