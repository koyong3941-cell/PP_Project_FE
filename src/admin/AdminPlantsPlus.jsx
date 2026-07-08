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
  Select,
  Title,
  Toolbar,
} from "./admin.style";

const AdminPlantsPlus = () => {
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
          <Title>식물추가</Title>
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
        <h4>식물종</h4>
        <Toolbar>
          <Select>
            <option>식물종</option>
            <option>수란꽃</option>
            <option>박주가리과</option>
          </Select>
        </Toolbar>
        <Toolbar />
        <h4>식물 정보/재배 환경</h4>
        <Toolbar />
        <BoardText placeholder="내용" />
        <Toolbar>
          <SearchInput placeholder="식물사진.jpg" />
          <AddButton>첨부 사진</AddButton>
          <SearchInput placeholder="농촌진흥청 API링크" />
          <AddButton>링크</AddButton>
          <ButtonGroup>
            <AddButton>목록</AddButton>
            <AddButton>추가</AddButton>
          </ButtonGroup>
        </Toolbar>
      </Main>
    </Container>
  );
};
export default AdminPlantsPlus;
