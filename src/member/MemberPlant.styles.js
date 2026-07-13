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
    width: "250px",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#fafafa",
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: "12px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "0 10px",
  },
  category: {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "2px 8px",
    fontSize: "12px",
  },
  title: {
    borderBottom: "1px solid #eee",
    padding: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  link: {
    color: "#333",
    textDecoration: "none",
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

  //페이징 처리----------------------------------------------------------------
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
    backgroundColor: "#fff",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  pageButtonHover: {
    backgroundColor: "#a8a8a8",
  },
  activePageHover: {
    backgroundColor: "#777777",
  },
  //페이징 처리----------------------------------------------------------------

  //뷰 토글(리스트/그리드) 처리---------------------------------------------
  viewToggleGroup: {
    display: "flex",
    border: "1px solid #ddd",
    borderRadius: "6px",
    overflow: "hidden",
  },
  viewToggleBtn: {
    padding: "6px 10px",
    border: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  viewToggleBtnActive: {
    backgroundColor: "#f3f4f6",
  },
  //뷰 토글(리스트/그리드) 처리---------------------------------------------

  //대/중/소 수량 처리-------------------------------------------------------
  sizeCount: {
    textAlign: "center",
  },
  //대/중/소 수량 처리-------------------------------------------------------

  //수정/삭제 버튼 처리-------------------------------------------------------
  actionCell: {
    borderBottom: "1px solid #eee",
    padding: "12px",
    whiteSpace: "nowrap",
  },
  actionGroup: {
    display: "flex",
    gap: "6px",
  },
  editButton: {
    backgroundColor: "#22c3c3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "6px 12px",
    fontSize: "12px",
    cursor: "pointer",
  },
  editButtonHover: {
    backgroundColor: "#1aa8a8",
  },
  deleteButton: {
    backgroundColor: "#f0413e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "6px 12px",
    fontSize: "12px",
    cursor: "pointer",
  },
  deleteButtonHover: {
    backgroundColor: "#d6302d",
  },
  //수정/삭제 버튼 처리-------------------------------------------------------

  //그리드 뷰 처리---------------------------------------------------------
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  gridCard: {
    display: "block",
    color: "inherit",
  },
  gridImageWrap: {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
    position: "relative",
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
    gap: "10px",
    fontSize: "12px",
    color: "#888",
  },
  gridActionGroup: {
    display: "flex",
    gap: "6px",
    marginTop: "10px",
  },
  gridEditButton: {
    flex: 1,
    backgroundColor: "#22c3c3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 0",
    fontSize: "12px",
    cursor: "pointer",
  },
  gridDeleteButton: {
    flex: 1,
    backgroundColor: "#f0413e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 0",
    fontSize: "12px",
    cursor: "pointer",
  },
  //그리드 뷰 처리---------------------------------------------------------

  empty: {
    textAlign: "center",
    padding: "60px 0",
    color: "#999",
  },
};
