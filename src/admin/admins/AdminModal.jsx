import React from "react";

const AdminModal = ({
  modalType,
  onClose,
  onDelete,
  onRestore,
  onAdd,
  selectedCount = 0,

  // ===== 커스텀 문구 (우선순위 높음) =====
  entityName = "항목", // "회원" | "게시글" | "카테고리" | "관리자" 등

  // 삭제
  deleteTitle,
  deleteMessage,
  deleteConfirmText = "삭제",

  // 복구
  restoreTitle,
  restoreMessage,
  restoreConfirmText = "복구",

  // 추가 (관리자 추가용 form)
  form,
  setForm,
  formError,
  addTitle = "관리자 추가",
}) => {
  if (!modalType) return null;

  // ===== 기본 문구 생성 =====
  const getDeleteTitle = () => deleteTitle || `${entityName} 삭제`;
  const getDeleteMessage = () =>
    deleteMessage ||
    `선택한 ${selectedCount}개의 ${entityName}을(를) 정말 삭제하시겠습니까?`;

  const getRestoreTitle = () => restoreTitle || `${entityName} 복구`;
  const getRestoreMessage = () =>
    restoreMessage ||
    `선택한 ${selectedCount}개의 ${entityName}을(를) 복구하시겠습니까?`;

  // 모달 바깥 클릭 시 닫기
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // ===== 공통 스타일 =====
  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "28px",
    width: "420px",
    maxWidth: "90%",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
  };

  const titleStyle = {
    margin: "0 0 16px 0",
    fontSize: "18px",
    fontWeight: 600,
  };

  const messageStyle = {
    margin: "0 0 24px 0",
    color: "#555",
    fontSize: "15px",
    lineHeight: 1.5,
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "8px",
  };

  const cancelBtnStyle = {
    padding: "8px 18px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#f5f5f5",
    cursor: "pointer",
    fontSize: "14px",
  };

  const confirmBtnStyle = (color = "#333") => ({
    padding: "8px 18px",
    border: "none",
    borderRadius: "6px",
    background: color,
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  });

  // ==================== DELETE 모달 ====================
  if (modalType === "delete") {
    return (
      <div style={backdropStyle} onClick={handleBackdropClick}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <h3 style={titleStyle}>{getDeleteTitle()}</h3>
          <p style={messageStyle}>
            {getDeleteMessage()}
            {entityName !== "카테고리" && (
              <span
                style={{
                  display: "block",
                  marginTop: "8px",
                  color: "#d32f2f",
                  fontSize: "13px",
                }}
              ></span>
            )}
            {entityName === "카테고리" && (
              <span
                style={{
                  display: "block",
                  marginTop: "8px",
                  color: "#d32f2f",
                  fontSize: "13px",
                }}
              >
                (삭제된 카테고리는 복구할 수 없습니다)
              </span>
            )}
          </p>
          <div style={buttonGroupStyle}>
            <button style={cancelBtnStyle} onClick={onClose}>
              취소
            </button>
            <button style={confirmBtnStyle("#d32f2f")} onClick={onDelete}>
              {deleteConfirmText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== RESTORE 모달 ====================
  if (modalType === "restore") {
    return (
      <div style={backdropStyle} onClick={handleBackdropClick}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <h3 style={titleStyle}>{getRestoreTitle()}</h3>
          <p style={messageStyle}>{getRestoreMessage()}</p>
          <div style={buttonGroupStyle}>
            <button style={cancelBtnStyle} onClick={onClose}>
              취소
            </button>
            <button style={confirmBtnStyle("#28a745")} onClick={onRestore}>
              {restoreConfirmText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== ADD 모달 (관리자 추가용 form) ====================
  if (modalType === "add") {
    if (!form || !setForm) return null;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
      <div style={backdropStyle} onClick={handleBackdropClick}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <h3 style={titleStyle}>{addTitle}</h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div>
              <label style={{ fontSize: "13px", color: "#555" }}>
                관리자 ID
              </label>
              <input
                name="memberId"
                value={form.memberId || ""}
                onChange={handleChange}
                placeholder="아이디 입력"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  marginTop: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#555" }}>
                관리자 이름
              </label>
              <input
                name="memberName"
                value={form.memberName || ""}
                onChange={handleChange}
                placeholder="이름 입력"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  marginTop: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#555" }}>
                비밀번호
              </label>
              <input
                type="password"
                name="memberPwd"
                value={form.memberPwd || ""}
                onChange={handleChange}
                placeholder="비밀번호 입력"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  marginTop: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#555" }}>이메일</label>
              <input
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                placeholder="이메일 입력"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  marginTop: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {formError && (
            <p
              style={{ color: "#d32f2f", fontSize: "13px", margin: "12px 0 0" }}
            >
              {formError}
            </p>
          )}

          <div style={{ ...buttonGroupStyle, marginTop: "24px" }}>
            <button style={cancelBtnStyle} onClick={onClose}>
              취소
            </button>
            <button style={confirmBtnStyle("#333")} onClick={onAdd}>
              추가
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminModal;
