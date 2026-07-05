import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../lib/axios";

export default function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post(
        "/auth/register",
        payload
      );

      if (data.accessToken) {
        localStorage.setItem(
          "accessToken",
          data.accessToken
        );
      }

      return data;
    },

    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(
          ["current-user"],
          data.user
        );
      }

      toast.success(
        data.message || "Account created successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    },
  });
}