import { useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
      memberId: localStorage.getItem("memberId"),
      role: localStorage.getItem("role"),
    };
  });

  // 로그인 함수
  const login = (data) => {
    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    localStorage.setItem("memberId", data.data.memberId);
    localStorage.setItem("memberNo", data.data.memberNo); // memberNo 저장
    localStorage.setItem("role", data.data.role);

    setUser({
      memberId: data.data.memberId,
      role: data.data.role,
    });
  };

  // 로그아웃 함수 (비동기 처리 및 에러 핸들링 포함)
  const logout = async () => {
    try {
      const memberNo = localStorage.getItem("memberNo");

      // 서버 로그아웃 API 호출 (POST 방식, memberNo를 파라미터로 전달)
      // 서버 컨트롤러: @PostMapping("/logout") @RequestParam Long memberNo
      await axios.post(
        `http://localhost/api/auth/logout?memberNo=${memberNo}`,
        {},
      );

      console.log("서버 로그아웃 처리 완료");
    } catch (error) {
      console.error("로그아웃 API 호출 에러:", error);
      // 서버에서 에러가 나더라도 클라이언트 상태는 초기화해야 함
    } finally {
      // 로컬 스토리지 데이터 안전하게 삭제
      ["token", "refreshToken", "memberId", "memberNo", "role"].forEach((k) =>
        localStorage.removeItem(k),
      );
      setUser(null);
    }
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
