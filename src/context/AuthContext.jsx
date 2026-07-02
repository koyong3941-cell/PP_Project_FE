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
      memberName: localStorage.getItem("memberName"),
      role: localStorage.getItem("role"),
    };
  });

  /*
  const login = (data) => {
    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    localStorage.setItem("memberId", data.data.memberId);
    localStorage.setItem("memberNo", data.data.memberNo); // memberNo 저장
    localStorage.setItem("memberName", data.data.memberName); // memberName 저장
    localStorage.setItem("role", data.data.role);

    setUser({
      memberId: data.data.memberId,
      role: data.data.role,
    });
  }; */

  const login = async (data) => {
    const { accessToken, refreshToken, memberId, memberNo, role } = data.data;

    // 1. 기본 정보 저장
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("memberId", memberId);
    localStorage.setItem("memberNo", memberNo);
    localStorage.setItem("role", role);

    try {
      const response = await api.get("http://localhost/api/members/detail"); //추가적으로 API를 2중 호출 하는 구조인데 추후 수정하면 좋겠음
      console.log("회원 정보:", response.data);

      const { memberName } = response.data.data;
      const { email } = response.data.data;

      // 3. 추가 정보 로컬 스토리지 저장
      localStorage.setItem("memberName", memberName);
      localStorage.setItem("email", email);
      // localStorage.setItem("memberImgPath", memberImgPath);

      // 4. setUser 상태 업데이트
      setUser({
        memberId,
        memberNo,
        role,
        memberName,
        email,
        // memberImgPath, // Path 현재 미구현 > MemberMapper join으로 가져와야함.
      });
    } catch (error) {
      console.error("추가 정보 조회 실패:", error);
    }
  };

  // 로그아웃 함수 (비동기 처리 및 에러 핸들링 포함)
  const logout = async () => {
    try {
      const memberNo = localStorage.getItem("memberNo");

      // 서버 로그아웃 API 호출 (POST 방식, memberNo를 파라미터로 전달)
      // 서버 컨트롤러: @PostMapping("/logout") @RequestParam Long memberNo
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
      // 서버에서 에러가 나더라도 클라이언트 상태는 초기화해야 함
    } finally {
      // 로컬 스토리지 데이터 안전하게 삭제
      [
        "token",
        "refreshToken",
        "memberId",
        "memberNo",
        "role",
        "memberName",
        "email",
      ].forEach((k) => localStorage.removeItem(k));
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
