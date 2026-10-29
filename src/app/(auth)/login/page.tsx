"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, LockKeyhole, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const rememberMe = formData.get("rememberMe") === "on";

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        const message = error.message ?? "সাইন ইন করতে সমস্যা হয়েছে";

        toast.error(message);
        return;
      }

      if (data) {
        toast.success("Your SingIn success!");

        router.push("/");
        router.refresh();
      }

      setError("Connect your login API to sign in.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hendelGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
    toast.success("Your SingIn success!");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Welcome Back
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Resume your adventure with Wanderlust
          </p>
        </div>

        {/* Login Card */}
        <div className="border border-slate-100 bg-white p-6 shadow-md sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="h-9 rounded-none border-slate-200 bg-slate-50 pl-8 focus-visible:ring-cyan-600"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-9 rounded-none border-slate-200 bg-slate-50 pl-8 focus-visible:ring-cyan-600"
                />
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Checkbox id="rememberMe" name="rememberMe" />

                <Label
                  htmlFor="rememberMe"
                  className="cursor-pointer text-sm font-normal text-slate-600"
                >
                  Remember me
                </Label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm text-cyan-600 hover:text-cyan-700"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In */}
            <Button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-none bg-cyan-600 text-white hover:bg-cyan-700"
            >
              {loading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
          </form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-3">
            <Separator className="flex-1" />

            <span className="whitespace-nowrap text-sm text-slate-500">
              Or continue with
            </span>

            <Separator className="flex-1" />
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-none border-slate-200 font-normal hover:bg-slate-50"
            onClick={hendelGoogleSignIn}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="mr-2 h-4 w-4"
            >
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
              />
              <path
                fill="#EA4335"
                d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
              />
            </svg>
            Sign Up With Google
          </Button>

          {/* Register Link */}
          <p className="mt-5 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-cyan-600 hover:text-cyan-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
