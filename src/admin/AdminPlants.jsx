import { useState } from "react";
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
const AdminPlants = () => {
  const navi = useNavigate();
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const [activeMenu, setActiveMenu] = useState("");

  const [page, setPage] = useState(1);
  const totalPage = 7;

  axios.get(`http://localhost/api/plants?page=${page}`).then((res) => {
    console.log(res);
    // setNotice(res.data.data.list);
    // setTotalPage(res.data.data.totalPage);
  });
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
            <DeleteButton>삭제</DeleteButton>
          </ButtonGroup>
        </Toolbar>

        <Table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>식물 키</th>
              <th>게시 날짜</th>
              <th>식물명</th>
              <th>게시자</th>
              <th>식물요약</th>
              <th>게시여부</th>
            </tr>
          </thead>

          <tbody>
            {admins.length === 0 ? (
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>#1</th>
                <th>23/09/2022</th>
                <th>t*dg*s</th>
                <th>김*환</th>
                <th>t*dg*s@gmail.com</th>
                <th>Y</th>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.memberNo}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{admin.memberNo}</td>
                  <td>{admin.createDate}</td>
                  <td>{admin.memberId}</td>
                  <td>{admin.memberName}</td>
                  <td>{admin.memberEmail}</td>
                  <td>{admin.useYn}</td>
                </tr>
              ))
            )}
          </tbody>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>#2</th>
                <th>23/09/2022</th>
                <th>t*dg*s</th>
                <th>최*개</th>
                <th>t*dg*s@gmail.com</th>
                <th>Y</th>
              </tr>
            ) : (
              admins.map((admin) => {
                <tr key={admin.memberNo}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{admin.memberNo}</td>
                  <td>{admin.createDate}</td>
                  <td>{admin.memberId}</td>
                  <td>{admin.memberName}</td>
                  <td>{admin.memberEmail}</td>
                  <td>{admin.useYn}</td>
                </tr>;
              })
            )}
          </tbody>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>#3</th>
                <th>23/09/2022</th>
                <th>t*dg*s</th>
                <th>백*만</th>
                <th>t*dg*s@gmail.com</th>
                <th>Y</th>
              </tr>
            ) : (
              admins.map((admin) => {
                <tr key={admin.memberNo}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{admin.memberNo}</td>
                  <td>{admin.createDate}</td>
                  <td>{admin.memberId}</td>
                  <td>{admin.memberName}</td>
                  <td>{admin.memberEmail}</td>
                  <td>{admin.useYn}</td>
                </tr>;
              })
            )}
          </tbody>
        </Table>
        <LowBars />
      </Main>
    </Container>
  );
};
export default AdminPlants;
