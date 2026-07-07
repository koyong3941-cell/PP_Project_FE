import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Logo, Sidebar } from "./admin.style";
const Notices = () => {
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
      <Sidebar>
        <Logo>Plant plants</Logo>
      </Sidebar>
    </Container>
  );
};
export default Notices;
