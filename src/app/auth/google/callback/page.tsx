"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GoogleCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get("code")

    if (!code) {
      console.error("Missing code")
      return
    }

    // Send to backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/oauth2/callback/?code=${code}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        // Redirect to profile page to show sign-in success
        router.push("/");
      })
  }, [])

  return <p className="text-center p-4">Connecting your Google Account...</p>
}
