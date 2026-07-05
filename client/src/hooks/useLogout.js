import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../lib/axios";

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },

    onSuccess: () => {
      localStorage.removeItem("accessToken");

      queryClient.clear();

      toast.success("Logged out successfully.");

      window.location.href = "/login";
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Logout failed."
      );
    },
  });
}