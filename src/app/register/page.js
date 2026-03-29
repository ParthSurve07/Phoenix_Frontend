"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      const res = await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("fintrack_token", res.data.token);
      localStorage.setItem("fintrack_user", JSON.stringify(res.data.user));
      router.push("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8 text-slate-900 font-semibold text-lg">
          <TrendingUp className="text-amber-700" size={22} />
          <span>FinTrack</span>
        </div>

        {/* Card */}
        <div className="bg-white border border-amber-200 rounded-lg p-8 flex flex-col gap-5">
          <div>
            <h1 className="text-slate-900 text-xl font-semibold">Create account</h1>
            <p className="text-slate-600 text-sm mt-1">Start tracking your portfolio</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 text-sm font-medium">Full Name</Label>
              <Input
                type="text"
                placeholder="Parth Patil"
                className="bg-amber-50 border-amber-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-200"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-600 text-xs">{errors.name.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 text-sm font-medium">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="bg-amber-50 border-amber-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-200"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-600 text-xs">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 text-sm font-medium">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-amber-50 border-amber-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-200"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-600 text-xs">{errors.password.message}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 text-sm font-medium">Confirm Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-amber-50 border-amber-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-200"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-red-600 text-xs">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <p className="text-red-600 text-xs">{serverError}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 text-white w-full mt-1 rounded-lg"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-slate-600 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-slate-900 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}