import { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AddButton,
  ButtonGroup,
  Container,
  DeleteButton,
  Header,
  Logo,
  LogoutBtn,
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

const Admin = () => {
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();

  const [activeMenu, setActiveMenu] = useState("");

  const [page, setPage] = useState(1);
  const totalPage = 7;

  axios.get(`http://localhost/api/notices?page=${page}`).then((res) => {
    console.log(res);
    // setNotice(res.data.data.list);
    // setTotalPage(res.data.data.totalPage);
  });

  return (
    <Container>
      {/* 사이드바 */}
      <Sidebars />
      {/* 메인 */}
      <Main>
        <Header>
          <Title>관리자 관리</Title>
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
                navi("/admin/plus");
              }}
            >
              추가
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
              <th>회원키</th>
              <th>생성날짜</th>
              <th>관리자ID</th>
              <th>관리자명</th>
              <th>관리자 이메일</th>
              <th>사용여부</th>
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
                <th>Jacob123</th>
                <th>김성현</th>
                <th>tidgus@naice.com</th>
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
                <th>Jacob123</th>
                <th>윤성현</th>
                <th>tidgus@naice.com</th>
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
                <th>#3</th>
                <th>23/09/2022</th>
                <th>Jacob123</th>
                <th>성현킹</th>
                <th>tidgus@naice.com</th>
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
                <th>#4</th>
                <th>23/09/2022</th>
                <th>Jacob123</th>
                <th>잉어킹</th>
                <th>tidgus@naice.com</th>
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
                <th>#5</th>
                <th>23/09/2022</th>
                <th>Jacob123</th>
                <th>갓성현</th>
                <th>tidgus@naice.com</th>
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
                <th>#6</th>
                <th>23/09/2022</th>
                <th>Jacob123</th>
                <th>윤성현</th>
                <th>tidgus@naice.com</th>
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
                <th>#7</th>
                <th>23/09/2022</th>
                <th>Jacob123</th>
                <th>성성현</th>
                <th>tidgus@naice.com</th>
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
                <th>#8</th>
                <th>23/09/2022</th>
                <th>Jacob123</th>
                <th>대성현</th>
                <th>tidgus@naice.com</th>
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
                <th>#9</th>
                <th>23/09/2022</th>
                <th>Jacob123</th>
                <th>성현</th>
                <th>tidgus@naice.com</th>
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
        </Table>
        <LowBars />
      </Main>
    </Container>
  );
};
export default Admin;
