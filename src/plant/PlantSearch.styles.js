export const styles = {
  container: {
    width: "1200px",
    margin: "0 auto",
    padding: "30px",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  search: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "8px",
    fontSize: "14px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    borderBottom: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
    backgroundColor: "#fafafa",
  },

  td: {
    borderBottom: "1px solid #eee",
    padding: "12px",
    textAlign: "center",
    verticalAlign: "middle",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    width: "785px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "0 10px",
    height: "40px",
  },

  writer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    height: "40px",
    marginLeft: "55px",
  },

  category: {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "2px 8px",
    fontSize: "12px",
    marginLeft: "50px",
  },

  title: {
    borderBottom: "1px solid #eee",
    padding: "12px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "center",
  },

  link: {
    color: "#333",
    textDecoration: "none",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "30px",
  },

  activePage: {
    backgroundColor: "#333",
    color: "#fff",
  },

  pageButton: {
    border: "1px solid #ddd",
    background: "#fff",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },

  button: {
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  pageButtonHover: {
    backgroundColor: "#a8a8a8",
  },

  activePageHover: {
    backgroundColor: "#777777",
  },

  dropdown: {
    position: "absolute",
    top: "42px",
    right: "90px", // 뷰 토글 버튼 때문에 약간 왼쪽으로
    width: "120px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    zIndex: 100,
  },

  dropdownItem: {
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: "14px",
  },

  // ===== 리스트 / 그리드 토글 =====
  viewToggleGroup: {
    display: "flex",
    border: "1px solid #ddd",
    borderRadius: "6px",
    overflow: "hidden",
    height: "40px",
  },

  viewToggleBtn: {
    width: "40px",
    border: "none",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  viewToggleBtnActive: {
    backgroundColor: "#f3f4f6",
  },

  // ===== 그리드 =====
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },

  gridCard: {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },

  gridImageWrap: {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
  },

  gridImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  gridInfo: {
    marginTop: "10px",
  },

  gridName: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "4px",
  },

  gridMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  gridCount: {
    fontSize: "12px",
    color: "#888",
  },
};
