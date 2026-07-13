import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAlertify } from "../hooks/useAlertify";
import axios from "axios";
import Sidebars from "./Sidebars";
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
import LowBars from "./Lowbars";
import api from "../api/axios";

const AdminCategory = () => {
  const { user } = useAuth();
  const navi = useNavigate();
  const { success, error } = useAlertify();

  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const [activeMenu, setActiveMenu] = useState("");

  const [category, setCategory] = useState([]);
  const [categoryNo, setCategoryNo] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  const fetchAdmins = async (page) => {
    try {
      setLoading(true);
      const res = await api.get("/admins/category", {
        params: {
          page: page - 1,
          size: size,
        },
      });
      const data = res.data.data;
      setAdmins(data.content || []);
      setTotalPages(data.tatoalPages || 0);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        alert.error("관리자 권한이 없습니다");
        navi("/");
      } else {
        alert.error("데이터를 불러오는데 실패했습니다");
      }
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins(currentPage);
  }, [currentPage]);

  const toggleSelect = (categoryNo) => {
    setSelectNos((prev) =>
      prev.includes(categoryNo)
        ? prev.filter((no) => no !== categoryNo)
        : [...prev, categoryNo],
    );
  };

  const onCheck = (e) => {
    if (e.target.checked) {
      setCategoryNo([...categoryNos, e.target.id]);
    } else {
      setCategoryNo([...plantNos.filter((e) => e != e.target.id)]);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await api.delete(`/admin/category/${categoryNo}`);
    } catch {
      alert("삭제에 실패했습니다");
    }
  };
  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>카테고리 관리</Title>
        </Header>
        <Toolbar>
          <Select>
            <option>All</option>
            <option>사용</option>
            <option>미사용</option>
          </Select>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="관리자 검색"
          />
          <ButtonGroup>
            <AddButton
              onClick={() => {
                navi("/admin/category/plus");
              }}
            >
              추가
            </AddButton>
            <DeleteButton
              onClick={() => {
                navi("/admin/category/delete");
              }}
            >
              삭제
            </DeleteButton>
          </ButtonGroup>
        </Toolbar>
        <Table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>번호</th>
              <th>카테고리 이름</th>
            </tr>
          </thead>
          <tbody>
            {category.length != 0 ? (
              category.map((c) => (
                <tr key={c.categoryNo}>
                  <td>
                    <input
                      type="checkbox"
                      id={c.categoryNo}
                      onChange={onCheck}
                    />
                  </td>
                  <td>{c.categoryNo}</td>
                  <td>{c.categoryName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>아직 존재하지 않습니다</td>
              </tr>
            )}
          </tbody>
        </Table>
        <LowBars
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Main>
    </Container>
  );
};
export default AdminCategory;
