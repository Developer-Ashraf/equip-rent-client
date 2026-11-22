import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "https://equip-rent-client-nine.vercel.app",
});

export const { signIn, signUp, signOut, useSession } = authClient;

export const loginWithSocial = async (provider: "google" | "github", callbackURL = "/") => {
  try {
    const res: any = await signIn.social({
      provider,
      callbackURL,
    });
    if (res?.data?.url) {
      window.location.href = res.data.url;
      return;
    }
  } catch (e) {
    console.warn("Better-auth social client notice:", e);
  }

  try {
    const response = await fetch("/api/auth/sign-in/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, callbackURL }),
    });
    const data = await response.json();
    if (data?.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error("Social redirect failed:", err);
  }
};
