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
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

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
      setFieldErrors({ general: data.email || "" });
      setLoading(false);
      return;
    }
    const data = await res.json();
    console.log("SIGNUP RESPONSE → ", data);


    setSuccessMessage("Account created successfully! Redirecting to login...");
    setTimeout(() => {
      router.push("/login");
      setLoading(false);
    }, 2000);


    // Check for field-specific errors
    const errors: { [key: string]: string } = {};
    if (data.username && (Array.isArray(data.username) || typeof data.username === 'string')) {
      errors.name = Array.isArray(data.username) ? data.username[0] : data.username;
    }
    if (data.email && (Array.isArray(data.email) || typeof data.email === 'string')) {
      errors.email = Array.isArray(data.email) ? data.email[0] : data.email;
    }
    if (data.password && (Array.isArray(data.password) || typeof data.password === 'string')) {
      errors.password = Array.isArray(data.password) ? data.password[0] : data.password;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Fallback for unexpected response
    setFieldErrors({ general: "An unexpected error occurred. Please try again." });
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
