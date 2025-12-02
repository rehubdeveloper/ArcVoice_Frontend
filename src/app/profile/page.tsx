"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [signedIn, setSignedIn] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [signupSuccess, setSignupSuccess] = useState(false)

  useEffect(() => {
    const access = typeof window !== "undefined" ? localStorage.getItem("access") : null
    const ss = typeof window !== "undefined" ? localStorage.getItem("signup_success") : null
    if (ss) {
      setSignupSuccess(true)
      try { localStorage.removeItem("signup_success") } catch (e) {}
    }
    setAccessToken(access)
    setSignedIn(!!access)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-card rounded-lg p-8 shadow">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        {signedIn ? (
          <>
            <p className="mb-4">You are signed in — authentication tokens are stored locally.</p>
            <details className="bg-muted p-4 rounded">
              <summary className="cursor-pointer font-semibold">View access token (keep private)</summary>
              <pre className="whitespace-pre-wrap break-words mt-2 text-sm">{accessToken}</pre>
            </details>
          </>
        ) : (
          <>
            {signupSuccess && (
              <div className="bg-emerald-100 text-emerald-900 p-3 rounded mb-4">
                Signup successful — you can now sign in.
              </div>
            )}
          <>
            <p className="mb-4">No active session detected.</p>
            <p className="mb-4">If you just signed up, please sign in. If you signed in and still see this, check the login flow.</p>
            <div className="flex gap-2">
              <button className="btn" onClick={() => router.push('/login')}>Sign in</button>
              <button className="btn-outline" onClick={() => router.push('/signup')}>Sign up</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
