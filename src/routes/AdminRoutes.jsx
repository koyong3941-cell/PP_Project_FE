import { Route } from "react-router-dom";

import Admin from "../admin/Admin";
import AdminPlus from "../admin/AdminPlus";
import AdminMembers from "../admin/AdminMembers";
import AdminMasking from "../admin/AdminMasking";
import AdminMemberRestore from "../admin/AdminMemberRestore";
import AdminMemberRestored from "../admin/AdminMemberRestored";
import AdminMemberDelete from "../admin/AdminMemberDelete";
import AdminMemberDeleted from "../admin/AdminMemberDeleted";
import AdminBoards from "../admin/AdminBoards";
import AdminBoardData from "../admin/AdminBoardData";
import AdminBoardDelete from "../admin/AdminBoardDelete";
import AdminCategory from "../admin/AdminCategory";
import AdminCategoryPlus from "../admin/AdminCategoryPlus";
import AdminCategoryDelete from "../admin/AdminCategoryDelete";
import AdminPlants from "../admin/AdminPlants";
import AdminPlantsPlus from "../admin/AdminPlantsPlus";
import AdminPlantsEdit from "../admin/AdminPlantsEdit";
import AdminNotices from "../admin/AdminNotices";
import AdminNoticesPlus from "../admin/AdminNoticesPlus";
import AdminNoticeEdit from "../admin/AdminNoticeEdit";
import AdminDash from "../admin/AdminDash";

export const AdminRoutes = [
  <Route key="admin" path="/admin" element={<Admin />} />,
  <Route key="admin-plus" path="/admin/plus" element={<AdminPlus />} />,

  //회원관리
  <Route key="admin-member" path="/admin/member" element={<AdminMembers />} />,
  <Route
    key="admin-masking"
    path="/admin/masking"
    element={<AdminMasking />}
  />,
  <Route
    key="admin-member-restore"
    path="/admin/member/restore"
    element={<AdminMemberRestore />}
  />,
  <Route
    key="admin-member-restored"
    path="/admin/member/restored"
    element={<AdminMemberRestored />}
  />,
  <Route
    key="admin-member-delete"
    path="/admin/member/delete"
    element={<AdminMemberDelete />}
  />,
  <Route
    key="admin-member-deleted"
    path="/admin/member/deleted"
    element={<AdminMemberDeleted />}
  />,

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

  //카테고리 관리
  <Route
    key="admin-category"
    path="/admin/category"
    element={<AdminCategory />}
  />,
  <Route
    key="admin-category-plus"
    path="/admin/category/plus"
    element={<AdminCategoryPlus />}
  />,
  <Route
    key="admin-category-delete"
    path="/admin/category/delete"
    element={<AdminCategoryDelete />}
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
