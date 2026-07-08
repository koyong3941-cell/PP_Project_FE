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

  useEffect(() => {
    api
      .get(`/notices?page=${page}`)
      .then((result) => {
        if (result.data && result.data.data) {
          setFindNoticeAll(result.data.data.content);
          setTotalPages(result.data.data.totalPages);
        }
      })
      .catch((err) => console.error("공지사항 로딩 실패:", err));
  }, [page]);

  return (
    <div style={styles.container}>
      <div style={styles.top}>
        <h2>공지사항</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={styles.searchBox}>
            <Search size={16} />
            <input style={styles.input} type="text" placeholder="검색..." />
          </div>

          <button style={styles.button}>
            <Filter size={16} />
            필터
          </button>
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
          {findNoticeAll.map((notice) => (
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
