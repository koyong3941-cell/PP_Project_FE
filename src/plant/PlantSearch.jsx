import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
  List,
  LayoutGrid,
} from "lucide-react";
import api from "../api/axios";
import { styles } from "./PlantSearch.styles";

const StarRating = ({ value = 0 }) => (
  <div style={{ display: "flex", gap: "1px" }}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        color={i < value ? "#f59e0b" : "#d1d5db"}
        fill={i < value ? "#f59e0b" : "none"}
      />
    ))}
  </div>
);

const PlantSearch = () => {
  const [findPlantAll, setFindPlantAll] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [showFilter, setShowFilter] = useState(false);
  const [searchType, setSearchType] = useState("all");
  const [searchMode, setSearchMode] = useState(false);
  const [filterName, setFilterName] = useState("필터");
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(0); // Spring 백엔드가 0번 페이지부터 시작함
  const [totalPages, setTotalPages] = useState(page + 3);
  const pagination = [1, 2, 3, 4, 5];
  const [hoveredButton, setHoveredButton] = useState(null);

  const GRID_PAGE_SIZE = 9;
  const gridItems = findPlantAll;

  const handleFirst = () => setPage(0);
  const handlePrevious = () => {
    if (page >= 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handleLast = () => setPage(totalPages);
  // --------------------------------------------------------------------------------
  const filters = [
    { label: "전체", value: "all" },
    { label: "식물명", value: "plantName" },
    { label: "작성자", value: "writer" },
  ];

  const handleSearch = async () => {
    try {
      setSearchMode(true);
      setPage(0);

      const result = await api.get("/plants/search", {
        params: {
          page: 0,
          size,
          keyword,
          target: searchType,
        },
      });

      setFindPlantAll(result.data.data.content);
      setTotalPages(result.data.data.totalPages);
    } catch (err) {
      console.error("검색 실패:", err);
    }
  };

  const fetchPlant = async () => {
    const result = await api.get("/plants", {
      params: {
        page,
        size,
      },
    });

    setFindPlantAll(result.data.data.content);
    setTotalPages(result.data.data.totalPages);
  };

  const fetchSearchPlant = async () => {
    const result = await api.get("/plants/search", {
      params: {
        page,
        size,
        keyword,
        target: searchType,
      },
    });

    setFindPlantAll(result.data.data.content);
    setTotalPages(result.data.data.totalPages);
  };

  const size = viewMode === "grid" ? 9 : 10;
  useEffect(() => {
    if (searchMode) {
      fetchSearchPlant();
    } else {
      fetchPlant();
    }
  }, [page, viewMode, searchMode]);
  return (
    <div style={styles.container}>
      <div style={styles.top}>
        <h2>식물 목록</h2>
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

          <div style={styles.viewToggleGroup}>
            <button
              onClick={() => {
                setViewMode("list");
                setPage(0);
              }}
              style={{
                ...styles.viewToggleBtn,
                ...(viewMode === "list" ? styles.viewToggleBtnActive : {}),
              }}
            >
              <List size={16} />
            </button>

            <button
              onClick={() => {
                setViewMode("grid");
                setPage(0);
              }}
              style={{
                ...styles.viewToggleBtn,
                ...(viewMode === "grid" ? styles.viewToggleBtnActive : {}),
              }}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>
      {viewMode === "list" ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>식물 번호</th>
              <th style={styles.th}>식물이름</th>
              <th style={styles.th}>분류</th>
              <th style={styles.th}>별점</th>
              <th style={styles.th}>조회수</th>
              <th style={styles.th}>작성자</th>
              <th style={styles.th}>날짜</th>
            </tr>
          </thead>
          <tbody>
            {findPlantAll.map((plant) => (
              <tr key={plant.plantNo}>
                <td style={styles.td}>{plant.plantNo}</td>
                <td style={styles.title}>
                  <Link to={`/plants/${plant.plantNo}`} style={styles.link}>
                    {plant.plantName}
                  </Link>
                </td>
                <td style={styles.td}>
                  <span style={styles.category}>{plant.classification}</span>
                </td>
                <td style={styles.td}>
                  <StarRating value={plant.symptomLevel} />
                </td>
                <td style={styles.td}>{plant.count}</td>
                <td style={styles.writer}>
                  <img
                    src={`http://localhost${plant.profileImage || "/uploads/default/profile.png"}`}
                    alt={plant.memberName}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  {plant.memberName}
                </td>
                <td style={styles.td}>{plant.createDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={styles.gridContainer}>
          {gridItems.map((plant) => (
            <Link
              key={plant.plantNo}
              to={`/plants/${plant.plantNo}`}
              style={styles.gridCard}
            >
              <div style={styles.gridImageWrap}>
                <img
                  src={`http://localhost${plant.mainPlantImage || "/uploads/plant/plant.png"}`}
                  alt={plant.plantName}
                  style={styles.gridImage}
                />
              </div>
              <div style={styles.gridInfo}>
                <div style={styles.gridName}>{plant.plantName}</div>
                <div style={styles.gridMeta}>
                  <StarRating value={plant.symptomLevel} />
                  <span style={styles.gridCount}>{plant.count}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
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
