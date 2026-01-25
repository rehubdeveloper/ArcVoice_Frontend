"use client";

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

export default function GoogleLoginButton({
  mode,
}: {
  mode: "login" | "signup";
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleGoogle = async () => {
    try {
      if (!clientId) {
        console.error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable");
        return;
      }

      // Must match one of your Google Cloud Console "Authorized redirect URIs"
      const redirectUri = `${window.location.origin}/auth/google/callback`;

      if (process.env.NODE_ENV === "development") {
        console.debug("Using Google redirect_uri:", redirectUri);
      }

      // ✅ Add Gmail scopes now (space-separated)
      const scopes = [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/gmail.modify",
      ].join(" ");

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: scopes,

        // ✅ required to get refresh_token (when Google will issue it)
        access_type: "offline",

        // ✅ recommended: reuse existing grants, reduces repeated prompts
        include_granted_scopes: "true",

        // ✅ force consent at least once to ensure refresh_token comes back
        // You can later switch to "select_account" after you confirm refresh_token is stored.
        prompt: "consent",
      });

      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <Button variant="outline" type="button" onClick={handleGoogle}>
      <FaGoogle className="mr-2" />
      {mode === "login" ? "Login with Google" : "Sign up with Google"}
    </Button>
  );
}
