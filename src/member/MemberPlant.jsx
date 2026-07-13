import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
} from "lucide-react";
import api from "../api/axios";
import { styles } from "./MemberPlant.styles";
import { error, success } from "alertifyjs";

const DEFAULT_PLANT_IMAGE = "/uploads/plant/plant.png";

const buildImageSrc = (imgPath, saveName) => {
  if (!imgPath || !saveName) {
    return `http://localhost${DEFAULT_PLANT_IMAGE}`;
  }
  const normalizedPath = imgPath.endsWith("/") ? imgPath : `${imgPath}/`;
  return `http://localhost${normalizedPath}${saveName}`;
};

const MemberPlant = () => {
  const navigate = useNavigate();

  const [myPlantAll, setMyPlantAll] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // { memberNo, plantNo }
  const [editForm, setEditForm] = useState({
    smallPlant: 0,
    middlePlant: 0,
    bigPlant: 0,
  });
  const [viewMode, setViewMode] = useState("list");
  const [page, setPage] = useState(0); // Spring 백엔드가 0번 페이지부터 시작함
  const [totalPages, setTotalPages] = useState(page + 3);

  const [hoveredButton, setHoveredButton] = useState(null);

  const handleFirst = () => setPage(0);
  const handlePrevious = () => {
    if (page >= 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };
  const handleLast = () => setPage(totalPages - 1);
  // --------------------------------------------------------------------------------

  const fetchMyPlantList = () => {
    api
      .get(`/mypage/plantlist?page=${page}`)
      .then((result) => {
        console.log(result.data);
        setMyPlantAll(result.data.data.content);
        setTotalPages(result.data.data.totalPages);
      })
      .catch((err) => console.error("보유 식물 목록 로딩 실패:", err));
  };

  useEffect(() => {
    fetchMyPlantList();
  }, [page]);
  // plantNo나 plantName이 없는 빈 데이터(placeholder row)는 제외
  const validPlantList = myPlantAll.filter(
    (plant) => plant && plant.plantNo != null && plant.plantName,
  );
  const handleEdit = (plant) => {
    setEditTarget({ memberNo: plant.memberNo, plantNo: plant.plantNo });
    setEditForm({
      smallPlant: plant.smallPlant ?? 0,
      middlePlant: plant.middlePlant ?? 0,
      bigPlant: plant.bigPlant ?? 0,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditTarget(null);
  };

  const handleSaveEdit = () => {
    if (!editTarget) return;
    const { memberNo, plantNo } = editTarget;

    const body = {
      memberNo,
      plantNo,
      smallPlant: editForm.smallPlant,
      middlePlant: editForm.middlePlant,
      bigPlant: editForm.bigPlant,
    };

    api
      .patch(`/members/${memberNo}/plants/${plantNo}`, body)
      .then(() => {
        handleCloseEditModal();
        fetchMyPlantList();
        success("수정 성공!");
      })
      .catch((err) => console.error("식물 수정 실패:", err));
  };

  const handleDelete = (memberNo, plantNo) => {
    if (!window.confirm("이 식물을 삭제하시겠습니까?")) return;

    api
      .delete(`/members/${memberNo}/plants/${plantNo}`)
      .then(() => {
        fetchMyPlantList();
        success("삭제 성공!");
      })
      .catch((err) => console.error("식물 삭제 실패:", err));
  };

  return (
    <div style={styles.container}>
      <div style={styles.top}>
        <h2>보유 식물 리스트</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={styles.searchBox}>
            <Search size={16} />
            <input
              style={styles.input}
              type="text"
              placeholder="식물 검색..."
            />
          </div>
          <button style={styles.button}>
            <Filter size={16} />
            필터
          </button>
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

      {validPlantList.length === 0 ? (
        <div style={styles.empty}>보유한 식물이 없습니다.</div>
      ) : viewMode === "list" ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>식물 번호</th>
              <th style={styles.th}>식물이름</th>
              <th style={styles.th}>분류</th>
              <th style={styles.th}>대</th>
              <th style={styles.th}>중</th>
              <th style={styles.th}>소</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {validPlantList.map((plant) => (
              <tr key={plant.plantNo}>
                <td style={styles.td}>{plant.plantNo}</td>
                <td style={styles.title}>{plant.plantName}</td>
                <td style={styles.td}>
                  <span style={styles.category}>{plant.classification}</span>
                </td>
                <td style={{ ...styles.td, ...styles.sizeCount }}>
                  {plant.bigPlant ?? 0}
                </td>
                <td style={{ ...styles.td, ...styles.sizeCount }}>
                  {plant.middlePlant ?? 0}
                </td>
                <td style={{ ...styles.td, ...styles.sizeCount }}>
                  {plant.smallPlant ?? 0}
                </td>
                <td style={styles.actionCell}>
                  <div style={styles.actionGroup}>
                    <button
                      style={{
                        ...styles.editButton,
                        ...(hoveredButton === `edit-${plant.plantNo}`
                          ? styles.editButtonHover
                          : {}),
                      }}
                      onClick={() => handleEdit(plant)}
                      onMouseEnter={() =>
                        setHoveredButton(`edit-${plant.plantNo}`)
                      }
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      수정
                    </button>
                    <button
                      style={{
                        ...styles.deleteButton,
                        ...(hoveredButton === `delete-${plant.plantNo}`
                          ? styles.deleteButtonHover
                          : {}),
                      }}
                      onClick={() =>
                        handleDelete(plant.memberNo, plant.plantNo)
                      }
                      onMouseEnter={() =>
                        setHoveredButton(`delete-${plant.plantNo}`)
                      }
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={styles.gridContainer}>
          {validPlantList.map((plant) => (
            <div key={plant.plantNo} style={styles.gridCard}>
              <div style={styles.gridImageWrap}>
                <img
                  src={buildImageSrc(plant.imgPath, plant.saveName)}
                  alt={plant.plantName}
                  style={styles.gridImage}
                />
              </div>
              <div style={styles.gridInfo}>
                <div style={styles.gridName}>{plant.plantName}</div>
                <div style={styles.gridMeta}>
                  <span style={styles.category}>{plant.classification}</span>
                  <span>
                    대 {plant.bigPlant ?? 0} · 중 {plant.middlePlant ?? 0} · 소{" "}
                    {plant.smallPlant ?? 0}
                  </span>
                </div>
                <div style={styles.gridActionGroup}>
                  <button
                    style={styles.gridEditButton}
                    onClick={() => handleEdit(plant)}
                  >
                    수정
                  </button>
                  <button
                    style={styles.gridDeleteButton}
                    onClick={() => handleDelete(plant.memberNo, plant.plantNo)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
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

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
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
      {showEditModal && editTarget && (
        <div style={styles.modalOverlay} onClick={handleCloseEditModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalLeft}>
              <div style={styles.modalTitle}>식물 수정</div>
              <div style={styles.modalDesc}>해당 식물을 수정해 보세요.</div>
            </div>
            <div style={styles.modalSizeGroup}>
              <div style={styles.modalSizeLabel}>대</div>
              <div style={styles.modalSizeInputRow}>
                <span style={styles.modalSizeRange}>
                  크기
                  <br />
                  20~30cm
                </span>
                <input
                  type="number"
                  min={0}
                  style={styles.modalSizeInput}
                  value={editForm.bigPlant}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      bigPlant: Number(e.target.value),
                    })
                  }
                />
                <span style={styles.modalUnit}>개</span>
              </div>
            </div>

            <div style={styles.modalSizeGroup}>
              <div style={styles.modalSizeLabel}>중</div>
              <div style={styles.modalSizeInputRow}>
                <span style={styles.modalSizeRange}>
                  크기
                  <br />
                  10~20cm
                </span>
                <input
                  type="number"
                  min={0}
                  style={styles.modalSizeInput}
                  value={editForm.middlePlant}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      middlePlant: Number(e.target.value),
                    })
                  }
                />
                <span style={styles.modalUnit}>개</span>
              </div>
            </div>

            <div style={styles.modalSizeGroup}>
              <div style={styles.modalSizeLabel}>소</div>
              <div style={styles.modalSizeInputRow}>
                <span style={styles.modalSizeRange}>
                  크기
                  <br />
                  0~10cm
                </span>
                <input
                  type="number"
                  min={0}
                  style={styles.modalSizeInput}
                  value={editForm.smallPlant}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      smallPlant: Number(e.target.value),
                    })
                  }
                />
                <span style={styles.modalUnit}>개</span>
              </div>
            </div>

            <button style={styles.modalSubmitButton} onClick={handleSaveEdit}>
              변경하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberPlant;
