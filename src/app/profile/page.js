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
import { useProfile, useChangePassword } from "@/hooks/useUser";

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
  const { data: user, isLoading } = useProfile();
  const changePassword = useChangePassword();
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(passwordSchema) });

  const onPasswordSubmit = async (data) => {
    setPasswordSuccess("");
    try {
      await changePassword.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      setPasswordSuccess("Password updated successfully.");
      reset();
    } catch { }
  };

  const handleLogout = () => {
    localStorage.removeItem("fintrack_token");
    localStorage.removeItem("fintrack_user");
    router.push("/login");
  };

  const joinedAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 text-xl sm:text-2xl md:text-3xl font-semibold mt-4">Profile</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-1 md:mt-2">Manage your account details</p>
      </div>

      {/* User Info Card */}
      <div className="bg-white border border-amber-200 rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
        <h2 className="text-slate-900 font-semibold text-sm sm:text-base">Account Information</h2>

        {isLoading ? (
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-4 bg-amber-100 rounded w-48" />
            <div className="h-4 bg-amber-100 rounded w-64" />
            <div className="h-4 bg-amber-100 rounded w-40" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 py-3 border-b border-amber-50">
              <User className="text-amber-700 shrink-0 w-4 h-4 sm:w-[16px] sm:h-[16px]" />
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Full Name</p>
                <p className="text-slate-900 text-sm sm:text-base font-medium mt-0.5">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 border-b border-amber-50">
              <Mail className="text-amber-700 shrink-0 w-4 h-4 sm:w-[16px] sm:h-[16px]" />
              <div className="overflow-hidden">
                <p className="text-slate-400 text-xs sm:text-sm">Email</p>
                <p className="text-slate-900 text-sm sm:text-base font-medium mt-0.5 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3">
              <Lock className="text-amber-700 shrink-0 w-4 h-4 sm:w-[16px] sm:h-[16px]" />
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Member Since</p>
                <p className="text-slate-900 text-sm sm:text-base font-medium mt-0.5">{joinedAt}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Change Password Card */}
      <div className="bg-white border border-amber-200 rounded-xl p-5 sm:p-6 flex flex-col gap-5 shadow-sm">
        <h2 className="text-slate-900 font-semibold text-sm sm:text-base">Change Password</h2>

        <form onSubmit={handleSubmit(onPasswordSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label className="text-slate-600 text-sm font-medium">Current Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-amber-50 border-amber-200 focus:border-amber-400 text-slate-900 placeholder:text-slate-400 h-11 sm:h-10 text-base sm:text-sm"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <span className="text-red-600 text-xs font-medium">{errors.currentPassword.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label className="text-slate-600 text-sm font-medium">New Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-amber-50 border-amber-200 focus:border-amber-400 text-slate-900 placeholder:text-slate-400 h-11 sm:h-10 text-base sm:text-sm"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <span className="text-red-600 text-xs font-medium">{errors.newPassword.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label className="text-slate-600 text-sm font-medium">Confirm New Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-amber-50 border-amber-200 focus:border-amber-400 text-slate-900 placeholder:text-slate-400 h-11 sm:h-10 text-base sm:text-sm"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-xs font-medium">{errors.confirmPassword.message}</span>
            )}
          </div>

          {passwordSuccess && <p className="text-green-600 text-xs font-medium">{passwordSuccess}</p>}
          {changePassword.isError && (
            <p className="text-red-600 text-xs font-medium">
              {changePassword.error?.response?.data?.message || "Failed to update password."}
            </p>
          )}

          <Button
            type="submit"
            disabled={changePassword.isPending}
            className="bg-slate-900 hover:bg-slate-800 text-white w-full sm:w-fit px-6 h-11 sm:h-10 mt-1"
          >
            {changePassword.isPending ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>

      {/* Logout */}
      <div className="bg-white border border-amber-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <p className="text-slate-900 text-sm sm:text-base font-semibold">Logout</p>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">You will be returned to the login page</p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 gap-2 w-full sm:w-auto h-11 sm:h-10"
        >
          <LogOut size={16} className="sm:w-[15px] sm:h-[15px]" />
          Logout
        </Button>
      </div>
    </div>
  );
}