"use client";

import InputCompo from "@/components/InputCompo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, LockIcon, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// 1. Define Zod Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const Loginpage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ email: "", password: "" }); // Reset errors

    // 2. Validate with Zod
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        email: fieldErrors.email?.[0] || "",
        password: fieldErrors.password?.[0] || "",
      });
      return;
    }

    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          // 3. Fetch Session to determine Role
          const { data: session } = await authClient.getSession();
          
          setLoading(false);
          toast.success("Welcome back!");

          // 4. Role-based Redirection
          if (session?.user?.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/user/dashboard");
          }
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "Invalid email or password");
        },
      }
    );
  };

  return (
    <div className="w-full bg-black min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08)_0%,rgba(255,140,250,0.08)_20%,rgba(0,0,0,0)_60%)]"></div>

      <div className="max-w-[95vw] sm:max-w-md w-full bg-card p-4 rounded-md flex items-center flex-col justify-center space-y-8 mx-auto sm:shadow-[5px_5px_rgba(0,98,90,0.4),10px_10px_rgba(0,98,90,0.3),15px_15px_rgba(0,98,90,0.2),20px_20px_rgba(0,98,90,0.1),25px_25px_rgba(0,98,90,0.05)]">
        {/* Logo */}
        <Image
          src="/logoIcon.png"
          height={60}
          width={60}
          alt="Logo"
          className="border rounded-full p-2"
        />

        {/* Header Text */}
        <div className="flex flex-col text-center space-y-2">
          <h1 className="text-2xl leading-tight font-bold">Welcome Back</h1>
          <p className="text-foreground/60 text-base">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Google Signin Button */}
        <Button
          variant={"outline"}
          className="w-full"
          disabled={loading}
          onClick={async () => {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/user/dashboard",
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 128 128"
            className="size-4 mr-2"
          >
            <path
              fill="#fff"
              d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9 67.6 67.6 0 0 0 32.36.35 57.13 57.13 0 0 0 25.9-13.46 57.44 57.44 0 0 0 16-26.26 74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52 36.2 36.2 0 0 1-13.93 5.5 41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42 38.3 38.3 0 0 1 0-24.63 39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
            ></path>
            <path
              fill="#e33629"
              d="M44.59 4.21a64 64 0 0 1 42.61.37 61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8 37.17 37.17 0 0 0-37.46 9.74 39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
            ></path>
            <path
              fill="#f8bd00"
              d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
            ></path>
            <path
              fill="#587dbd"
              d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58 57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
            ></path>
            <path
              fill="#319f43"
              d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08 41.3 41.3 0 0 0 15.1 0 36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47 67.6 67.6 0 0 1-32.36-.35 63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
            ></path>
          </svg>
          Continue with Google
        </Button>

        {/* Separator */}
        <div className="flex w-full overflow-hidden justify-center items-center gap-2 uppercase text-nowrap text-xs text-foreground/60">
          <Separator />
          Or continue with
          <Separator />
        </div>

        {/* Login Form */}
        <form className="w-full space-y-8" onSubmit={handleFormSubmit}>
          <div className="w-full space-y-4">
            {/* Email Input */}
            <div className="space-y-1">
              <InputCompo
                label="Email address"
                labelFor="email"
                placeholder="Enter your email"
                icon={Mail}
                type="email"
                value={formData.email}
                disabled={loading}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                  // Optional: Clear error on change for better UX
                  if (error.email) setError((prev) => ({ ...prev, email: "" }));
                }}
              />
              {error.email && (
                <p className="text-xs text-destructive animate-pulse ml-1">
                  {error.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="tracking-wider text-foreground/90"
              >
                Password
              </Label>

              <div className="relative">
                <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  type={isPasswordShow ? "text" : "password"}
                  value={formData.password}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="pl-9 pr-10"
                  disabled={loading}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                    if (error.password)
                      setError((prev) => ({ ...prev, password: "" }));
                  }}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={loading}
                  onClick={() => setIsPasswordShow((prev) => !prev)}
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 cursor-pointer"
                >
                  {isPasswordShow ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {error.password && (
                <p className="text-xs text-destructive animate-pulse ml-1">
                  {error.password}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant={"outline"}
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Card Nav */}
        <p className="text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;