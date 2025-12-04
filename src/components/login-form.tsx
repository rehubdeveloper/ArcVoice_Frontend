"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log("SENDING LOGIN DATA → ");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/login/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await res.json();
    setLoading(false);

    // Successful login returns tokens in data.data.access & data.data.refresh
    if (data?.status === "success" && data?.data?.access) {
      console.log("LOGIN SUCCESS ! ");
      try {
        localStorage.setItem("access", data.data.access);
        localStorage.setItem("refresh", data.data.refresh);
      } catch (e) {
        console.error("Failed to store tokens locally", e);
      }

      // Redirect to profile page to confirm login
      router.push("/under-development");
      return;
    }

    // Handle login failure
    setErrorMessage("Invalid username or password. Please try again.");
    console.log("LOGIN RESPONSE → ", data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Arc Voice account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" type="text" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <PasswordInput id="password" required />
              </Field>

              {errorMessage && (
                <div className="text-red-600 text-center font-medium">
                  {errorMessage}
                </div>
              )}

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <GoogleLoginButton mode="login" />

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/signup">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/login.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
