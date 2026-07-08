import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axios";
import { styles } from "./PlantSearch.styles";

const PlantSearch = () => {
  const [findPlantAll, setFindPlantAll] = useState([]);

  // 페이징 처리 부분--------------------------------------------------
  const [page, setPage] = useState(0); // Spring 백엔드가 0번 페이지부터 시작함
  const [totalPages, setTotalPages] = useState(page + 3);
  const pagination = [1, 2, 3, 4, 5];
  const [hoveredButton, setHoveredButton] = useState(null);
  const handleFirst = () => setPage(0);
  const handlePrevious = () => {
    if (page >= 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handleLast = () => setPage(totalPages);
  // --------------------------------------------------------------------------------
  useEffect(() => {
    api
      .get(`/plantSreachs?page=${page}`)
      .then((result) => {
        console.log(result);
        if (result.data && result.data.data) {
          setFindPlantAll(result.data.data);
        }
      })
      .catch((err) => console.error("게시글 로딩 실패:", err));
  }, [page]);
  return (
    <div style={styles.container}>
      <div style={styles.top}>
        <h2>식물 목록</h2>
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

        <Link to="/notice/write">
          <button style={styles.button}>게시글 작성</button>
        </Link>
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
                  src={`http://localhost${notice.profileImage || "/uploads/default/profile.png"}`}
                  alt={notice.memberName}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
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

        {pagination.map((pageNum) => (
          <button
            key={pageNum}
            style={{
              ...styles.pageButton,
              ...(pageNum === page + 1 ? styles.activePage : {}),
              ...(hoveredButton === `page-${pageNum}` && pageNum !== page + 1
                ? styles.pageButtonHover
                : {}),
              ...(hoveredButton === `page-${pageNum}` && pageNum === page + 1
                ? styles.activePageHover
                : {}),
            }}
            onClick={() => setPage(pageNum - 1)}
            onMouseEnter={() => setHoveredButton(`page-${pageNum}`)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {pageNum}
          </button>
        ))}

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

export default PlantSearch;
