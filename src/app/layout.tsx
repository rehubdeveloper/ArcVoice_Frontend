import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arc Voice - Emotionally Intelligent AI Assistant",
  description:
    "Human-like voice conversations for counseling, guidance, and automated workflows powered by advanced LLMs and voice technology.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Arc Voice - Emotionally Intelligent AI Assistant",
    description:
      "Human-like voice conversations for counseling, guidance, and automated workflows powered by advanced LLMs and voice technology.",
    url: "https://arcvoice.rehubdevelopers.com/",
    siteName: "Arc Voice",
    images: [
      {
        url: "/arcvoice.png",
        width: 1200,
        height: 630,
        alt: "Arc Voice Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
