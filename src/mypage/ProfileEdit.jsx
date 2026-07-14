import {
  Page,
  Header,
  HomeIcon,
  Container,
  LogoArea,
  Logo,
  Content,
  Path,
  ProfileArea,
  ProfileImage,
  HiddenInput,
  Id,
  NameRow,
  Name,
  NameInput,
  EditButton,
  RemoveButton,
  Form,
  Notice,
  Input,
  EmailRow,
  EmailInput,
  Select,
  ButtonArea,
  EditButtonSubmit,
  WithdrawButton,
} from "./ProfileEdit.styles";

import { useEffect, useState, useRef } from "react";
import homeLogo from "../assets/home.png";
import profileImg from "../assets/unknown.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAlertify } from "../hooks/useAlertify";
import Popup from "../popup/PopUp";

function ProfileEdit() {
  const navi = useNavigate();

  const { user, logout, refreshUser } = useAuth();
  const { success, error } = useAlertify();

  const [selectedFile, setSelectedFile] = useState(null);

  const [memberPwd, setMemberPwd] = useState("");
  const [memberPwdConfirm, setMemberPwdConfirm] = useState("");

  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("naver.com");

  const [memberName, setMemberName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);

  const [pwdError, setPwdError] = useState("");
  const [pwdConfirmError, setPwdConfirmError] = useState("");

  const [isOpen, setOpen] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.email) {
      const [id, domain] = user.email.split("@");
      setEmailId(id);
      setEmailDomain(domain);
    }

    if (user?.memberName) {
      setMemberName(user.memberName);
    }
  }, [user]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const fullEmail = `${emailId}@${emailDomain}`;

    if (/\s/.test(memberName) || /시발|싯팔|개자식/i.test(memberName)) {
      error("비속어 혹은 공백은 사용할 수 없습니다.");
      return;
    }

    if (!/^[a-zA-Z0-9]{6,15}$/.test(memberPwd)) {
      error("비밀번호는 6~15자의 영문, 숫자만 가능합니다.");
      return;
    }

    if (memberPwd !== memberPwdConfirm) {
      error("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await api.patch("/members/edit", {
        memberName,
        memberPwd,
        email: fullEmail,
      });

      await refreshUser();

      success("수정 성공!");
      navi("/");
    } catch (err) {
      error("수정 실패");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete("/members/delete", {
        data: {
          memberNo: user.memberNo,
        },
      });

      success("탈퇴 성공!");

      setOpen(false);

      logout();

      navi("/login");
    } catch (err) {
      console.log(err);

      error("탈퇴 실패");

      setOpen(false);
    }
  };

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const formData = new FormData();

    formData.append("imageFile", file);

    try {
      await api.post("/members/profile/image", formData);

      await refreshUser();

      success("이미지 업로드 성공");
    } catch (err) {
      console.error(err);

      error("업로드 실패");
    }
  };

  const handleRemoveProfile = async () => {
    try {
      await api.delete("/members/profile/image");

      await refreshUser();

      success("기본 프로필로 변경되었습니다.");
    } catch (err) {
      console.error(err);

      error("프로필 삭제에 실패했습니다.");
    }
  };

  return (
    <Page>
      <Header>
        <HomeIcon src={homeLogo} alt="home" onClick={() => navi("/")} />
      </Header>

      <Container>
        <LogoArea>
          <Logo>
            Plant
            <br />
            Plants
          </Logo>
        </LogoArea>

        <Content>
          <Path>마이페이지 &gt; 내 정보 수정</Path>

          <ProfileArea>
            <ProfileImage
              src={
                user?.delYn === "N" && user?.imgPath && user?.saveName
                  ? `http://localhost${user.imgPath}${user.saveName}`
                  : profileImg
              }
              alt="profile"
              onClick={handleProfileClick}
            />

            <HiddenInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            <div>
              <Id>
                {user?.memberId
                  ? `${user.memberId} 님 반갑습니다!`
                  : "아이디 세션이 만료되었습니다."}
              </Id>

              <NameRow>
                {isEditingName ? (
                  <NameInput
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <Name>{memberName}</Name>
                )}

                <EditButton onClick={() => setIsEditingName(!isEditingName)}>
                  {isEditingName ? "✔" : "✎"}
                </EditButton>
              </NameRow>

              <RemoveButton onClick={handleRemoveProfile}>
                🗑 Remove
              </RemoveButton>
            </div>
          </ProfileArea>

          <Form>
            <label>비밀번호</label>

            {pwdError && <Notice>{pwdError}</Notice>}

            <Input
              type="password"
              value={memberPwd}
              onChange={(e) => setMemberPwd(e.target.value)}
              placeholder="비밀번호 (영문, 숫자 6~15자)"
            />

            <label>비밀번호 확인</label>

            {pwdConfirmError && <Notice>{pwdConfirmError}</Notice>}

            <Input
              type="password"
              value={memberPwdConfirm}
              onChange={(e) => setMemberPwdConfirm(e.target.value)}
              placeholder="비밀번호 확인"
            />

            <label>이메일</label>

            <EmailRow>
              <EmailInput
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />

              <span>@</span>

              <Select
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
              >
                <option value="naver.com">naver.com</option>

                <option value="gmail.com">gmail.com</option>

                <option value="daum.net">daum.net</option>
              </Select>
            </EmailRow>
          </Form>

          <ButtonArea>
            <EditButtonSubmit onClick={handleEditSubmit}>
              수정하기
            </EditButtonSubmit>

            <WithdrawButton onClick={() => setOpen(true)}>
              탈퇴하기
            </WithdrawButton>
          </ButtonArea>

          <Popup
            open={isOpen}
            type="confirm"
            title="탈퇴하시겠습니까?"
            message="탈퇴 후 복구 시 관리자에게 문의가 필요합니다."
            confirmText="확인"
            cancelText="취소"
            onConfirm={handleDelete}
            onCancel={() => setOpen(false)}
            onClose={() => setOpen(false)}
          />
        </Content>
      </Container>
    </Page>
  );
}

export default ProfileEdit;
