import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../lib/axios";

export default function useVerifyEmail() {
  return useMutation({
    mutationFn: async (token) => {
      const { data } = await api.post(
        "/auth/verify-email",
        {
          token,
        }
      );

      return data;
    },

    onSuccess: (data) => {
      toast.success(
        data.message || "Email verified successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Email verification failed."
      );
    },
  });
}