import { Route } from "react-router-dom";

import Admin from "../admin/Admin";
import AdminDash from "../admin/AdminDash";
import AdminMembers from "../admin/AdminMembers";
import AdminBoards from "../admin/AdminBoards";
import AdminPlants from "../admin/AdminPlants";
import AdminPlantsPlus from "../admin/AdminPlantsPlus";
import AdminPlantsEdit from "../admin/AdminPlantsEdit";
import AdminNotices from "../admin/AdminNotices";
import AdminNoticesPlus from "../admin/AdminNoticesPlus";
import AdminNoticeEdit from "../admin/AdminNoticeEdit";

export const AdminRoutes = [
  <Route key="admin" path="/admin" element={<Admin />} />,
  <Route key="admin-dash" path="/admin/dash" element={<AdminDash />} />,
  <Route key="admin-member" path="/admin/member" element={<AdminMembers />} />,
  <Route key="admin-board" path="/admin/board" element={<AdminBoards />} />,

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
];
