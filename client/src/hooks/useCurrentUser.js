import { useQuery } from "@tanstack/react-query";

import api from "../lib/axios";

export default function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: ["current-user"],

    queryFn: async () => {
      const { data } = await api.get("/auth/me");

      return data.user;
    },

    staleTime: 1000 * 60 * 5,

    ...options,
  });
}