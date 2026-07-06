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

const Admin = () => {
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const AdminPage = async (e) => {};

  const [activeMenu, setActiveMenu] = useState("");

  const [page, setPage] = useState(1);
  const totalPage = 7;

  axios.get(`/notice?page=${page}`).then((res) => {
    setNotice(res.data.data.list);
    setTotalPage(res.data.data.totalPage);
  });

  return (
    <Container>
      {/* 사이드바 */}
      <Sidebar>
        <Logo>Plant Plants</Logo>

        <Menu>
          <MenuItem
            active={activeMenu == "관리자 관리"}
            onClick={() => setActiveMenu("관리자 관리")}
          >
            관리자 관리
          </MenuItem>
          <MenuItem
            active={activeMenu == "회원관리"}
            onClick={() => setActiveMenu("회원관리")}
          >
            회원 관리
          </MenuItem>
          <MenuItem
            active={activeMenu == "게시글 관리"}
            onClick={() => setActiveMenu("게시글 관리")}
          >
            게시글 관리
          </MenuItem>
          <MenuItem
            active={activeMenu == "식물 정보 관리"}
            onClick={() => setActiveMenu("식물 정보 관리")}
          >
            식물 정보 관리
          </MenuItem>
          <MenuItem
            active={activeMenu == "공지사항 관리"}
            onClick={() => setActiveMenu("공지사항 관리")}
          >
            공지사항 관리
          </MenuItem>
          <MenuItem
            active={activeMenu == "대시보드"}
            onClick={() => setActiveMenu("대시보드")}
          >
            대시보드
          </MenuItem>
        </Menu>
      </Sidebar>

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
        <LowBar>
          <button disabled={page === 1} onClick={() => setPage(1)}>
            ⏮
          </button>

          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            &lt; Previous
          </button>

          <div className="pageWrap">
            {Array.from({ length: totalPage }, (_, i) => {
              const pageNum = i + 1;

              if (
                pageNum === 1 ||
                pageNum === totalPage ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    className={page === pageNum ? "active" : ""}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              }

              if (pageNum === page - 2 || pageNum === page + 2) {
                return <span key={pageNum}>...</span>;
              }

              return null;
            })}
          </div>

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
          >
            Next &gt;
          </button>

          <button
            disabled={page === totalPage}
            onClick={() => setPage(totalPage)}
          >
            ⏭
          </button>
        </LowBar>
      </Main>
    </Container>
  );
};
export default Admin;
