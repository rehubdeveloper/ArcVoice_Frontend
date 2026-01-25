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
import { Checkbox } from "@/components/ui/checkbox";
import GoogleLoginButton from "./google-login-button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [resendCountdown, setResendCountdown] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
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

  if (!acceptTerms) {
    setFieldErrors({ terms: "You must accept the Terms & Conditions to continue" });
    setLoading(false);
    return;
  }

  const username = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    setFieldErrors({ general: String(data.email || data.username || "Signup failed") });
    setLoading(false);
    return;
  }

  const data = await res.json();
  setSuccessMessage("Registration successful! Redirecting to OTP verification...");
  
  // Redirect to OTP page immediately
  setTimeout(() => {
    router.push(`/otp?email=${encodeURIComponent(email)}`);
    setLoading(false);
  }, 1000);
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
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              required
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Terms & Conditions
                </a>
              </label>
              {fieldErrors.terms && (
                <div className="text-red-600 text-sm">
                  {fieldErrors.terms}
                </div>
              )}
            </div>
          </div>
        </Field>

        <Field>
          <Button type="submit" disabled={loading || !acceptTerms}>
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
