import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import "./App.css";

import SignUp from "./signup/SignUp";
import Login from "./login/login";

import Admin from "./admin/Admin";
import AdminMembers from "./admin/AdminMembers";
import AdminBoards from "./admin/AdminBoards";
import AdminPlants from "./admin/AdminPlants";
import AdminPlantsPlus from "./admin/AdminPlantsPlus";
import AdminNotices from "./admin/AdminNotices";
import AdminNoticesPlus from "./admin/AdminNoticesPlus";
import AdminNoticeEdit from "./admin/AdminNoticeEdit";
import AdminDash from "./admin/AdminDash";
import Board from "./board/Board";
import BoardDetail from "./board/BoardDetail";
import BoardWrite from "./board/BoardWrite";
import BoardChage from "./board/BoardChange";
import Notice from "./notice/Notice";
import ProfileEdit from "./mypage/ProfileEdit";
import MyPage from "./mypage/MyPage";

// Layout용 Outlet
import { Outlet } from "react-router-dom";
import Main_2 from "./main/Main_3";
import Main from "./main/Main";
import AdminMembers from "./admin/AdminMembers";
import AdminBoards from "./admin/AdminBoards";
import AdminPlants from "./admin/AdminPlants";
import AdminPlantsPlus from "./admin/AdminPlantsPlus";
import AdminNotices from "./admin/AdminNotices";
import AdminNoticesPlus from "./admin/AdminNoticesPlus";
import AdminNoticeEdit from "./admin/AdminNoticeEdit";
import AdminPlantsPlus from "./admin/AdminPlantsPlus";
import AdminPlantsEdit from "./admin/AdminPlantsEdit";
import AdminCategory from "./admin/AdminCategory";
import AdminPlus from "./admin/AdminPlus";
import Main_3 from "./main/Main_3";
import { Main } from "./admin/admin.style";
import AdminMemberDelete from "./admin/AdminMemberDelete";
import AdminMasking from "./admin/AdminMasking";
import AdminMemberRestore from "./admin/AdminMemberRestore";
import AdminBoardDelete from "./admin/AdminBoardDelete";
import AdminBoardData from "./admin/AdminBoardData";
import AdminCategoryPlus from "./admin/AdminCategoryPlus";
import AdminCategoryDelete from "./admin/AdminCategoryDelete";
import PlantSearch from "./plant/PlantSearch";
import PlantDetail from "./plant/PlantDetail";
import PlantDetail1 from "./plant/PlantDetail2";
import PlantDetail2 from "./plant/PlantDetail1_2";

function MainLayout() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function EmptyLayout() {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Header/Footer 있는 페이지 */}
      <Route element={<MainLayout />}>
        <Route path="/2" element={<Main_3 />} />
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:boardNo" element={<BoardDetail />} />
        <Route path="/board/:boardNo/edit" element={<BoardChage />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/plantSearch" element={<PlantSearch />} />

        <Route path="/plants/:plantNo" element={<PlantDetail2 />} />
      </Route>

      {/* Header/Footer 없는 페이지 */}
      <Route element={<EmptyLayout />}>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/plus" element={<AdminPlus />} />
        <Route path="/admin/member/delete" element={<AdminMemberDelete />} />
        {/* <Route path="/member" element={<Members />} /> */}
        <Route path="/admin/member" element={<AdminMembers />} />
        <Route path="/admin/masking" element={<AdminMasking />} />
        <Route path="/admin/member/restore" element={<AdminMemberRestore />} />
        <Route path="/admin/board" element={<AdminBoards />} />
        <Route path="/admin/board/data" element={<AdminBoardData />} />
        <Route path="/admin/board/delete" element={<AdminBoardDelete />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/admin/category/plus" element={<AdminCategoryPlus />} />
        <Route
          path="/admin/category/delete"
          element={<AdminCategoryDelete />}
        />
        <Route path="/admin/plant" element={<AdminPlants />} />
        <Route path="/admin/plant/plus" element={<AdminPlantsPlus />} />
        <Route path="/admin/plant/edit" element={<AdminPlantsEdit />} />
        <Route path="/admin/notice" element={<AdminNotices />} />
        <Route path="/admin/notice/plus" element={<AdminNoticesPlus />} />
        <Route path="/admin/notice/edit" element={<AdminNoticeEdit />} />
        <Route path="/admin/dash" element={<AdminDash />} />
      </Route>
    </Routes>
  );
}

export default App;
