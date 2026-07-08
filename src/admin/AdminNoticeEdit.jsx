import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebars from "./Sidebars";
import LowBars from "./Lowbars";
import {
  AddButton,
  BoardText,
  ButtonGroup,
  Container,
  Header,
  Main,
  SearchInput,
  Title,
  Toolbar,
} from "./admin.style";

const AdminNoticeEdit = () => {
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const navi = useNavigate();

  const [activeMenu, setActiveMenu] = useState("");

  const [page, setPage] = useState(1);
  const totalPage = 7;
  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>공지사항 수정</Title>
        </Header>
        <Toolbar />
        <h4>제목</h4>
        <Toolbar>
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="제목"
          />
        </Toolbar>
        <Toolbar />
        <BoardText placeholder="내용" />
        <Toolbar>
          <SearchInput placeholder="식물사진.jpg" />
          <AddButton>첨부사진</AddButton>
          <ButtonGroup>
            <AddButton>목록</AddButton>
            <AddButton>수정</AddButton>
          </ButtonGroup>
        </Toolbar>
      </Main>
    </Container>
  );
};
export default AdminNoticeEdit;
