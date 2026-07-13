import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Sidebars from "./Sidebars";
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
  const navi = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalMembers: 0,
    todayJoined: 0,
    leaveDate: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admins/dashboard")
      .then((res) => {
        setDashboard(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Sidebars />

      <Main>
        <Header>
          <Title>대시보드</Title>

          <Toolbar>
            <ButtonGroup>
              <AddButton
                onClick={() => navi("/")}
                style={{ cursor: "pointer" }}
              >
                서비스 페이지
              </AddButton>

              <AddButton
                onClick={() => window.location.reload()}
                style={{ cursor: "pointer" }}
              >
                갱신
              </AddButton>
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
            {loading ? (
              <tr>
                <td colSpan={3}>불러오는 중...</td>
              </tr>
            ) : (
              <tr>
                <td>{dashboard.totalMembers}명</td>
                <td>{dashboard.todayJoined}명</td>
                <td>{dashboard.leaveDate}명</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Main>
    </Container>
  );
};

export default AdminDash;
