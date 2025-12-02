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
import GoogleLoginButton from "./google-login-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const full_name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/accounts/register/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, password }),
      }
    );

    const data = await res.json();
    setLoading(false);

    // If the API returns tokens, store them and redirect. Otherwise mark signup success
    if (data?.status === "success" && data?.data?.access) {
      try {
        localStorage.setItem("access", data.data.access);
        localStorage.setItem("refresh", data.data.refresh);
      } catch (e) {
        console.error("Failed to store tokens locally", e);
      }

      router.push("/profile");
      return;
    }

    // Set a temporary flag so /profile can report signup success
    try {
      localStorage.setItem("signup_success", "true");
    } catch (e) {}

    console.log("SIGNUP RESPONSE → ", data);
    router.push("/profile");
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSignup}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" required />
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
