const green = "#4fc3a1";
const red = "#e24b4a";

export const detailStyles = {
  container: { maxWidth: "900px", margin: "0 auto", padding: "30px" },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  pageTitle: { fontSize: "22px", fontWeight: "500" },
  topBtns: { display: "flex", gap: "8px" },
  btnEdit: {
    padding: "7px 16px",
    border: "none",
    borderRadius: "6px",
    background: green,
    color: "#fff",
    fontSize: "13px",
    cursor: "pointer",
  },
  btnDel: {
    padding: "7px 16px",
    border: "none",
    borderRadius: "6px",
    background: red,
    color: "#fff",
    fontSize: "13px",
    cursor: "pointer",
  },
  postTitle: { fontSize: "15px", fontWeight: "500", marginBottom: "12px" },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #eee",
  },
  avatar: { width: "32px", height: "32px", borderRadius: "50%" },
  writerName: { fontSize: "14px", fontWeight: "500" },
  metaDate: { fontSize: "13px", color: "#999" },
  postImg: {
    display: "block",
    marginBottom: "20px",
    borderRadius: "8px",
    maxWidth: "400px",
  },
  postBody: {
    fontSize: "14px",
    lineHeight: "1.8",
    marginBottom: "28px",
    color: "#333",
  },
  likeRow: { display: "flex", gap: "12px", marginBottom: "32px" },
  btnLike: {
    padding: "8px 24px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
  btnDislike: {
    padding: "8px 24px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #eee",
    marginBottom: "24px",
  },
  comment: {
    background: "#f3f4f6", // 연한 회색 배경
    borderRadius: "10px",
    padding: "14px 16px",
    marginBottom: "10px",
  },
  commentHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "6px",
  },
  cAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  cName: {
    fontWeight: "600",
    fontSize: "14px",
  },

  cCount: {
    marginLeft: "auto",
    fontSize: "13px",
    color: "#555",
  },
  cDate: {
    fontSize: "12px",
    color: "#999",
  },

  cActions: {
    display: "flex",
    gap: "6px",
  },
  cBtnEdit: {
    background: "#2dd4bf", // 청록색
    color: "#fff",
    border: "none",
    borderRadius: "999px", // 알약 모양
    padding: "4px 12px",
    fontSize: "12px",
    cursor: "pointer",
  },

  cBtnDel: {
    background: "#ef4444", // 빨간색
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "4px 12px",
    fontSize: "12px",
    cursor: "pointer",
  },
  cBody: { fontSize: "13px", color: "#555", paddingLeft: "36px" },
  inputArea: {
    border: `1px solid ${green}`,
    borderRadius: "8px",
    padding: "16px",
    marginTop: "24px",
  },
  cInputHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  cTextarea: {
    width: "100%",
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: "13px",
    fontFamily: "inherit",
    minHeight: "48px",
  },
  cSubmitRow: { display: "flex", justifyContent: "flex-end", marginTop: "8px" },
  btnSubmit: {
    padding: "7px 20px",
    background: green,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "20px",
    paddingBottom: "14px",
    borderBottom: "1px solid #eee",
  },
  metaWriter: { fontSize: "13px", fontWeight: "500", color: "#333" },
  metaDot: { fontSize: "13px", color: "#ccc" },
  metaDate: { fontSize: "13px", color: "#999" },
  cThumb: { fontSize: "13px", cursor: "pointer" },
};
