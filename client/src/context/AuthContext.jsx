import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import api from "../lib/axios";

import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "../lib/token";


const AuthContext = createContext(null);



export function AuthProvider({ children }) {


  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);



  // =========================
  // Fetch Current User
  // =========================

  const fetchMe = useCallback(async () => {


    try {


      const token = getAccessToken();


      if (!token) {

        setUser(null);

        setIsAuthenticated(false);

        setLoading(false);

        return;

      }



      const response =
        await api.get("/auth/me");



      const currentUser =
        response.data.user ||
        response.data.data;



      setUser(currentUser);


      setIsAuthenticated(true);



    } catch (error) {


      removeAccessToken();


      setUser(null);


      setIsAuthenticated(false);



    } finally {


      setLoading(false);


    }


  }, []);





  useEffect(() => {

    fetchMe();

  }, [fetchMe]);





  // =========================
  // Login
  // =========================

  const login = async (credentials) => {


    const response =
      await api.post(
        "/auth/login",
        credentials
      );



    const payload =
      response.data;



    const loginData =
      payload.data || payload;



    const loggedUser =
      loginData.user;



    const accessToken =
      loginData.accessToken;




    if (accessToken) {

      setAccessToken(
        accessToken
      );

    }




    if (loggedUser) {


      setUser(
        loggedUser
      );


      setIsAuthenticated(
        true
      );


    }



    return {

      user: loggedUser,

      accessToken,

    };


  };





  // =========================
  // Register
  // =========================

  const register = async (payload) => {


    const response =
      await api.post(
        "/auth/register",
        payload
      );


    return response.data;


  };





  // =========================
  // Logout
  // =========================

  const logout = async () => {


    try {


      await api.post(
        "/auth/logout"
      );


    } catch {}



    removeAccessToken();



    setUser(null);


    setIsAuthenticated(false);



    window.location.href =
      "/login";


  };





  // =========================
  // Update User
  // =========================

  const updateUser = (updatedUser) => {

    setUser(
      updatedUser
    );


    setIsAuthenticated(
      true
    );

  };






  const value = useMemo(
    () => ({

      user,

      loading,

      isAuthenticated,

      login,

      logout,

      register,

      fetchMe,

      updateUser,

    }),

    [
      user,
      loading,
      isAuthenticated,
      fetchMe,
    ]

  );





  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>

  );


}





export function useAuth() {


  const context =
    useContext(
      AuthContext
    );



  if (!context) {


    throw new Error(
      "useAuth must be used within AuthProvider."
    );

  }
  return context;


}