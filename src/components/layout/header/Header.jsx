import { useState, useEffect } from "react";
import Select from "react-select";
import { FiChevronDown } from "react-icons/fi";
import logo from "../../../assets/logo.png";
import defaultImg from "../../../assets/unknown.png";
import search from "../../../assets/search.png";
import { styles, customSelectStyles } from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAlertify } from "../../../hooks/useAlertify";

const options = [
  { value: "all", label: "All" },
  { value: "plant", label: "Plants" },
  { value: "schedule", label: "Schedules" },
  { value: "user", label: "Users" },
];

const Header = () => {
  const navi = useNavigate();
  const alertify = useAlertify();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. user가 있으면 로그인 상태 (자동으로 리렌더링 트리거됨)
  const isLoggedIn = !!user;
  const memberId = user?.memberId || "Guest";

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (path) => {
    setIsOpen(false);
    setIsMenuOpen(false);

    if (path === "/logout") {
      logout();
      navi("/");
    } else {
      navi(path);
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        <div style={styles.menuIcon} onClick={toggleMenu}>
          ☰
        </div>
        <img
          src={logo}
          alt="Plant Plant"
          style={styles.logo}
          onClick={() => handleNavigation("/")}
        />

        {isMenuOpen && (
          <div style={styles.sideMenu}>
            <div>
              <p style={styles.sideBarBanner}>
                Plant <br />
                &nbsp;&nbsp;&nbsp;Plants
              </p>
            </div>
            <div
              style={styles.loginBanner}
              onClick={() => {
                // 로그인 상태가 아닐 때만 /login으로 이동
                if (!user?.memberId) {
                  handleNavigation("/login");
                }
              }}
            >
              {user?.memberId ? (
                // 로그인 후 화면
                <span>{user.memberId} 님 반갑습니다!</span>
              ) : (
                // 로그인 전 화면
                <span>로그인 후 이용해 주시기 바랍니다. </span>
              )}
            </div>

            {/* 기존 게시판 항목들 */}
            <div
              style={styles.dropdownItem}
              onClick={() => handleNavigation("/board")}
            >
              유저 커뮤니티
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleNavigation("/mypage")}
            >
              마이 페이지
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleNavigation("/notice")}
            >
              공지사항
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleNavigation("/PlantSearch")}
            >
              식물 목록
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleNavigation("/admin")}
            >
              관리자 페이지
            </div>
          </div>
        )}
      </div>

      <div style={styles.searchContainer}>
        <div style={styles.selectWrapper}>
          <Select
            options={options}
            defaultValue={options[0]}
            isSearchable={false}
            styles={customSelectStyles}
          />
        </div>
        <input type="text" placeholder="Search..." style={styles.searchInput} />
        <button style={styles.searchButton}>
          <img src={search} alt="search" style={{ width: "24px" }} />
        </button>
      </div>

      <div style={styles.userSection}>
        <div
          style={{ ...styles.userBadge, cursor: "pointer" }}
          onClick={toggleDropdown}
        >
          <span style={styles.userName}>{memberId}</span>
          <FiChevronDown
            style={{
              ...styles.arrow,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>

        <img
          src={
            user?.delYn === "N" && user?.imgPath && user?.saveName
              ? `http://localhost${user.imgPath}${user.saveName}`
              : defaultImg
          }
          alt="User"
          style={styles.profileImg}
        />

        {isOpen && (
          <div style={styles.dropdownMenu}>
            {isLoggedIn ? (
              <>
                <div
                  style={styles.dropdownItem}
                  onClick={() => handleNavigation("/mypage")}
                >
                  마이페이지
                </div>
                <div
                  style={styles.dropdownItem}
                  onClick={() => handleNavigation("/profile-edit")}
                >
                  회원정보수정
                </div>
                <div
                  style={styles.dropdownItem}
                  onClick={() => handleNavigation("/logout")}
                >
                  로그아웃
                </div>
              </>
            ) : (
              <>
                <div
                  style={styles.dropdownItem}
                  onClick={() => handleNavigation("/signup")}
                >
                  회원가입
                </div>
                <div
                  style={styles.dropdownItem}
                  onClick={() => handleNavigation("/login")}
                >
                  로그인
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
