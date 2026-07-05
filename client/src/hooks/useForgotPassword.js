import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../lib/axios";

export default function useForgotPassword() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post(
        "/auth/forgot-password",
        payload
      );

      return data;
    },

    onSuccess: (data) => {
      toast.success(
        data.message || "Password reset link sent."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Unable to send reset link."
      );
    },
  });
}