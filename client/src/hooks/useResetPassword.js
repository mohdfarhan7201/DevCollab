import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../lib/axios";

export default function useResetPassword() {
  return useMutation({
    mutationFn: async ({ token, password }) => {
      const { data } = await api.post(
        "/auth/reset-password",
        {
          token,
          password,
        }
      );

      return data;
    },

    onSuccess: (data) => {
      toast.success(
        data.message || "Password reset successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Unable to reset password."
      );
    },
  });
}