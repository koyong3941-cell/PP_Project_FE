import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const AdminCategory = () => {
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();

  const [activeMenu, setActiveMenu] = useState("");

  const [page, setPage] = useState(1);
  const totalPage = 7;

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
            <AddButton>추가</AddButton>
            <DeleteButton>삭제</DeleteButton>
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
            {admins.length === 0 ? (
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>#1</th>
                <th>자유</th>
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
                <th>개그</th>
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
                <th>#3</th>
                <th>꿀팁</th>
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
        </Table>
        <LowBars />
      </Main>
    </Container>
  );
};
export default AdminCategory;
