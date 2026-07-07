import { Logo, Menu, MenuItem, Sidebar } from "./admin.style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebars = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const navi = useNavigate();
  return (
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
            navi("/admin/member");
          }}
        >
          회원 관리
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActiveMenu("게시글 관리");
            navi("/admin/board");
          }}
        >
          게시글 관리
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActiveMenu("식물 정보 관리");
            navi("/admin/plant");
          }}
        >
          식물 정보 관리
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActiveMenu("공지사항 관리");
            navi("/admin/notice");
          }}
        >
          공지사항 관리
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActiveMenu("대시보드");
            navi("/admin/dash");
          }}
        >
          대시보드
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};
export default Sidebars;
