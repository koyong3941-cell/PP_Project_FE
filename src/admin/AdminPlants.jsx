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

const AdminPlants = () => {
  const [plants, setPlants] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const alert = useAlertify();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  const [modalType, setModalType] = useState(null);
  const [selectedNos, setSelectedNos] = useState([]);

  const closeModal = () => {
    setModalType(null);
    setSelectedNos([]);
  };

  // ==================== 데이터 불러오기 (검색/일반 통합) ====================
  const fetchPlants = async (page, searchKeyword = "", searchTarget = "") => {
    try {
      setLoading(true);

      const kw = searchKeyword || "";
      let url = "/admins/plants";
      let params = { page, size };

      if (kw.trim()) {
        url = "/admins/plants/search";
        params.keyword = kw.trim();
        if (searchTarget) {
          params.target = searchTarget;
        }
      }

      const res = await api.get(url, { params });
      const data = res.data.data;

      setPlants(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        alert.error("관리자 권한이 없습니다.");
        navi("/");
      } else {
        alert.error("데이터를 불러오는데 실패했습니다.");
      }
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================== 초기 로딩 + 페이지 변경 시 ====================
  useEffect(() => {
    fetchPlants(currentPage, keyword, target);
  }, [currentPage]);

  // ==================== 검색 ====================
  const handleSearch = () => {
    setCurrentPage(0);
    fetchPlants(0, keyword, target);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ==================== 체크박스 ====================
  const toggleSelect = (plantNo) => {
    setSelectedNos((prev) =>
      prev.includes(plantNo)
        ? prev.filter((no) => no !== plantNo)
        : [...prev, plantNo],
    );
  };

  const isAllSelected =
    plants.length > 0 && selectedNos.length === plants.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNos([]);
    } else {
      setSelectedNos(plants.map((p) => p.plantNo));
    }
  };

  // ==================== 삭제 ====================
  const handleDelete = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.delete("/admins/plants", {
        data: { plantNos: selectedNos },
      });
      alert.success(`${selectedNos.length}개의 식물 정보를 삭제했습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchPlants(currentPage, keyword, target);
    } catch (err) {
      alert.error("삭제에 실패했습니다.");
    }
  };

  // ==================== 복구 ====================
  const handleRestore = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.patch("/admins/plants", {
        plantNos: selectedNos,
      });
      alert.success(`${selectedNos.length}개의 식물 정보를 복구했습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchPlants(currentPage, keyword, target);
    } catch (err) {
      const msg = err.response?.data?.message || "복구에 실패했습니다.";
      alert.error(msg);
    }
  };

  // ==================== 모달 열기 ====================
  const openDeleteModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("삭제할 식물을 선택해주세요.");
      return;
    }
    setModalType("delete");
  };

  const openRestoreModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("복구할 식물을 선택해주세요.");
      return;
    }
    setModalType("restore");
  };

  // ==================== 추가 / 수정 (별도 페이지) ====================
  const goAdd = () => {
    navi("/admin/plant/plus");
  };

  const goEdit = () => {
    if (selectedNos.length === 0) {
      alert.warning("수정할 식물을 선택해주세요.");
      return;
    }
    if (selectedNos.length > 1) {
      alert.warning("수정은 한 번에 하나만 선택할 수 있습니다.");
      return;
    }
    navi(`/admin/plant/edit/${selectedNos[0]}`);
  };

  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>식물 정보 관리</Title>
        </Header>

        <Toolbar>
          <Select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">All</option>
            <option value="plantName">식물명</option>
            <option value="classification">식물 종</option>
            <option value="memberName">게시자</option>
          </Select>

          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="식물 검색"
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
            <AddButton onClick={goAdd}>추가</AddButton>
            <AddButton
              onClick={goEdit}
              style={{ background: "#17a2b8", color: "white" }}
            >
              수정
            </AddButton>
            <AddButton
              onClick={openRestoreModal}
              style={{ background: "#28a745", color: "white" }}
            >
              복구
            </AddButton>
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
              <th>식물 키</th>
              <th>식물명</th>
              <th>식물 종</th>
              <th>게시자</th>
              <th>게시 날짜</th>
              <th>게시여부</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  로딩 중...
                </td>
              </tr>
            ) : plants.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              plants.map((p) => (
                <tr key={p.plantNo}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedNos.includes(p.plantNo)}
                      onChange={() => toggleSelect(p.plantNo)}
                    />
                  </td>
                  <td>{p.plantNo}</td>
                  <td>{p.plantName}</td>
                  <td>{p.classification || "-"}</td>
                  <td>{p.memberName || "-"}</td>
                  <td>{p.createDate || "-"}</td>
                  <td>{p.delYn}</td>
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

      <AdminModal
        modalType={modalType}
        onClose={closeModal}
        onDelete={handleDelete}
        onRestore={handleRestore}
        selectedCount={selectedNos.length}
        entityName="식물"
      />
    </Container>
  );
};

export default AdminPlants;
