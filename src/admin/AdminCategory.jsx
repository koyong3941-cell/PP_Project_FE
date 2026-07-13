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

  const [page, setPage] = useState("");
  const totalPage = Page;

  useEffect(() => {
    if (!user) {
      navi("/login");
      return;
    }

    if (user.role !== "ROLE_ADMIN") {
      error("관리자만 접근할수 있습니다");
      navi("/");
      return;
    }
    api
      .get(`http://localhost/api/admins/category?page=${page}`)
      .then((res) => {
        console.log(res.data.data.content);
        setCategory(res.data.data.content);
      })
      .catch((err) => {
        console.error(err);
        error("카테고리를 불러오지 못했습니다");
      });
  }, [user, navi, page]);

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
        <LowBars />
      </Main>
    </Container>
  );
};
export default AdminCategory;
