import { OTPForm } from "@/components/otp-form"

export default function OTPPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            📧 Check Your Email!
          </div>
        </div>
        <OTPForm />
      </div>
    </div>
  )
}
