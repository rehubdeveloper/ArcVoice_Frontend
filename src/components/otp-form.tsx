"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function OTPForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [email, setEmail] = useState("")
  const [resendCountdown, setResendCountdown] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    if (otp.length !== 6) {
      setErrorMessage("Please enter a 6-digit code")
      setLoading(false)
      return
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/auth/verify-otp/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      )

      const data = await res.json()

      if (res.ok && data.status === "success") {
        setSuccessMessage(data.message || "Email verified successfully! Redirecting to login...")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        setErrorMessage(data.message || "Invalid OTP code")
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/auth/resend-otp/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      )

      const data = await res.json()

      if (res.ok && data.status === "success") {
        setSuccessMessage(data.message || "OTP code sent again!")
        setResendCountdown(30) // 30 second countdown
      } else {
        setErrorMessage(data.message || "Failed to resend OTP")
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to {email || "your email"}.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify}>
          <FieldGroup>
            {successMessage && (
              <div className="text-green-600 text-center font-medium mb-4">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="text-red-600 text-center font-medium mb-4">
                {errorMessage}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="otp">Verification code</FieldLabel>
              <InputOTP
                maxLength={6}
                id="otp"
                value={otp}
                onChange={setOtp}
                required
              >
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Button type="submit" disabled={loading || otp.length !== 6 || isResending} className="w-full mt-2">
                {(loading && !isResending) && "Verifying..."}
                {!loading && "Verify Code"}
              </Button>
              <FieldDescription className="text-center">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading || isResending || resendCountdown > 0}
                  className="text-blue-600 hover:underline disabled:opacity-50"
                >
                  {isResending ? "Sending..." : resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend"}
                </button>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
