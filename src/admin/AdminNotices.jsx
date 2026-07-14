import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAlertify } from "../hooks/useAlertify";
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
const AdminNotices = () => {
  const { user } = useAuth();
  const { success, error } = useAlertify();
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const navi = useNavigate();

  const [activeMenu, setActiveMenu] = useState("");
  const [notices, setNotices] = useState([]);
  const [noticeNos, setNoticeNos] = useState([]);

  const [page, setPage] = useState(1);
  const totalPage = 7;

  useEffect(() => {
    if (!user) {
      navi("/login");
      return;
    }
    api.get(`http://localhost/api/admins/notices?page=${page}`).then((res) => {
      console.log(res.data.data.content);
      setNotices(res.data.data.content);
    });
  }, [user, navi, page]);

  const onCheck = (e) => {
    if (e.target.checked) {
      setNotices([...NoticeNos, e.target.id]);
    } else {
      setNotices([...NoticeNos.filter((e) => e != target.id)]);
    }
  };
  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>공지사항 관리</Title>
        </Header>
        <Toolbar>
          <Select>
            <option>All</option>
            <option>회원ID</option>
            <option>회원명</option>
            <option>공지사항 명</option>
          </Select>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="관리자검색"
          />
          <ButtonGroup>
            <AddButton
              onClick={() => {
                setActiveMenu("추가");
                navi("/admin/notice/plus");
              }}
            >
              추가
            </AddButton>
            <AddButton
              onClick={() => {
                setActiveMenu("수정");
                navi("/admin/notice/edit");
              }}
            >
              수정
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
              <th>공지보드 키</th>
              <th>공지사항 명</th>
              <th>컨텐트</th>
              <th>게시자</th>
              <th>생성날짜</th>
              <th>조회수</th>
            </tr>
          </thead>

          <tbody>
            {notices.length != 0 ? (
              notices.map((n) => (
                <tr key={n.noticeNo}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{n.noticeNo}</td>
                  <td>{n.noticeTitle}</td>
                  <td>{n.noticeContent}</td>
                  <td>{n.memberName}</td>
                  <td>{n.createDate}</td>
                  <td>{n.noticeCount}</td>
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
export default AdminNotices;
