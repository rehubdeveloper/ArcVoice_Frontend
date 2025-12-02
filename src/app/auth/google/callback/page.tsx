"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GoogleCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get("code")

    if (!code) {
      console.error("Missing code")
      return
    }

    // Send to backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/accounts/google/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        let body: any = null;
        try {
          body = contentType.includes("application/json") ? await res.json() : await res.text();
        } catch (err) {
          body = null;
        }

        if (!res.ok) {
          console.error("Callback exchange failed", { status: res.status, body });
          return;
        }

        return body;
      })
      .then((data) => {
        if (!data) return;

        if (data.status === "error") {
          console.error(data.message);
          return;
        }

        // Save JWT
        localStorage.setItem("access", data.data?.access);
        localStorage.setItem("refresh", data.data?.refresh);

        // Redirect to profile page to show sign-in success
        router.push("/profile");
      })
  }, [])

  return <p className="text-center p-4">Connecting your Google Account...</p>
}
