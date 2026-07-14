import { useEffect, useState } from "react";
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

const AdminBoards = () => {
  const [boards, setBoards] = useState([]);
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
  const fetchBoards = async (page, searchKeyword = "", searchTarget = "") => {
    try {
      setLoading(true);

      const kw = searchKeyword || "";
      let url = "/admins/boards";
      let params = { page, size };

      if (kw.trim()) {
        url = "/admins/boards/search";
        params.keyword = kw.trim();
        if (searchTarget) {
          params.target = searchTarget;
        }
      }

      const res = await api.get(url, { params });
      const data = res.data.data;

      setBoards(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        alert.error("관리자 권한이 없습니다.");
        navi("/");
      } else {
        alert.error("데이터를 불러오는데 실패했습니다.");
      }
      setBoards([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================== 초기 로딩 + 페이지 변경 시 ====================
  useEffect(() => {
    fetchBoards(currentPage, keyword, target);
  }, [currentPage]);

  // ==================== 검색 ====================
  const handleSearch = () => {
    setCurrentPage(0);
    fetchBoards(0, keyword, target);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ==================== 체크박스 ====================
  const toggleSelect = (boardNo) => {
    setSelectedNos((prev) =>
      prev.includes(boardNo)
        ? prev.filter((no) => no !== boardNo)
        : [...prev, boardNo],
    );
  };

  const isAllSelected =
    boards.length > 0 && selectedNos.length === boards.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNos([]);
    } else {
      setSelectedNos(boards.map((b) => b.boardNo));
    }
  };

  // ==================== 삭제 ====================
  const handleDelete = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.delete("/admins/boards", {
        data: { boardNos: selectedNos },
      });
      alert.success(`${selectedNos.length}개의 게시글을 삭제했습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchBoards(currentPage, keyword, target);
    } catch (err) {
      alert.error("삭제에 실패했습니다.");
    }
  };

  // ==================== 복구 ====================
  const handleRestore = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.patch("/admins/boards", {
        boardNos: selectedNos,
      });
      alert.success(`${selectedNos.length}개의 게시글을 복구했습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchBoards(currentPage, keyword, target);
    } catch (err) {
      const msg = err.response?.data?.message || "복구에 실패했습니다.";
      alert.error(msg);
    }
  };

  // ==================== 모달 열기 ====================
  const openDeleteModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("삭제할 게시글을 선택해주세요.");
      return;
    }
    setModalType("delete");
  };

  const openRestoreModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("복구할 게시글을 선택해주세요.");
      return;
    }
    setModalType("restore");
  };

  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>게시글 관리</Title>
        </Header>

        <Toolbar>
          <Select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">All</option>
            <option value="boardNo">게시글 번호</option>
            <option value="memberName">회원명</option>
            <option value="boardTitle">게시글 제목</option>
            <option value="boardContern">게시글 내용</option>
          </Select>

          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="게시글 검색"
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
              <th>게시글 번호</th>
              <th>아이디</th>
              <th>닉네임</th>
              <th>게시글 제목</th>
              <th>생성 날짜</th>
              <th>삭제 여부</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  로딩 중...
                </td>
              </tr>
            ) : boards.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "40px" }}
                >
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              boards.map((board) => (
                <tr key={board.boardNo}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedNos.includes(board.boardNo)}
                      onChange={() => toggleSelect(board.boardNo)}
                    />
                  </td>
                  <td>{board.boardNo}</td>
                  <td>{board.memberId}</td>
                  <td>{board.memberName}</td>
                  <td>{board.boardTitle || board.title || "-"}</td>
                  <td>{board.createDate}</td>
                  <td>{board.delYn}</td>
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

export default AdminBoards;
