import { useState, useEffect } from "react";
import Select from "react-select";
import { FiChevronDown } from "react-icons/fi";
import logo from "../../../assets/logo.png";
import dummyprofile from "../../../assets/profile.jpg";
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
      logout(); // AuthContext 내에서 setUser(null)이 실행되므로 화면이 즉시 업데이트됨
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
            <div
              style={styles.dropdownItem}
              onClick={() => handleNavigation("/board/1")}
            >
              게시판 1
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleNavigation("/board/2")}
            >
              게시판 2
            </div>
            <div
              style={styles.dropdownItem}
              onClick={() => handleNavigation("/board/3")}
            >
              게시판 3
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

        <img src={dummyprofile} alt="User" style={styles.profileImg} />

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
