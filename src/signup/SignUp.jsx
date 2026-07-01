import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "../components/auth/Auth.styles"; // 스타일 파일 경로에 맞게 수정하세요
import logo from "../assets/logo.png";

const Signup = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const [memberName, setMemberName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);
  const navi = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (/\s/.test(memberName) || /욕설1|욕설2/i.test(memberName)) {
      alert("닉네임 형식을 확인하세요.");
      return;
    }
    if (!/^[a-zA-Z0-9]{5,12}$/.test(memberId)) {
      alert("아이디는 5~12자의 영문, 숫자만 가능합니다.");
      return;
    }
    if (!/^[a-zA-Z0-9]{6,15}$/.test(memberPwd)) {
      alert("비밀번호는 6~15자의 영문, 숫자만 가능합니다.");
      return;
    }

    isLoading(true);
    try {
      await axios.post("http://localhost/api/members", {
        memberId,
        memberPwd,
        memberName,
        email,
      });
      setStatus("가입 성공!");
      navi("/login");
    } catch (err) {
      setStatus("가입 실패");
    } finally {
      isLoading(false);
    }
  };

  return (
    <S.AuthContainer>
      <div>
        <S.LogoImage src={logo} alt="Plant Plant" />
      </div>
      <S.MainBanner>Plant Plants</S.MainBanner>
      <S.Title>계정 생성</S.Title>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <S.Field>
          <S.Label>
            닉네임<S.RequiredStar>*</S.RequiredStar>
          </S.Label>
          <S.Input
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </S.Field>

        <S.Field>
          <S.Label>
            아이디<S.RequiredStar>*</S.RequiredStar>
          </S.Label>
          <S.Input
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
        </S.Field>

        <S.Field>
          <S.Label>
            비밀번호
            <S.RequiredStar>
              <S.RequiredStar>*</S.RequiredStar>
            </S.RequiredStar>
          </S.Label>
          <S.Input
            type="password"
            value={memberPwd}
            onChange={(e) => setMemberPwd(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </S.Field>

        <S.Field>
          <S.Label>
            이메일<S.RequiredStar>*</S.RequiredStar>
          </S.Label>
          <S.Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </S.Field>

        <S.SubmitButton type="submit" disabled={loading}>
          {loading ? "가입 중..." : "가입하기"}
        </S.SubmitButton>
        <S.Pstyled style={{ textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>‘가입하기'</span>를 클릭함으로써,
          이용약관 및 <span style={{ fontWeight: "bold" }}>개인정보</span>{" "}
          처리방침에 동의하는 것으로 간주됩니다
        </S.Pstyled>
      </form>
      {status && <p>{status}</p>}
    </S.AuthContainer>
  );
};

export default Signup;
