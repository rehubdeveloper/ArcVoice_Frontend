"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"

type StatusType = "loading" | "success" | "error"

export default function GoogleCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState("Connecting your Google Account...")
  const [statusType, setStatusType] = useState<StatusType>("loading")

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
          setStatusType("error")
          return
        }

        if (!code) {
          console.error("No code parameter found in redirect URL")
          setStatus("Invalid callback. Missing authorization code.")
          setStatusType("error")
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
          setStatusType("error")
          return
        }

        setStatus("Login successful. Redirecting...")
        setStatusType("success")

        setTimeout(() => {
          router.push("/under-development")
        }, 2000)
      } catch (err) {
        console.error("Fatal callback handler error:", err)
        setStatus("An unexpected error occurred. Try again shortly.")
        setStatusType("error")
      }
    }

    run()
  }, [])

  const getStatusIcon = () => {
    switch (statusType) {
      case "loading":
        return <Loader2 className="h-8 w-8 animate-spin text-primary" />
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case "error":
        return <XCircle className="h-8 w-8 text-red-500" />
      default:
        return <AlertCircle className="h-8 w-8 text-yellow-500" />
    }
  }

  const getStatusColor = () => {
    switch (statusType) {
      case "success":
        return "text-green-600 dark:text-green-400"
      case "error":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getStatusIcon()}
          </div>
          <CardTitle className="text-2xl font-bold">Google Authentication</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className={`text-lg font-medium ${getStatusColor()}`}>
            {status}
          </p>
          {statusType === "loading" && (
            <p className="text-sm text-muted-foreground">
              Please wait while we connect your account...
            </p>
          )}
          {statusType === "success" && (
            <p className="text-sm text-muted-foreground">
              You will be redirected to your dashboard shortly.
            </p>
          )}
          {statusType === "error" && (
            <p className="text-sm text-muted-foreground">
              Something went wrong. Please try logging in again.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
