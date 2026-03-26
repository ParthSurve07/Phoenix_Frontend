import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export const useRisk = () => useQuery({
  queryKey: ["risk"],
  queryFn: () => api.get("/risk").then(r => r.data.data),
});

export const useAnalyzeRisk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post("/risk/analyze").then(r => r.data.data),
    onSuccess: () => queryClient.invalidateQueries(["risk"]),
  });
};