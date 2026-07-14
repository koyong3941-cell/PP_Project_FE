import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAlertify } from "../hooks/useAlertify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AddButton,
  ButtonGroup,
  Container,
  DeleteButton,
  Header,
  Logo,
  LowBar,
  Main,
  Menu,
  MenuItem,
  SearchInput,
  Select,
  Sidebar,
  Table,
  Title,
  Toolbar,
} from "./admin.style";
import Sidebars from "./Sidebars";
import LowBars from "./Lowbars";
import api from "../api/axios";
const AdminPlants = () => {
  const { user } = useAuth();
  const navi = useNavigate();
  const { success, error } = useAlertify();
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const [activeMenu, setActiveMenu] = useState("");

  const [plants, setPlants] = useState([]);
  const [plantNos, setPlantNos] = useState([]);

  const [page, setPage] = useState("");
  const totalPage = Page;

  useEffect(() => {
    if (!user) {
      navi("/login");
      return;
    }
    api
      .get(`http://localhost/api/admins/plants?page=${page - 1}`)
      .then((res) => {
        console.log(res.data.data.content);
        setPlants(res.data.data.content);
      });
  }, [user, navi, page]);

  const onCheck = (e) => {
    if (e.target.checked) {
      setPlantNos([...plantNos, e.target.id]);
    } else {
      setPlantNos([...plantNos.filter((e) => e != e.target.id)]);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    if (!confirm("정말삭제하시겠습니까?")) return;

    try {
      await api.delete(`/admin/plants/${plantsNo}`);
      //navi("/admin/board");
    } catch {
      alert("삭제에 실패했습니다");
      //navi("/admin/board");
    }
  };

  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>식물 정보 관리</Title>
        </Header>
        <Toolbar>
          <Select>
            <option>All</option>
            <option>식물ID</option>
            <option>게시자</option>
            <option>식물명</option>
          </Select>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="관리자 검색"
          />
          <ButtonGroup>
            <AddButton
              onClick={() => {
                setActiveMenu("추가");
                navi("/admin/plant/plus");
              }}
            >
              추가
            </AddButton>
            <AddButton
              onClick={() => {
                setActiveMenu("수정");
                navi("/admin/plant/edit");
              }}
            >
              수정
            </AddButton>
            <DeleteButton onClick={() => {}}>삭제</DeleteButton>
          </ButtonGroup>
        </Toolbar>

        <Table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>식물 키</th>
              <th>식물명</th>
              <th>게시자</th>
              <th>게시 날짜</th>
              <th>게시여부</th>
            </tr>
          </thead>

          <tbody>
            {plants.length != 0 ? (
              plants.map((p) => (
                <tr key={p.plantNo}>
                  <td>
                    <input type="checkbox" id={p.plantNo} onChange={onCheck} />
                  </td>
                  <td>{p.plantNo}</td>
                  <td>{p.plantName}</td>
                  <td>{p.memberName}</td>
                  <td>{p.createDate}</td>
                  <td>{p.count}</td>
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
export default AdminPlants;
