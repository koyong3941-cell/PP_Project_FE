import { useState, createContext, useContext } from "react";
import axios from "axios";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    return {
      memberId: localStorage.getItem("memberId"),
      memberNo: localStorage.getItem("memberNo"),
      role: localStorage.getItem("role"),
      memberName: localStorage.getItem("memberName"),
      email: localStorage.getItem("email"),
      imgPath: localStorage.getItem("imgPath"),
      saveName: localStorage.getItem("saveName"),
      delYn: localStorage.getItem("delYn"),
    };
  });

  // =========================
  // 회원 정보 갱신
  // =========================
  const refreshUser = async () => {
    try {
      const response = await api.get("/members/detail");

      const { memberName, email, imgPath, saveName, delYn } =
        response.data.data;

      localStorage.setItem("memberName", memberName);
      localStorage.setItem("email", email);
      localStorage.setItem("imgPath", imgPath);
      localStorage.setItem("saveName", saveName);
      localStorage.setItem("delYn", delYn);

      setUser((prev) => ({
        ...prev,
        memberName,
        email,
        imgPath,
        saveName,
        delYn,
      }));
    } catch (error) {
      console.error("회원 정보 갱신 실패:", error);
      throw error;
    }
  };

  // =========================
  // 로그인
  // =========================
  const login = async (data) => {
    const { accessToken, refreshToken, memberId, memberNo, role } = data.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("memberId", memberId);
    localStorage.setItem("memberNo", memberNo);
    localStorage.setItem("role", role);

    // 기본 정보 먼저 세팅
    setUser({
      memberId,
      memberNo,
      role,
    });

    // 상세 정보 갱신
    await refreshUser();
  };

  // =========================
  // 로그아웃
  // =========================
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log("서버 로그아웃 처리 완료");
    } catch (error) {
      console.error("로그아웃 API 호출 에러:", error);
    } finally {
      [
        "token",
        "refreshToken",
        "memberId",
        "memberNo",
        "role",
        "memberName",
        "email",
        "imgPath",
        "saveName",
        "delYn",
      ].forEach((k) => localStorage.removeItem(k));

      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        refreshUser,
        isLogin: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
