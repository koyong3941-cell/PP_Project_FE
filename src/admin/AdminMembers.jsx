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

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
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
  const fetchMembers = async (page, searchKeyword = "", searchTarget = "") => {
    try {
      setLoading(true);

      const kw = searchKeyword || "";
      let url = "/admins/members";
      let params = { page, size };

      if (kw.trim()) {
        url = "/admins/members/search";
        params.keyword = kw.trim();
        if (searchTarget) {
          params.target = searchTarget;
        }
      }

      const res = await api.get(url, { params });
      const data = res.data.data;

      setMembers(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        alert.error("관리자 권한이 없습니다.");
        navi("/");
      } else {
        alert.error("데이터를 불러오는데 실패했습니다.");
      }
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================== 초기 로딩 + 페이지 변경 시 ====================
  useEffect(() => {
    fetchMembers(currentPage, keyword, target);
  }, [currentPage]);

  // ==================== 검색 ====================
  const handleSearch = () => {
    setCurrentPage(0);
    fetchMembers(0, keyword, target);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ==================== 체크박스 ====================
  const toggleSelect = (memberNo) => {
    setSelectedNos((prev) =>
      prev.includes(memberNo)
        ? prev.filter((no) => no !== memberNo)
        : [...prev, memberNo],
    );
  };

  const isAllSelected =
    members.length > 0 && selectedNos.length === members.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNos([]);
    } else {
      setSelectedNos(members.map((m) => m.memberNo));
    }
  };

  // ==================== 삭제 ====================
  const handleDelete = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.delete("/admins/members", {
        data: { memberNos: selectedNos },
      });
      alert.success(`${selectedNos.length}명의 회원을 탈퇴시켰습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchMembers(currentPage, keyword, target); // 검색 상태 유지
    } catch (err) {
      alert.error("삭제에 실패했습니다.");
    }
  };

  // ==================== 복구 ====================
  const handleRestore = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.patch("/admins/members", {
        memberNos: selectedNos,
      });
      alert.success(`${selectedNos.length}명의 회원을 복구했습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchMembers(currentPage, keyword, target); // 검색 상태 유지
    } catch (err) {
      const msg = err.response?.data?.message || "복구에 실패했습니다.";
      alert.error(msg);
    }
  };

  // ==================== 모달 열기 ====================
  const openDeleteModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("삭제할 회원을 선택해주세요.");
      return;
    }
    setModalType("delete");
  };

  const openRestoreModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("복구할 회원을 선택해주세요.");
      return;
    }
    setModalType("restore");
  };

  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>회원 관리</Title>
        </Header>

        <Toolbar>
          <Select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">All</option>
            <option value="memberId">회원ID</option>
            <option value="memberName">회원명</option>
            <option value="email">회원이메일</option>
          </Select>

          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="회원 검색"
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
              <th>회원키</th>
              <th>생성날짜</th>
              <th>회원ID</th>
              <th>회원명</th>
              <th>회원이메일</th>
              <th>사용여부</th>
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
            ) : members.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.memberNo}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedNos.includes(member.memberNo)}
                      onChange={() => toggleSelect(member.memberNo)}
                    />
                  </td>
                  <td>{member.memberNo}</td>
                  <td>{member.enrollDate}</td>
                  <td>{member.memberId}</td>
                  <td>{member.memberName}</td>
                  <td>{member.email}</td>
                  <td>{member.delYn}</td>
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
      />
    </Container>
  );
};

export default AdminMembers;
