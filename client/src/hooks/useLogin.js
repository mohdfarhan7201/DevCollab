import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../lib/axios";


export default function useLogin() {

  const queryClient = useQueryClient();



  return useMutation({

    mutationFn: async (credentials) => {


      const response =
        await api.post(
          "/auth/login",
          credentials
        );



      const payload =
        response.data;



      const loginData =
        payload.data || payload;



      const accessToken =
        loginData.accessToken;



      const user =
        loginData.user;




      if (accessToken) {

        localStorage.setItem(
          "accessToken",
          accessToken
        );

      }



      return {

        user,

        accessToken,

      };


    },



    onSuccess: (data) => {


      queryClient.setQueryData(
        ["current-user"],
        data.user
      );


      toast.success(
        "Logged in successfully."
      );


    },



    onError: (error) => {


      toast.error(
        error.response?.data?.message ||
        "Unable to login."
      );


    },


  });

}