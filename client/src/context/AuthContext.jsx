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

  const fetchMe = useCallback(async () => {
    try {
      if (!getAccessToken()) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      const { data } = await api.get("/auth/me");

      setUser(data.user);
      setIsAuthenticated(true);
    } catch {
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

  const login = async (credentials) => {
    const { data } = await api.post(
      "/auth/login",
      credentials
    );

    if (data.accessToken) {
      setAccessToken(data.accessToken);
    }

    if (data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
    }

    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post(
      "/auth/register",
      payload
    );

    return data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    removeAccessToken();

    setUser(null);
    setIsAuthenticated(false);

    window.location.href = "/login";
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider."
    );
  }

  return context;
}