"use client";

import { Button } from "@/components/ui/button";

export default function GoogleLoginButton({
  mode,
}: {
  mode: "login" | "signup";
}) {
  const handleGoogle = async () => {
    try {
      // Use an explicit environment config if present, otherwise fall back to the
      // existing client callback route under /auth/google/callback
      // (the app has src/app/auth/google/callback/page.tsx) — ensure this value is
      // registered in your Google Cloud Console "Authorized redirect URIs".
      const redirectUri =
        process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ||
        process.env.NEXT_PUBLIC_API_URL + "/api/accounts/oauth2/callback";

      // Helpful debug info (only in dev) so you can quickly check what redirect
      // URI was used if Google reports redirect_uri_mismatch in their error.
      if (process.env.NODE_ENV === "development") {
        console.debug("Using Google redirect_uri:", redirectUri);
      }

      // Build the Google OAuth 2.0 authorization URL client-side using
      // NEXT_PUBLIC_GOOGLE_CLIENT_ID and the redirect URI used by the app.
      // The backend /api/accounts/google/ endpoint expects the `code` (not the
      // auth URL), which will be handled in the callback page.

      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) {
        console.error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable");
        return;
      }

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        include_granted_scopes: "true",
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="mr-2 size-4"
      >
        <path
          d="M12.48 10.92v3.28h7.84..."
          fill="currentColor"
        />
      </svg>
      {mode === "login" ? "Login with Google" : "Sign up with Google"}
    </Button>
  );
}
