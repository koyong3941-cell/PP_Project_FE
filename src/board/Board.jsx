import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { styles } from "./Board.styles";
import { useAuth } from "../context/AuthContext";
import { useAlertify } from "../hooks/useAlertify";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Board = () => {
  const [findBoardAll, setFindBoardAll] = useState([]);
  const { user } = useAuth();
  const navi = useNavigate();
  const { success, error } = useAlertify();
  const [showFilter, setShowFilter] = useState(false);
  const [searchType, setSearchType] = useState("all");
  const [filterName, setFilterName] = useState("필터");
  const [keyword, setKeyword] = useState("");
  const filters = [
    { label: "전체", value: "all" },
    { label: "작성자", value: "writer" },
    // { label: "카테고리", value: "category" },
    { label: "제목", value: "title" },
  ];

  // 페이징 처리 부분--------------------------------------------------
  const [page, setPage] = useState(0); // Spring 백엔드가 0번 페이지부터 시작함
  const [totalPages, setTotalPages] = useState(0);
  // const pagination = [1, 2, 3, 4, 5];
  const [hoveredButton, setHoveredButton] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const handleFirst = () => {
    setPage(0);
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // const [isSearching, setIsSearching] = useState(false);
  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };
  const handleLast = () => {
    if (totalPages > 0) {
      setPage(totalPages - 1);
    }
  };
  // --------------------------------------------------------------------------------
  const handleSearch = async () => {
    try {
      setSearchMode(true);
      setPage(0);

      const result = await api.get("/boards/search", {
        params: {
          page: 0,
          keyword,
          target: searchType,
        },
      });

      setFindBoardAll(result.data.data.content);
      setTotalPages(result.data.data.totalPages);
    } catch (err) {
      console.error("검색 실패:", err);
      error("검색에 실패했습니다.");
    }
  };

  const fetchBoard = async () => {
    const result = await api.get(`/boards?page=${page}`);

    setFindBoardAll(result.data.data.content);
    setTotalPages(result.data.data.totalPages);
  };

  const fetchSearchBoard = async () => {
    const result = await api.get("/boards/search", {
      params: {
        page,
        keyword,
        target: searchType,
      },
    });

    setFindBoardAll(result.data.data.content);
    setTotalPages(result.data.data.totalPages);
  };

  useEffect(() => {
    if (searchMode) {
      fetchSearchBoard();
    } else {
      fetchBoard();
    }
  }, [page, searchMode]);

  return (
    <div style={styles.container}>
      <div style={styles.top}>
        <h2>유저 커뮤니티</h2>
        <div style={{ display: "flex", gap: "10px", position: "relative" }}>
          <div style={styles.searchBox}>
            <Search size={16} />
            <input
              style={styles.input}
              type="text"
              placeholder="게시글 검색..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>

          <button
            style={styles.button}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <Filter size={16} />
            {filterName}
          </button>

          {showFilter && (
            <div style={styles.dropdown}>
              {filters.map((item) => (
                <div
                  key={item.value}
                  style={{
                    ...styles.dropdownItem,
                    backgroundColor:
                      searchType === item.value ? "#f1f5f9" : "white",
                  }}
                  onClick={() => {
                    setSearchType(item.value);

                    if (item.value === "all") {
                      setFilterName("필터");
                    } else {
                      setFilterName(item.label);
                    }

                    setShowFilter(false);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          style={styles.button}
          onClick={() => {
            if (!user) {
              navi("/login");
              error("로그인이 필요합니다.");
              return;
            }
            navi("/board/write");
          }}
        >
          게시글 작성
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>게시글 번호</th>
            <th style={styles.th}>제목</th>
            <th style={styles.th}>카테고리</th>
            <th style={styles.th}>조회수</th>
            <th style={styles.th}>작성자</th>
            <th style={styles.th}>좋아요</th>
            <th style={styles.th}>날짜</th>
          </tr>
        </thead>
        <tbody>
          {findBoardAll.map((board) => (
            <tr key={board.boardNo}>
              <td style={styles.td}>{board.boardNo}</td>
              <td style={styles.title}>
                <Link to={`/board/${board.boardNo}`} style={styles.link}>
                  {board.boardTitle}[{board.commentCount}]
                </Link>
              </td>
              <td>
                <span style={styles.category}>{board.categoryName}</span>
              </td>

              <td style={styles.td}>{board.count}</td>
              <td style={styles.writer}>
                <img
                  src={`http://localhost${board.profileImage || "/uploads/default/profile.png"}`}
                  alt={board.memberName}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                {board.memberName}
              </td>

              <td style={styles.td}>{board.likeCount}</td>
              <td style={styles.td}>{board.createDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          style={{
            ...styles.pageButton,
            ...(hoveredButton === "first" ? styles.pageButtonHover : {}),
          }}
          onClick={handleFirst}
          onMouseEnter={() => setHoveredButton("first")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <ChevronLeft size={15} />
          <ChevronLeft size={15} />
        </button>

        <button
          style={{
            ...styles.pageButton,
            ...(hoveredButton === "prev" ? styles.pageButtonHover : {}),
          }}
          onClick={handlePrevious}
          onMouseEnter={() => setHoveredButton("prev")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <ChevronLeft size={15} />
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              style={{
                ...styles.pageButton,
                ...(pageNum === page + 1 ? styles.activePage : {}),
                ...(hoveredButton === `page-${pageNum}`
                  ? styles.pageButtonHover
                  : {}),
              }}
              onClick={() => setPage(pageNum - 1)}
              onMouseEnter={() => setHoveredButton(`page-${pageNum}`)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {pageNum}
            </button>
          ),
        )}

        <button
          style={{
            ...styles.pageButton,
            ...(hoveredButton === "next" ? styles.pageButtonHover : {}),
          }}
          onClick={handleNext}
          onMouseEnter={() => setHoveredButton("next")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Next
          <ChevronRight size={15} />
        </button>

        <button
          style={{
            ...styles.pageButton,
            ...(hoveredButton === "last" ? styles.pageButtonHover : {}),
          }}
          onClick={handleLast}
          onMouseEnter={() => setHoveredButton("last")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <ChevronRight size={15} />
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default Board;
