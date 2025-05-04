"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  role: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  fetchUser: async () => {},
  logout: async () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const token = Cookies.get("token"); 

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: 'include' 
      });

      console.log(res)

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };
    loadUser();
  }, []);

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, fetchUser, logout, loading }}>
      {loading ? <div className="p-4 text-center">Loading...</div> : children}
    </AuthContext.Provider>
  );
};
