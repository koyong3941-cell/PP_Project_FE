import { Route } from "react-router-dom";

import Admin from "../admin/Admin";
import AdminDash from "../admin/AdminDash";
import AdminMembers from "../admin/AdminMembers";
import AdminBoards from "../admin/AdminBoards";
import AdminBoardData from "../admin/AdminBoardData";
import AdminBoardDelete from "../admin/AdminBoardDelete";
import AdminPlants from "../admin/AdminPlants";
import AdminPlantsPlus from "../admin/AdminPlantsPlus";
import AdminPlantsEdit from "../admin/AdminPlantsEdit";
import AdminNotices from "../admin/AdminNotices";
import AdminNoticesPlus from "../admin/AdminNoticesPlus";
import AdminNoticeEdit from "../admin/AdminNoticeEdit";

export const AdminRoutes = [
  <Route key="admin" path="/admin" element={<Admin />} />,

  <Route key="admin-member" path="/admin/member" element={<AdminMembers />} />,

  //공지사항 관련
  <Route key="admin-board" path="/admin/board" element={<AdminBoards />} />,
  <Route
    key="admin-board-data"
    path="/admin/board/data"
    element={<AdminBoardData />}
  />,
  <Route
    key="admin-board-delete"
    path="/admin/board/delete"
    element={<AdminBoardDelete />}
  />,

  // 식물 관리
  <Route key="admin-plant" path="/admin/plant" element={<AdminPlants />} />,
  <Route
    key="admin-plant-plus"
    path="/admin/plant/plus"
    element={<AdminPlantsPlus />}
  />,
  <Route
    key="admin-plant-edit"
    path="/admin/plant/edit"
    element={<AdminPlantsEdit />}
  />,

  // 공지사항 관리
  <Route key="admin-notice" path="/admin/notice" element={<AdminNotices />} />,
  <Route
    key="admin-notice-plus"
    path="/admin/notice/plus"
    element={<AdminNoticesPlus />}
  />,
  <Route
    key="admin-notice-edit"
    path="/admin/notice/edit"
    element={<AdminNoticeEdit />}
  />,

  //대시보드
  <Route key="admin-dash" path="/admin/dash" element={<AdminDash />} />,
];
