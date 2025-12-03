import { Suspense } from "react"
import { OTPForm } from "@/components/otp-form"

function OTPFormWrapper() {
  return <OTPForm />
}

export default function OTPPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            📧 Check Your Email!
          </div>
          <p className="text-gray-600">
            We've sent a 6-digit verification code to your email address.
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <OTPFormWrapper />
        </Suspense>
      </div>
    </div>
  )
}
