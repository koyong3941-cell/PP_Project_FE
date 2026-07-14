import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAlertify } from "../hooks/useAlertify";
import {
  AddButton,
  ButtonGroup,
  Container,
  DeleteButton,
  Header,
  Main,
  SearchInput,
  Select,
  Table,
  Title,
  Toolbar,
} from "./admin.style";
import AdminModal from "./admins/AdminModal";
import LowBars from "./Lowbars";
import Sidebars from "./Sidebars";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const alert = useAlertify();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  // 삭제 모달용
  const [modalType, setModalType] = useState(null);
  const [selectedNos, setSelectedNos] = useState([]);

  // ===== 카테고리 추가 모달용 =====
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [addError, setAddError] = useState("");
  const [adding, setAdding] = useState(false);

  const closeModal = () => {
    setModalType(null);
    setSelectedNos([]);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setCategoryName("");
    setAddError("");
  };

  // ==================== 데이터 불러오기 (검색/일반 통합) ====================
  const fetchCategories = async (
    page,
    searchKeyword = "",
    searchTarget = "",
  ) => {
    try {
      setLoading(true);

      const kw = searchKeyword || "";
      let url = "/admins/category";
      let params = { page, size };

      if (kw.trim()) {
        url = "/admins/category/search";
        params.keyword = kw.trim();
        if (searchTarget) {
          params.target = searchTarget;
        }
      }

      const res = await api.get(url, { params });
      const data = res.data.data;

      setCategories(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        alert.error("관리자 권한이 없습니다.");
        navi("/");
      } else {
        alert.error("데이터를 불러오는데 실패했습니다.");
      }
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================== 초기 로딩 + 페이지 변경 시 ====================
  useEffect(() => {
    fetchCategories(currentPage, keyword, target);
  }, [currentPage]);

  // ==================== 검색 ====================
  const handleSearch = () => {
    setCurrentPage(0);
    fetchCategories(0, keyword, target);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ==================== 체크박스 ====================
  const toggleSelect = (categoryNo) => {
    setSelectedNos((prev) =>
      prev.includes(categoryNo)
        ? prev.filter((no) => no !== categoryNo)
        : [...prev, categoryNo],
    );
  };

  const isAllSelected =
    categories.length > 0 && selectedNos.length === categories.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNos([]);
    } else {
      setSelectedNos(categories.map((c) => c.categoryNo));
    }
  };

  // ==================== 카테고리 추가 ====================
  const handleAdd = async () => {
    if (!categoryName.trim()) {
      setAddError("카테고리 이름을 입력해주세요.");
      return;
    }

    try {
      setAdding(true);
      setAddError("");

      await api.post("/admins/category", {
        categoryName: categoryName.trim(),
      });

      alert.success("카테고리가 추가되었습니다.");
      closeAddModal();
      fetchCategories(currentPage, keyword, target);
    } catch (err) {
      const msg =
        err.response?.data?.message || "카테고리 추가에 실패했습니다.";
      setAddError(msg);
      alert.error(msg);
    } finally {
      setAdding(false);
    }
  };

  // ==================== 삭제 (하드 삭제 - 복구 불가) ====================
  const handleDelete = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.delete("/admins/category", {
        data: { categoryNos: selectedNos },
      });
      alert.success(`${selectedNos.length}개의 카테고리를 삭제했습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchCategories(currentPage, keyword, target);
    } catch (err) {
      alert.error("삭제에 실패했습니다.");
    }
  };

  // ==================== 모달 열기 ====================
  const openDeleteModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("삭제할 카테고리를 선택해주세요.");
      return;
    }
    setModalType("delete");
  };

  const openAddModal = () => {
    setCategoryName("");
    setAddError("");
    setShowAddModal(true);
  };

  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>카테고리 관리</Title>
        </Header>

        <Toolbar>
          <Select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">All</option>
            <option value="categoryName">카테고리 이름</option>
            <option value="categoryNo">번호</option>
          </Select>

          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="카테고리 검색"
          />

          <button
            onClick={handleSearch}
            style={{
              padding: "8px 16px",
              background: "#333",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "12px",
            }}
          >
            검색
          </button>

          <ButtonGroup>
            <AddButton onClick={openAddModal}>추가</AddButton>
            <DeleteButton onClick={openDeleteModal}>삭제</DeleteButton>
          </ButtonGroup>
        </Toolbar>

        <Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>번호</th>
              <th>카테고리 이름</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  로딩 중...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.categoryNo}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedNos.includes(c.categoryNo)}
                      onChange={() => toggleSelect(c.categoryNo)}
                    />
                  </td>
                  <td>{c.categoryNo}</td>
                  <td>{c.categoryName}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <LowBars
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Main>

      {/* 삭제 확인 - 공유 모달 사용 */}
      <AdminModal
        modalType={modalType}
        onClose={closeModal}
        onDelete={handleDelete}
        selectedCount={selectedNos.length}
        entityName="카테고리"
      />

      {/* ===== 카테고리 추가 모달 ===== */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closeAddModal}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "28px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 20px 0", fontSize: "18px" }}>
              카테고리 추가
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "14px",
                  color: "#555",
                }}
              >
                카테고리 이름
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setAddError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                }}
                placeholder="카테고리 이름을 입력하세요"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
                autoFocus
              />
              {addError && (
                <p
                  style={{
                    color: "#d32f2f",
                    fontSize: "13px",
                    margin: "6px 0 0 0",
                  }}
                >
                  {addError}
                </p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "24px",
              }}
            >
              <button
                onClick={closeAddModal}
                disabled={adding}
                style={{
                  padding: "8px 18px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  background: "#f5f5f5",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                취소
              </button>
              <button
                onClick={handleAdd}
                disabled={adding}
                style={{
                  padding: "8px 18px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#333",
                  color: "white",
                  cursor: adding ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  opacity: adding ? 0.7 : 1,
                }}
              >
                {adding ? "추가 중..." : "추가"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AdminCategory;
