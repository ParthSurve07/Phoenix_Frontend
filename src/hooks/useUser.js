import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export const useProfile = () => useQuery({
  queryKey: ["profile"],
  queryFn: () => api.get("/users/profile").then(r => r.data.data),
});

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.put("/users/profile", data).then(r => r.data.data),
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });
};

export const useChangePassword = () => useMutation({
  mutationFn: (data) => api.put("/users/change-password", data).then(r => r.data),
});