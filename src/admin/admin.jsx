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

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const alert = useAlertify();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  const [modalType, setModalType] = useState(null);
  const [selectedNos, setSelectedNos] = useState([]);

  const [form, setForm] = useState({
    memberId: "",
    memberName: "",
    password: "",
    email: "",
  });
  const [formError, setFormError] = useState("");

  const closeModal = () => {
    setModalType(null);
    setForm({
      memberId: "",
      memberName: "",
      password: "",
      email: "",
    });
    setFormError("");
    setSelectedNos([]);
  };

  const fetchAdmins = async (page) => {
    try {
      setLoading(true);
      const res = await api.get("/admins/admins", {
        params: {
          page: page - 1,
          size: size,
        },
      });

      const data = res.data.data;
      setAdmins(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        alert.error("관리자 권한이 없습니다.");
        navi("/");
      } else {
        alert.error("데이터를 불러오는데 실패했습니다.");
      }
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins(currentPage);
  }, [currentPage]);

  const toggleSelect = (memberNo) => {
    setSelectedNos((prev) =>
      prev.includes(memberNo)
        ? prev.filter((no) => no !== memberNo)
        : [...prev, memberNo],
    );
  };

  const isAllSelected =
    admins.length > 0 && selectedNos.length === admins.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNos([]);
    } else {
      setSelectedNos(admins.map((admin) => admin.memberNo));
    }
  };

  // ==================== 관리자 추가 ====================
  const handleAddAdmin = async () => {
    const { memberId, memberName, memberPwd, email } = form;

    if (
      !form.memberId ||
      !form.memberName ||
      !form.password ||
      !form.memberEmail
    ) {
      setFormError("모든 항목을 입력해주세요.");
      return;
    }

    try {
      await api.post("/admins/admins", {
        memberId,
        memberName,
        memberPwd,
        email,
      });

      alert.success("관리자가 성공적으로 추가되었습니다.");
      closeModal();
      fetchAdmins(currentPage);
    } catch (err) {
      const msg = err.response?.data?.message || "추가에 실패했습니다.";
      setFormError(msg);
      alert.error(msg);
    }
  };

  // ==================== 삭제 ====================
  const handleDelete = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.delete("/admins/admins", {
        data: { memberNos: selectedNos },
      });
      alert.success(`${selectedNos.length}명의 관리자를 탈퇴시켰습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchAdmins(currentPage);
    } catch (err) {
      alert.error("삭제에 실패했습니다.");
    }
  };

  // ==================== 복구 ====================
  const handleRestore = async () => {
    if (selectedNos.length === 0) return;

    try {
      await api.patch("/admins/admins", {
        memberNos: selectedNos,
      });
      alert.success(`${selectedNos.length}명의 관리자를 복구했습니다.`);
      closeModal();
      setSelectedNos([]);
      fetchAdmins(currentPage);
    } catch (err) {
      alert.error("복구에 실패했습니다.");
    }
  };

  // ==================== 모달 열기 ====================
  const openAddModal = () => {
    setModalType("add");
    setForm({ memberId: "", memberName: "", memberPwd: "", email: "" });
    setFormError("");
  };

  const openDeleteModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("삭제할 관리자를 선택해주세요.");
      return;
    }
    setModalType("delete");
  };

  const openRestoreModal = () => {
    if (selectedNos.length === 0) {
      alert.warning("복구할 관리자를 선택해주세요.");
      return;
    }
    setModalType("restore");
  };

  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>관리자 관리</Title>
        </Header>

        <Toolbar>
          <Select>
            <option>All</option>
            <option>관리자ID</option>
            <option>관리자명</option>
            <option>관리자이메일</option>
          </Select>

          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="관리자 검색"
          />

          <ButtonGroup>
            <AddButton onClick={openAddModal}>추가</AddButton>
            <AddButton
              onClick={openRestoreModal}
              style={{
                background: "#28a745",
                color: "white",
              }}
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
              <th>관리자ID</th>
              <th>관리자명</th>
              <th>관리자 이메일</th>
              <th>사용여부</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  로딩 중...
                </td>
              </tr>
            ) : admins.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.memberNo}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedNos.includes(admin.memberNo)}
                      onChange={() => toggleSelect(admin.memberNo)}
                    />
                  </td>
                  <td>{admin.memberNo}</td>
                  <td>{admin.enrollDate}</td>
                  <td>{admin.memberId}</td>
                  <td>{admin.memberName}</td>
                  <td>{admin.email}</td>
                  <td>{admin.delYn}</td>
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
        form={form}
        setForm={setForm}
        formError={formError}
        onAdd={handleAddAdmin}
        onDelete={handleDelete}
        onRestore={handleRestore}
        selectedCount={selectedNos.length}
      />
    </Container>
  );
};

export default Admin;
