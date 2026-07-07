import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebars from "./Sidebars";
import LowBars from "./Lowbars";
import {
  AddButton,
  ButtonGroup,
  Container,
  Header,
  Main,
  Table,
  Title,
  Toolbar,
} from "./admin.style";

const AdminDash = () => {
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const [loading, setLoding] = useState(false);
  const navi = useNavigate();

  const [activeMenu, setActiveMenu] = useState("");

  const [page, setPage] = useState(1);
  const totalPage = 7;
  return (
    <Container>
      <Sidebars />
      <Main>
        <Header>
          <Title>대시보드</Title>
          <Toolbar>
            <ButtonGroup>
              <AddButton>서비스 페이지</AddButton>
              <AddButton>갱신</AddButton>
            </ButtonGroup>
          </Toolbar>
        </Header>

        <Table>
          <thead>
            <tr>
              <th>총 가입회원</th>
              <th>금일 가입회원</th>
              <th>금일 탈퇴회원</th>
            </tr>
          </thead>
          <tbody>
            <td>100000명</td>
            <td>5명</td>
            <td>1명</td>
          </tbody>
        </Table>
        <LowBars />
      </Main>
    </Container>
  );
};
export default AdminDash;
