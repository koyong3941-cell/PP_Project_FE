import React from "react";

const AdminModal = ({
  modalType,
  onClose,
  form = {},
  setForm = () => {},
  formError = "",
  onAdd = () => {},
  onDelete,
  onRestore,
  selectedCount = 0,
}) => {
  if (!modalType) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: "30px 40px",
          borderRadius: "12px",
          width: modalType === "add" ? "420px" : "380px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==================== 관리자 추가 ==================== */}
        {modalType === "add" && (
          <>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              관리자를 추가하시겠습니까?
            </h3>

            {formError && (
              <p
                style={{
                  color: "#ff3b30",
                  fontSize: "14px",
                  marginBottom: "12px",
                  textAlign: "center",
                }}
              >
                {formError}
              </p>
            )}

            <input
              type="text"
              placeholder="닉네임 (6~20자)"
              value={form.memberName}
              onChange={(e) => setForm({ ...form, memberName: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />
            <input
              type="text"
              placeholder="아이디 (6~20자)"
              value={form.memberId}
              onChange={(e) => setForm({ ...form, memberId: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />
            <input
              type="password"
              placeholder="비밀번호 (숫자, 특수기호 포함 6~20자)"
              value={form.memberPwd}
              onChange={(e) => setForm({ ...form, memberPwd: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />
            <input
              type="email"
              placeholder="이메일 (@sitename.com)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                marginBottom: "24px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />

            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <button
                onClick={onAdd}
                style={{
                  padding: "12px 48px",
                  background: "#111",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                추가
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: "12px 48px",
                  background: "#ff3b30",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
            </div>
          </>
        )}

        {/* ==================== 삭제 확인 ==================== */}
        {modalType === "delete" && (
          <>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "30px",
                fontSize: "18px",
              }}
            >
              회원을 탈퇴시키겠습니까?
            </h3>
            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <button
                onClick={onClose}
                style={{
                  padding: "12px 48px",
                  background: "#111",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                onClick={onDelete}
                style={{
                  padding: "12px 48px",
                  background: "#ff3b30",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                삭제
              </button>
            </div>
          </>
        )}

        {/* ==================== 복구 확인 ==================== */}
        {modalType === "restore" && (
          <>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "30px",
                fontSize: "18px",
              }}
            >
              회원을 복구시키겠습니까?
            </h3>
            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <button
                onClick={onClose}
                style={{
                  padding: "12px 48px",
                  background: "#111",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                onClick={onRestore}
                style={{
                  padding: "12px 48px",
                  background: "#ff3b30",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                복구
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminModal;
