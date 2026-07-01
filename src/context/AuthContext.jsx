import { useState, createContext, useContext } from "react";
import axios from "axios";

// 보관함 만들기
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    console.log("token:", token);
    if (!token) return null;
    return {
      memberId: localStorage.getItem("memberId"),
      role: localStorage.getItem("role"),
    };
  });

  const login = (data) => {
    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    localStorage.setItem("memberId", data.data.memberId);
    localStorage.setItem("role", data.data.role);

    setUser({
      memberId: data.memberId,
      role: data.role,
    });
  };

  const logout = () => {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("refreshToken");
    //   localStorage.removeItem("memberId");
    //   localStorage.removeItem("memberName");
    //   localStorage.removeItem("role");
    axios.get(
      `http://localhost/api/auth/logout?Id=${localStorage.getItem("memberId")}`,
    );
    ["token", "refreshToken", "memberId", "role"].forEach((k) =>
      localStorage.removeItem(k),
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
