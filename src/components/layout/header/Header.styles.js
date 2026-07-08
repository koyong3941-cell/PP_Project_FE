export const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    backgroundColor: "#1a2e24",
    color: "#ffffff",
    height: "90px",
    width: "100%",
    flexShrink: 0,
    zIndex: 1100, // 사이드메뉴(1000)보다 높게 설정
    position: "relative", // z-index가 작동하려면 필요
  },
  leftSection: { display: "flex", alignItems: "center", gap: "20px" },
  menuIcon: {
    fontSize: "2.7vw",
    cursor: "pointer",
    transform: "translate(0px, -3px)",
  },
  logo: {
    width: "155px",
    height: "105px",
    transform: "translate(-35px, 3px)",
    cursor: "pointer",
    clipPath: "circle(40px at 50% 50%)",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    flex: "1",
    maxWidth: "1400px",
    margin: "0 40px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    overflow: "hidden",
    height: "45px",
    transform: "translate(-65px, 0px)",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "15px",
    padding: "0 14px",
  },
  searchButton: {
    width: "48px",
    border: "none",
    background: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    transform: "translate(0px, 3px)",
  },
  userSection: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transform: "translate(-45px, 0px)",
  },
  userBadge: {
    backgroundColor: "#0f1110",
    color: "#fff",
    padding: "10px 35px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  userName: { color: "#fff" },
  profileImg: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  arrow: {
    color: "#8b948d",
    fontSize: "18px", // 크기 조절
    display: "flex", // 정렬 보조
    transition: "transform 0.3s",
  },
  selectWrapper: { width: "120px" },
  // 사이드 메뉴
  sideMenu: {
    position: "absolute",
    top: "90px",
    left: "20px",
    height: "700px",
    width: "440px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    padding: "20px 0", // 상단 여백 추가
    display: "flex",
    flexDirection: "column",
  },

  // 신규: 상단 로그인 안내 영역
  loginBanner: {
    padding: "0 20px 20px 20px",
    borderBottom: "1px solid #eeeeee", // 구분선
    marginBottom: "20px",
    fontSize: "18px",
    color: "#333",
    cursor: "pointer",
  },
  // 사이드 메뉴 닫기 버튼용
  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
    fontSize: "20px",
  },
  // 추가된 드롭다운 스타일
  dropdownItem: {
    padding: "20px 20px",
    textDecoration: "none",
    color: "#000000", // 검은색 텍스트
    fontSize: "28px", // 이미지처럼 큰 폰트 크기
    fontWeight: "400",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: "calc(100% + 10px)",
    right: "0",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "8px 0",
    display: "flex",
    flexDirection: "column",
    width: "160px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
  },
  dropdownItem: {
    padding: "20px 20px",
    textDecoration: "none",
    color: "#000000", // 검은색 텍스트
    fontSize: "18px", // 이미지처럼 큰 폰트 크기
    fontWeight: "400",
    cursor: "pointer",
  },
  sideBarBanner: {
    //사이드 바 배너
    color: "#000000",
    margin: 0, // p 태그의 기본 여백 제거
    fontSize: "45px", // 배너 텍스트 크기
    fontWeight: "700", // 굵게
    padding: "20px", // 배너 내부 여백
    marginBottom: "15px",
  },
};

export const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
    height: "40px",
    border: "none",
    borderRight: "1px solid #ddd",
    borderRadius: "6px 0 0 6px",
    backgroundColor: "#fff",
    boxShadow: "none",
    cursor: "pointer",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 12px",
    fontWeight: 700,
    fontSize: "14px",
  }),
  singleValue: (provided) => ({ ...provided, color: "#333" }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#666",
    padding: "0 8px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    borderRadius: "6px",
    overflow: "hidden",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f2f2f2" : "#fff",
    color: "#333",
    cursor: "pointer",
    fontSize: "14px",
  }),
};
