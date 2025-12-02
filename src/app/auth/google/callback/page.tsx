"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function GoogleCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState("Connecting your Google Account...")

  useEffect(() => {
    const run = async () => {
      try {
        const url = new URL(window.location.href)

        const error = url.searchParams.get("error")
        const errorDesc = url.searchParams.get("error_description")
        const code = url.searchParams.get("code")

        if (error) {
          console.error("Google OAuth error:", error, errorDesc)
          setStatus("Google authentication failed. Please try again.")
          return
        }

        if (!code) {
          console.error("No code parameter found in redirect URL")
          setStatus("Invalid callback. Missing authorization code.")
          return
        }

        setStatus("Authorizing Google account...")

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/google/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: code
            })
          }
        )

        if (!response.ok) {
          const errData = await response.json().catch(() => null)
          console.error("Backend Google auth failed:", errData)
          setStatus("Authentication failed on server. Try again.")
          return
        }

        setStatus("Login successful. Redirecting...")

        router.push("/")
      } catch (err) {
        console.error("Fatal callback handler error:", err)
        setStatus("An unexpected error occurred. Try again shortly.")
      }
    }

    run()
  }, [])

  return <p className="text-center p-4">{status}</p>
}
