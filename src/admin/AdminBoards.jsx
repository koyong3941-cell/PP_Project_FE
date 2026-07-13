import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
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

const AdminBoards = () => {
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const [boardNos, setBoardNos] = useState([]);
  const navi = useNavigate();

  const [activeMenu, setActiveMenu] = useState("");
  const [boards, setBoards] = useState([]);

  const [page, setPage] = useState(1);
  const totalPage = 7;

  useEffect(() => {
    axios.get(`http://localhost/api/boards?page=${page}`).then((res) => {
      console.log(res.data.data.content);
      setBoards(res.data.data.content);
    });
  }, []);

  const onCheck = (e) => {
    if (e.target.checked) {
      setBoardNos([...boardNos, e.target.id]);
    } else {
      setBoardNos([...boardNos.filter((e) => e != e.target.id)]);
    }
  };
  const onDelete = async (e) => {
    e.preventDefault();
    if (!confirm("정말삭제하시겠습니까?")) return;

    try {
      await api.delete(`/admin/boards/${boardNos}`);
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
          <Title>게시글 관리</Title>
        </Header>
        <Toolbar>
          <Select>
            <option>All</option>
            <option>회원ID</option>
            <option>회원명</option>
            <option>게시글 이름</option>
          </Select>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="관리자 검색"
          />
          <ButtonGroup>
            <AddButton
              onClick={() => {
                setActiveMenu("복구");
                navi("/admin/board/data");
              }}
            >
              복구
            </AddButton>
            <DeleteButton
              onClick={() => {
                setActiveMenu("삭제");
                navi("/admin/board/delete");
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
              <th>보드키</th>
              <th>생성 날짜</th>
              <th>조회수</th>
              <th>회원 명</th>
              <th>게시글 이름</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {boards.length != 0 ? (
              boards.map((b) => (
                <tr key={b.boardNo}>
                  <td>
                    <input type="checkbox" id={b.boardNo} onChange={onCheck} />
                  </td>
                  <td>{b.boardNo}</td>
                  <td>{b.createDate}</td>
                  <td>{b.count}</td>
                  <td>{b.memberName}</td>
                  <td>{b.categoryName}</td>
                  <td>{b.likeCount}</td>
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
export default AdminBoards;
