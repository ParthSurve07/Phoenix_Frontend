import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export const usePortfolio = () => useQuery({
  queryKey: ["portfolio"],
  queryFn: () => api.get("/portfolio").then(r => r.data.data),
});

export const useAddHolding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/portfolio", data).then(r => r.data.data),
    onSuccess: () => queryClient.invalidateQueries(["portfolio"]),
  });
};

export const useDeleteHolding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/portfolio/${id}`).then(r => r.data),
    onSuccess: () => queryClient.invalidateQueries(["portfolio"]),
  });
};

export const useSyncAngelOne = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/portfolio/angelone", data).then(r => r.data.data),
    onSuccess: () => queryClient.invalidateQueries(["portfolio"]),
  });
};

export const useUploadZerodhaCSV = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append("file", file);
      return api.post("/portfolio/zerodha-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then(r => r.data.data);
    },
    onSuccess: () => queryClient.invalidateQueries(["portfolio"]),
  });
};