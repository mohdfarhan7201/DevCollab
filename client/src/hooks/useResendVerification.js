import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../lib/axios";

export default function useResendVerification() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post(
        "/auth/resend-verification",
        payload
      );

      return data;
    },

    onSuccess: (data) => {
      toast.success(
        data.message || "Verification email sent."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Unable to resend verification email."
      );
    },
  });
}