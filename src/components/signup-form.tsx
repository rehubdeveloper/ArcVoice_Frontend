"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import GoogleLoginButton from "./google-login-button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [resendCountdown, setResendCountdown] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setFieldErrors({});

    const username = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("SIGNUP DATA → ", { username, email, password });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/register/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );
    if (!res.ok) {
      // Handle non-200 responses
      const data = await res.json();
      setFieldErrors({ general: data.email || data.username || "Signup failed" });
      setLoading(false);
      return;
    }
    const data = await res.json();
    console.log("SIGNUP RESPONSE → ");


    // Send OTP immediately after successful registration
    const otpRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/auth/resend-otp/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const otpData = await otpRes.json();

    if (!otpRes.ok || otpData.status !== "success") {
      setFieldErrors({ general: otpData.message || "Failed to send OTP" });
      setLoading(false);
      return;
    }

    setSuccessMessage("OTP code has been sent to your mail! Redirecting...");
    setResendCountdown(30); // Start countdown for resend restriction
    setTimeout(() => {
      router.push(`/otp?email=${encodeURIComponent(email)}`);
      setLoading(false);
    }, 2000);
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSignup}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>

        {successMessage && (
          <div className="text-green-600 text-center font-medium">
            {successMessage}
          </div>
        )}

        {fieldErrors.general && (
          <div className="text-red-600 text-center font-medium">
            {fieldErrors.general}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="name">Username</FieldLabel>
          <Input id="name" required />
          {fieldErrors.name && (
            <div className="text-red-600 text-sm mt-1">
              {fieldErrors.name}
            </div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" required />
          {fieldErrors.email && (
            <div className="text-red-600 text-sm mt-1">
              {fieldErrors.email}
            </div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <PasswordInput id="password" required />
          {fieldErrors.password && (
            <div className="text-red-600 text-sm mt-1">
              {fieldErrors.password}
            </div>
          )}
        </Field>

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <GoogleLoginButton mode="signup" />

        <FieldDescription className="text-center">
          Already have an account? <a href="/login">Sign in</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
