import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data) => api.post("/auth/login", data).then(r => r.data),
    onSuccess: (data) => {
      localStorage.setItem("fintrack_token", data.token);
      localStorage.setItem("fintrack_user", JSON.stringify(data.user));
      router.push("/dashboard");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data) => api.post("/auth/register", data).then(r => r.data),
    onSuccess: (data) => {
      localStorage.setItem("fintrack_token", data.token);
      localStorage.setItem("fintrack_user", JSON.stringify(data.user));
      router.push("/dashboard");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  return () => {
    localStorage.removeItem("fintrack_token");
    localStorage.removeItem("fintrack_user");
    router.push("/login");
  };
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("fintrack_user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("fintrack_token");
};