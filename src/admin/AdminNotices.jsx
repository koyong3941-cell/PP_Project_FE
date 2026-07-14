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

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
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
  const fetchNotices = async (page, searchKeyword = "", searchTarget = "") => {
    try {
      setLoading(true);

      const kw = searchKeyword || "";
      let url = "/admins/notices";
      let params = { page, size };

      if (kw.trim()) {
        url = "/admins/notices/search";
        params.keyword = kw.trim();
        if (searchTarget) {
          params.target = searchTarget;
        }
      }

      const res = await api.get(url, { params });
      const data = res.data.data;

      setNotices(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        alert.error("관리자 권한이 없습니다.");
        navi("/");
      } else {
        alert.error("데이터를 불러오는데 실패했습니다.");
      }
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================== 초기 로딩 + 페이지 변경 시 ====================
  useEffect(() => {
    fetchNotices(currentPage, keyword, target);
  }, [currentPage]);

  // ==================== 검색 ====================
  const handleSearch = () => {
    setCurrentPage(0);
    fetchNotices(0, keyword, target);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ==================== 체크박스 ====================
  const toggleSelect = (noticeNo) => {
    setSelectedNos((prev) =>
      prev.includes(noticeNo)
        ? prev.filter((no) => no !== noticeNo)
        : [...prev, noticeNo],
    );
  };

  const isAllSelected =
    notices.length > 0 && selectedNos.length === notices.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNos([]);
    } else {
      setSelectedNos(notices.map((n) => n.noticeNo));
    }
  };

  // ==================== 삭제 ====================
  const handleDelete = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.delete("/admins/notices", {
        data: { noticeNos: selectedNos },
      });
      alert.success(`${selectedNos.length}개의 공지사항을 삭제했습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchNotices(currentPage, keyword, target);
    } catch (err) {
      alert.error("삭제에 실패했습니다.");
    }
  };

  // ==================== 복구 ====================
  const handleRestore = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.patch("/admins/notices", {
        noticeNos: selectedNos,
      });
      alert.success(`${selectedNos.length}개의 공지사항을 복구했습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchNotices(currentPage, keyword, target);
    } catch (err) {
      const msg = err.response?.data?.message || "복구에 실패했습니다.";
      alert.error(msg);
    }
  };

  // ==================== 모달 열기 ====================
  const openDeleteModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("삭제할 공지사항을 선택해주세요.");
      return;
    }
    setModalType("delete");
  };

  const openRestoreModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("복구할 공지사항을 선택해주세요.");
      return;
    }
    setModalType("restore");
  };

  // ==================== 추가 / 수정 (별도 페이지) ====================
  const goAdd = () => {
    navi("/admin/notice/plus");
  };

  const goEdit = () => {
    if (selectedNos.length === 0) {
      alert.warning("수정할 공지사항을 선택해주세요.");
      return;
    }
    if (selectedNos.length > 1) {
      alert.warning("수정은 한 번에 하나만 선택할 수 있습니다.");
      return;
    }
    navi(`/admin/notice/edit/${selectedNos[0]}`);
  };

  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>공지사항 관리</Title>
        </Header>

        <Toolbar>
          <Select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">All</option>
            <option value="noticeTitle">공지사항 제목</option>
            <option value="memberId">회원ID</option>
            <option value="memberName">닉네임</option>
          </Select>

          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="공지사항 검색"
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
              <th>공지 번호</th>
              <th>공지사항 제목</th>
              <th>회원ID</th>
              <th>닉네임</th>
              <th>생성날짜</th>
              <th>사용 여부</th>
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
            ) : notices.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              notices.map((n) => (
                <tr key={n.noticeNo}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedNos.includes(n.noticeNo)}
                      onChange={() => toggleSelect(n.noticeNo)}
                    />
                  </td>
                  <td>{n.noticeNo}</td>
                  <td>{n.noticeTitle}</td>
                  <td>{n.memberId || "-"}</td>
                  <td>{n.memberName || "-"}</td>
                  <td>{n.createDate || n.CreateDate || "-"}</td>
                  <td>{n.delYn}</td>
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
        entityName="공지사항"
      />
    </Container>
  );
};

export default AdminNotices;
