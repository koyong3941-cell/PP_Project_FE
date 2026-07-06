import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import * as S from "../components/auth/Auth.styles"; // 경로 확인 필요
import logo from "../assets/logo.png";
import { useAlertify } from "../hooks/useAlertify";

const Login = () => {
  const { login, user } = useAuth();
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);
  const navi = useNavigate();
  const { success, error } = useAlertify();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!memberId || !memberPwd) {
      setStatus("아이디랑 비밀번호를 꼭 입력하세요");
      return;
    }

    isLoading(true);
    setStatus("");

    try {
      const result = await api.post("/auth/login", {
        memberId,
        memberPwd,
      });
      login(result.data);
      success("로그인 성공!");
      navi("/");
    } catch (err) {
      console.error("로그인 에러:", err.response?.data);
      setStatus("아이디 또는 비밀번호가 올바르지 않습니다");
    } finally {
      isLoading(false);
    }
  };

  return (
    <S.AuthContainer>
      <S.LogoImage src={logo} alt="Plant Plant" />

      <S.MainBanner>Plant Plant</S.MainBanner>
      <S.Title>로그인</S.Title>

      {user ? (
        <p style={{ color: "green" }}>로그인 상태입니다 ({user.memberId})</p>
      ) : (
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <S.Field>
            <S.Label>아이디</S.Label>
            <S.Input
              type="text"
              placeholder="아이디를 입력하세요"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </S.Field>

          <S.Field>
            <S.Label>비밀번호</S.Label>
            <S.Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={memberPwd}
              onChange={(e) => setMemberPwd(e.target.value)}
            />
          </S.Field>

          <S.SubmitButton type="submit" disabled={loading}>
            {loading ? "로그인 하는중...." : "로그인"}
          </S.SubmitButton>
        </form>
      )}

      {status && <S.ErrorText>{status}</S.ErrorText>}
    </S.AuthContainer>
  );
};

export default Login;
