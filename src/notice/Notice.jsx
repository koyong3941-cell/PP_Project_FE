import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axios";
import { styles } from "./Notice.styles";

const Notice = () => {
  const [findNoticeAll, setFindNoticeAll] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hoveredButton, setHoveredButton] = useState(null);

  const [showFilter, setShowFilter] = useState(false);
  const [searchType, setSearchType] = useState("all");
  const [filterName, setFilterName] = useState("필터");
  const [keyword, setKeyword] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { label: "전체", value: "all" },
    { label: "작성자", value: "writer" },
    { label: "제목", value: "title" },
  ];

  const handleFirst = () => setPage(0);

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleLast = () => {
    if (totalPages > 0) {
      setPage(totalPages - 1);
    }
  };

  const handleSearch = async () => {
    try {
      setSearchMode(true);
      setPage(0);

      const result = await api.get("/notices/search", {
        params: {
          page: 0,
          keyword,
          target: selectedFilter,
        },
      });

      setFindNoticeAll(result.data.data || []);
      setTotalPages(1);
    } catch (err) {
      console.error("검색 실패:", err);
    }
  };

  const fetchNotice = async () => {
    try {
      const result = await api.get(`/notices?page=${page}`);

      setFindNoticeAll(result.data.data?.content || []);
      setTotalPages(result.data.data?.totalPages || 1);
    } catch (err) {
      console.error("공지 조회 실패:", err);
      setFindNoticeAll([]);
    }
  };

  const fetchSearchNotice = async () => {
    try {
      const result = await api.get("/notices/search", {
        params: {
          page,
          keyword,
          target: searchType,
        },
      });

      const data = result.data.data;

      if (Array.isArray(data)) {
        setFindNoticeAll(data);
        setTotalPages(1);
      } else {
        setFindNoticeAll(data?.content || []);
        setTotalPages(data?.totalPages || 1);
      }
    } catch (err) {
      console.error("검색 조회 실패:", err);
      setFindNoticeAll([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    if (searchMode) {
      fetchSearchNotice();
    } else {
      fetchNotice();
    }
  }, [page, searchMode]);

  return (
    <div style={styles.container}>
      <div style={styles.top}>
        <h2>공지사항</h2>

        <div style={{ display: "flex", gap: "10px", position: "relative" }}>
          <div style={styles.searchBox}>
            <Search size={16} />

            <input
              style={styles.input}
              type="text"
              placeholder="검색..."
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
                    setSelectedFilter(item.value);

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
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No.</th>
            <th style={styles.th}>제목</th>
            <th style={styles.th}>조회수</th>
            <th style={styles.th}>등록일</th>
            <th style={styles.th}>담당관리자</th>
          </tr>
        </thead>

        <tbody>
          {(findNoticeAll || []).map((notice) => (
            <tr key={notice.noticeNo}>
              <td style={styles.td}>{notice.noticeNo}</td>

              <td style={styles.title}>
                <Link to={`/notice/${notice.noticeNo}`} style={styles.link}>
                  {notice.noticeTitle}
                </Link>
              </td>

              <td style={styles.td}>{notice.noticeCount}</td>
              <td style={styles.td}>{notice.createDate}</td>

              <td style={styles.writer}>
                <img
                  src={`http://localhost${
                    notice.profileImage || "/uploads/default/profile.png"
                  }`}
                  alt={notice.memberName}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                {notice.memberName}
              </td>
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
                ...(hoveredButton === `page-${pageNum}` && pageNum !== page + 1
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

export default Notice;
