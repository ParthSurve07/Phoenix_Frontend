"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock user — will come from API later
const mockUser = {
  name: "Parth Patil",
  email: "parth@example.com",
  joinedAt: "January 2025",
};

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Enter your current password"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ProfilePage() {
  const router = useRouter();
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(passwordSchema) });

  const onPasswordSubmit = async (data) => {
    setLoading(true);
    setPasswordError("");
    setPasswordSuccess("");
    try {
      // Will call API later: await api.post("/auth/change-password", data)
      await new Promise((res) => setTimeout(res, 800)); // mock delay
      setPasswordSuccess("Password updated successfully.");
      reset();
    } catch (err) {
      setPasswordError("Failed to update password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("fintrack_token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      {/* Header */}
      <div>
        <h1 className="text-slate-900 text-xl font-semibold mt-4">Profile</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your account details
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-slate-900 font-semibold text-sm">
          Account Information
        </h2>

        {/* Name */}
        <div className="flex items-center gap-3 py-3 border-b border-amber-50">
          <User size={16} className="text-amber-700 shrink-0" />
          <div>
            <p className="text-slate-400 text-xs">Full Name</p>
            <p className="text-slate-900 text-sm font-medium mt-0.5">
              {mockUser.name}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 py-3 border-b border-amber-50">
          <Mail size={16} className="text-amber-700 shrink-0" />
          <div>
            <p className="text-slate-400 text-xs">Email</p>
            <p className="text-slate-900 text-sm font-medium mt-0.5">
              {mockUser.email}
            </p>
          </div>
        </div>

        {/* Joined */}
        <div className="flex items-center gap-3 py-3">
          <Lock size={16} className="text-amber-700 shrink-0" />
          <div>
            <p className="text-slate-400 text-xs">Member Since</p>
            <p className="text-slate-900 text-sm font-medium mt-0.5">
              {mockUser.joinedAt}
            </p>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 flex flex-col gap-5">
        <h2 className="text-slate-900 font-semibold text-sm">
          Change Password
        </h2>

        <form
          onSubmit={handleSubmit(onPasswordSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Current Password */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-slate-600 text-sm">Current Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-amber-50 border-amber-200 focus:border-amber-400 text-slate-900 placeholder:text-slate-400"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <span className="text-red-600 text-xs">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-slate-600 text-sm">New Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-amber-50 border-amber-200 focus:border-amber-400 text-slate-900 placeholder:text-slate-400"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <span className="text-red-600 text-xs">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-slate-600 text-sm">
              Confirm New Password
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-amber-50 border-amber-200 focus:border-amber-400 text-slate-900 placeholder:text-slate-400"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Feedback */}
          {passwordSuccess && (
            <p className="text-green-600 text-xs">{passwordSuccess}</p>
          )}
          {passwordError && (
            <p className="text-red-600 text-xs">{passwordError}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="bg-slate-900 hover:bg-slate-800 text-white w-fit px-6"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>

      {/* Logout */}
      <div className="bg-white border border-amber-200 rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-slate-900 text-sm font-semibold">Logout</p>
          <p className="text-slate-500 text-xs mt-0.5">
            You will be returned to the login page
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 gap-2"
        >
          <LogOut size={15} />
          Logout
        </Button>
      </div>

    </div>
  );
}