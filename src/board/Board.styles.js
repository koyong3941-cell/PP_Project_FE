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

  // 페이징 처리
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
    background: "#a8a8a8",
  },

  activePageHover: {
    backgroundColor: "#777777",
  },
};
