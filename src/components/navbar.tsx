"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Normal Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      >
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between max-w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex-shrink-0"></div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">Arc Voice</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="/" className="text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              Home
            </Link>
            <Link href="/under-development" className="text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              Features
            </Link>
            <Link href="/under-development" className="text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              Docs
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Link href="/login" className="px-4 xl:px-6 py-2 text-sm text-gray-700 hover:text-blue-600 transition font-medium whitespace-nowrap">
              Sign In
            </Link>
            <Link href="/signup" className="px-4 xl:px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-900 flex-shrink-0"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-col gap-3">
            <Link href="/" className="text-sm text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/under-development" className="text-sm text-gray-700 hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="/under-development" className="text-sm text-gray-700 hover:text-blue-600 transition">
              Docs
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login" className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition font-medium w-full text-left">
                Sign In
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium w-full">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <nav
        className={`fixed top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-2xl sm:rounded-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-between sm:gap-6 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 sm:w-6 h-5 sm:h-6 bg-blue-600 rounded-md flex-shrink-0"></div>
            <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">Arc Voice</span>
          </div>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6">
            <Link
              href="/"
              className="text-xs lg:text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              href="/under-development"
              className="text-xs lg:text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap"
            >
              Features
            </Link>
            <Link
              href="/under-development"
              className="text-xs lg:text-sm text-gray-700 hover:text-blue-600 transition whitespace-nowrap"
            >
              Docs
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <Link href="/login" className="px-3 lg:px-4 py-1 lg:py-1.5 text-xs lg:text-sm text-gray-700 hover:text-blue-600 transition font-medium whitespace-nowrap">
              Sign In
            </Link>
            <Link href="/signup" className="px-3 lg:px-4 py-1 lg:py-1.5 bg-blue-600 text-white text-xs lg:text-sm rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button for scrolled navbar */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden text-gray-900 flex-shrink-0"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu for scrolled navbar */}
        {isMobileMenuOpen && isScrolled && (
          <div className="sm:hidden bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl mt-2 mx-4 px-4 py-4 flex flex-col gap-3 shadow-lg">
            <Link href="/" className="text-sm text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/under-development" className="text-sm text-gray-700 hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="/under-development" className="text-sm text-gray-700 hover:text-blue-600 transition">
              Docs
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
              <Link href="/login" className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition font-medium w-full text-left">
                Sign In
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium w-full">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
