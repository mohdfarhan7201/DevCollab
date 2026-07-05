import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../lib/axios";

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await api.post(
        "/auth/login",
        credentials
      );

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      return data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        ["current-user"],
        data.user
      );

      toast.success("Logged in successfully.");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Unable to login."
      );
    },
  });
}