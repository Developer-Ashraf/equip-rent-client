"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, loginWithSocial } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Wrench, Loader2 } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (res.error) {
        toast.error(res.error.message || "Invalid credentials!");
      } else {
        toast.success("Welcome back! Logged in successfully.");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSocialLoading("google");
    toast.loading("Redirecting to Google...", { id: "social-redirect" });
    await loginWithSocial("google", callbackUrl);
  };

  const handleGithubLogin = async () => {
    setSocialLoading("github");
    toast.loading("Redirecting to GitHub...", { id: "social-redirect" });
    await loginWithSocial("github", callbackUrl);
  };

  return (
    <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex w-12 h-12 rounded-2xl bg-orange-600 text-white items-center justify-center shadow-lg shadow-orange-600/30">
          <Wrench className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500">
          Login to manage your bookings and rental equipment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-600 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-600 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to EquipRent"}
        </button>
      </form>

      {/* Social Google Login per Requirement */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-slate-400 font-semibold uppercase">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!!socialLoading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer disabled:opacity-60"
          >
            {socialLoading === "google" ? (
              <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
            ) : (
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>{socialLoading === "google" ? "Connecting..." : "Google"}</span>
          </button>

          <button
            type="button"
            disabled={!!socialLoading}
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer disabled:opacity-60"
          >
            {socialLoading === "github" ? (
              <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
            ) : (
              <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            <span>{socialLoading === "github" ? "Connecting..." : "GitHub"}</span>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-orange-600 hover:underline">
          Register now
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="h-96 w-full max-w-md bg-white rounded-3xl animate-pulse" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
