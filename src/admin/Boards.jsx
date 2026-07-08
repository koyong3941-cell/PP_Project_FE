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

const Boards = () => {
  const [admins, setAdmins] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();

  const [activeMenu, setActiveMenu] = useState("");

  const [page, setPage] = useState(1);
  const totalPage = 7;

  axios.get(`http://localhost/api/boards?page=${page}`).then((res) => {
    //setNotice(res.data.data.list);
    //setTotalPage(res.data.data.totalPage);
  });

  return (
    <Container>
      <Sidebar>
        <Logo>Plant plants</Logo>
        <Menu>
          <MenuItem
            onClick={() => {
              setActiveMenu("관리자 관리");
              navi("/admin");
            }}
          >
            관리자 관리
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActiveMenu("회원 관리");
              navi("/member");
            }}
          >
            회원 관리
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActiveMenu("게시글 관리");
              navi("/board");
            }}
          >
            게시글 관리
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActiveMenu("식물 정보 관리");
              navi("/plant");
            }}
          >
            식물 정보 관리
          </MenuItem>
          <MenuItem>공지사항 관리</MenuItem>
          <MenuItem>대시보드</MenuItem>
        </Menu>
      </Sidebar>

      <Main>
        <Header>
          <Title>게시글 관리</Title>
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
            <AddButton>복구</AddButton>
            <DeleteButton>삭제</DeleteButton>
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
              <th>회원 ID</th>
              <th>회원 명</th>
              <th>게시글 이름</th>
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
                <th>tidgus</th>
                <th>김*환</th>
                <th>t*gu*s@gmail.com</th>
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
                <th>tidugs</th>
                <th>최*개</th>
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
                <th>tidgus</th>
                <th>백*만</th>
                <th>t*dg*s@gmail.com</th>
                <th>Y</th>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.memberNo}>
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
          <button disabled={page === 1} onCLick={() => setPage(page - 1)}>
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
export default Boards;
