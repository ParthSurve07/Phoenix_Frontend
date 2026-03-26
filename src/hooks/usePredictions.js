import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const usePredictions = () => useQuery({
  queryKey: ["predictions"],
  queryFn: () => api.get("/predictions").then(r => r.data.data),
});