"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export default function Footer() {
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
    <footer className="relative bg-white overflow-hidden">
      {/* Grid background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="col-span-1 xs:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">Arc Voice</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Emotionally intelligent AI for human-like conversations at scale.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/under-development" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm text-gray-600 hover:text-blue-600 transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8 sm:pt-12">
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4 xs:gap-6">
            <p className="text-sm text-gray-600">&copy; 2025 Arc Voice. All rights reserved.</p>

            {/* Contact info */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4 xs:gap-6">
              <a
                href="mailto:hello@arcvoice.com"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                tech@rehubdevelopers.com
              </a>
              <a
                href="tel:+1-800-ARC-VOICE"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +234 810 722 4097
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
