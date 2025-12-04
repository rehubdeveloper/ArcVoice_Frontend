"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function UnderDevelopment() {
    return (
        <main className="min-h-screen bg-white relative overflow-hidden">
            {/* Grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + i * 0.5}s ease-in-out infinite`,
                            animationDelay: `${i * 0.3}s`,
                        }}
                    />
                ))}
            </div>
            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-20">
                <div className="text-center max-w-2xl mx-auto">
                    {/* Animated Icon */}
                    <div className="mb-8 sm:mb-12 flex justify-center">
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                            <svg
                                className="w-full h-full animate-bounce"
                                viewBox="0 0 200 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Rabbit body */}
                                <ellipse cx="100" cy="120" rx="35" ry="45" fill="#3b82f6" />

                                {/* Rabbit head */}
                                <circle cx="100" cy="70" r="28" fill="#3b82f6" />

                                {/* Left ear */}
                                <ellipse
                                    cx="80"
                                    cy="35"
                                    rx="10"
                                    ry="25"
                                    fill="#3b82f6"
                                    className="animate-pulse"
                                    style={{ transformOrigin: "80px 35px" }}
                                />

                                {/* Right ear */}
                                <ellipse
                                    cx="120"
                                    cy="35"
                                    rx="10"
                                    ry="25"
                                    fill="#3b82f6"
                                    className="animate-pulse"
                                    style={{ transformOrigin: "120px 35px", animationDelay: "0.1s" }}
                                />

                                {/* Eyes */}
                                <circle cx="90" cy="65" r="4" fill="white" />
                                <circle cx="110" cy="65" r="4" fill="white" />

                                {/* Eye pupils - moving */}
                                <circle cx="91" cy="66" r="2" fill="#000" className="animate-pulse" />
                                <circle cx="111" cy="66" r="2" fill="#000" className="animate-pulse" />

                                {/* Nose */}
                                <circle cx="100" cy="77" r="3" fill="#fbbf24" />

                                {/* Mouth */}
                                <path d="M100 77 Q95 82 90 80" stroke="#3b82f6" strokeWidth="2" fill="none" />
                                <path d="M100 77 Q105 82 110 80" stroke="#3b82f6" strokeWidth="2" fill="none" />

                                {/* Front paws */}
                                <ellipse
                                    cx="85"
                                    cy="155"
                                    rx="8"
                                    ry="15"
                                    fill="#3b82f6"
                                    className="animate-pulse"
                                    style={{ animationDelay: "0s" }}
                                />
                                <ellipse
                                    cx="115"
                                    cy="155"
                                    rx="8"
                                    ry="15"
                                    fill="#3b82f6"
                                    className="animate-pulse"
                                    style={{ animationDelay: "0.1s" }}
                                />

                                {/* Back feet */}
                                <ellipse cx="75" cy="160" rx="12" ry="10" fill="#3b82f6" />
                                <ellipse cx="125" cy="160" rx="12" ry="10" fill="#3b82f6" />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-balance">
                        Coming Soon
                    </h1>

                    {/* Subheading */}
                    <p className="text-base sm:text-lg text-gray-600 mb-2 text-pretty">
                        This page is currently under development
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mb-8 sm:mb-12 text-pretty">
                        We're working hard to bring you something amazing. Check back soon!
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm sm:text-base group"
                        >
                            Back to Home
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                        </Link>
                        <button className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition font-medium text-sm sm:text-base">
                            Notify Me
                        </button>
                    </div>

                </div>
            </div>

        </main>
    )
}
