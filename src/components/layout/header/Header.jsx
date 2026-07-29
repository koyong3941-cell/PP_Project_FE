import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../../api/axios";
import logo from "../../../assets/logo.png";
import search from "../../../assets/search.png";
import defaultImg from "../../../assets/unknown.png";
import { useAuth } from "../../../context/AuthContext";
import { useAlertify } from "../../../hooks/useAlertify";
import { customSelectStyles, styles } from "./Header.styles";

const options = [
  { value: "all", label: "전체" },
  { value: "plantName", label: "식물명" },
  { value: "writer", label: "작성자" },
];

const Header = () => {
  const navi = useNavigate();
  const alertify = useAlertify();
  const { user, logout } = useAuth();

  const [searchType, setSearchType] = useState("all");
  const [keyword, setKeyword] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleSearch = async () => {
    if (!keyword.trim()) {
      return;
    }

    try {
      const result = await api.get("/plants/search", {
        params: {
          page: 0,
          keyword,
          target: searchType,
        },
      });

      navi("/PlantSearch", {
        state: {
          searchResult: result.data.data.content,
          totalPages: result.data.data.totalPages,
          keyword,
          searchType,
        },
      });
    } catch (err) {
      console.error(err);
      alertify.error("검색에 실패했습니다.");
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
                if (!user?.memberId) {
                  handleNavigation("/login");
                }
              }}
            >
              {user?.memberId ? (
                <span
                  onClick={() => {
                    handleNavigation("/mypage");
                  }}
                >
                  {user.memberId} 님 반갑습니다!
                </span>
              ) : (
                <span>로그인 후 이용해 주시기 바랍니다. </span>
              )}
            </div>

            <div
              style={styles.dropdownItem}
              onClick={() => handleNavigation("/board")}
            >
              유저 커뮤니티
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
            {user?.role === "ROLE_ADMIN" && (
              <div
                style={styles.dropdownItem}
                onClick={() => handleNavigation("/admin")}
              >
                관리자 페이지
              </div>
            )}
          </div>
        )}
      </div>

      <div style={styles.searchContainer}>
        <div style={styles.selectWrapper}>
          <Select
            options={options}
            value={options.find((o) => o.value === searchType)}
            isSearchable={false}
            styles={customSelectStyles}
            onChange={(option) => setSearchType(option.value)}
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button style={styles.searchButton} onClick={handleSearch}>
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
              ? `${user.imgPath}${user.saveName}`
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
