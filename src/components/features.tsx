"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, Calendar, Mail, Zap, Mic2, Brain } from "lucide-react"

const features = [
  {
    icon: Mic2,
    title: "Voice-First Interaction",
    description:
      "Natural speech conversations with emotional intelligence and context awareness for authentic human-like exchanges.",
  },
  {
    icon: Mail,
    title: "Email Intelligence",
    description: "Voice-summarized inbox, smart reply drafting, and priority filtering for efficient communication.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Natural language calendar management with conflict detection and intelligent day planning.",
  },
  {
    icon: MessageCircle,
    title: "Real-Time Conversation",
    description: "Multi-language support with emotional tone adaptation and contextual memory of past interactions.",
  },
  {
    icon: Zap,
    title: "Automated Workflows",
    description: "Voice-to-task conversion, voice memos, and browser automation for seamless productivity.",
  },
  {
    icon: Brain,
    title: "Advanced Understanding",
    description: "Multi-modal document processing, intelligent search, and contextual extraction capabilities.",
  },
]

export default function Features() {
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

    let time = 0

    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 1)"
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw grid background
      ctx.strokeStyle = "rgba(59, 130, 246, 0.03)"
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
    <section id="features" className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 text-balance">
            Powerful Features for Modern Productivity
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 text-balance px-2">
            Everything you need to revolutionize how you work, powered by emotional intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const rotations = ["rotate-1", "-rotate-2", "rotate-3", "-rotate-1", "rotate-2", "-rotate-3"]
            return (
              <div
                key={index}
                className={`p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-blue-400 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 ${rotations[index % 6]} bg-white/80 backdrop-blur-sm hover:bg-white`}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-100 transition-all">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
