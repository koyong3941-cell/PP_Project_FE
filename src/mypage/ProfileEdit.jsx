import { styles } from "./ProfileEdit.styles";
import { useEffect, useState } from "react";
import homeLogo from "../assets/home.png";
import profileImg from "../assets/unknown.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAlertify } from "../hooks/useAlertify";
import Popup from "../popup/PopUp";

function ProfileEdit() {
  const navi = useNavigate();
  const { user, logout } = useAuth();
  const { success, error } = useAlertify();

  // =========================
  // STATE
  // =========================
  const [memberPwd, setMemberPwd] = useState("");
  const [memberPwdConfirm, setMemberPwdConfirm] = useState("");

  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("naver.com");

  const [memberName, setMemberName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);

  const [pwdError, setPwdError] = useState("");
  const [pwdConfirmError, setPwdConfirmError] = useState("");

  const [isOpen, setOpen] = useState(false);

  const openDeletePopup = () => setOpen(true);

  // =========================
  // INIT (user → form state)
  // =========================
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

  // =========================
  // EDIT SUBMIT
  // =========================
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const fullEmail = `${emailId}@${emailDomain}`;

    // validation
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

      success("수정 성공!");
      navi("/");
    } catch (err) {
      error("수정 실패");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async () => {
    try {
      await api.delete("/members/delete", {
        data: { memberNo: user.memberNo },
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

  // =========================
  // RENDER
  // =========================
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <img
          src={homeLogo}
          alt="home"
          style={styles.homeIcon}
          onClick={() => navi("/")}
        />
      </header>

      <div style={styles.container}>
        <div style={styles.logoArea}>
          <h1 style={styles.logo}>
            Plant
            <br />
            Plants
          </h1>
        </div>

        <div style={styles.content}>
          <div style={styles.path}>마이페이지 &gt; 내 정보 수정</div>

          {/* PROFILE */}
          <div style={styles.profileArea}>
            <img src={profileImg} alt="profile" style={styles.profileImage} />

            <div>
              <div style={styles.id}>
                {user?.memberId ? (
                  <span>{user.memberId} 님 반갑습니다!</span>
                ) : (
                  <span>아이디 세션이 만료되었습니다.</span>
                )}
              </div>

              <div style={styles.nameRow}>
                {isEditingName ? (
                  <input
                    style={styles.nameInput}
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <h2 style={styles.name}>{memberName}</h2>
                )}

                <button
                  style={styles.editButton}
                  onClick={() => setIsEditingName(!isEditingName)}
                >
                  {isEditingName ? "✔" : "✎"}
                </button>
              </div>

              <button style={styles.removeBtn}>🗑 Remove</button>
            </div>
          </div>

          {/* FORM */}
          <div style={styles.form}>
            <label>비밀번호</label>
            {pwdError && <span style={styles.notice}>{pwdError}</span>}
            <input
              type="password"
              style={styles.input}
              value={memberPwd}
              onChange={(e) => setMemberPwd(e.target.value)}
              placeholder="비밀번호 (영문, 숫자 6~15자)"
            />

            <label>비밀번호 확인</label>
            {pwdConfirmError && (
              <span style={styles.notice}>{pwdConfirmError}</span>
            )}
            <input
              type="password"
              style={styles.input}
              value={memberPwdConfirm}
              onChange={(e) => setMemberPwdConfirm(e.target.value)}
              placeholder="비밀번호 확인"
            />

            <label>이메일</label>
            <div style={styles.emailRow}>
              <input
                style={styles.emailInput}
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />

              <span>@</span>

              <select
                style={styles.select}
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
              >
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
              </select>
            </div>
          </div>

          {/* BUTTONS */}
          <div style={styles.buttonArea}>
            <button style={styles.edit} onClick={handleEditSubmit}>
              수정하기
            </button>
            <button style={styles.withdraw} onClick={openDeletePopup}>
              탈퇴하기
            </button>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
