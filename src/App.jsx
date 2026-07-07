import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import "./App.css";

import SignUp from "./signup/SignUp";
import Login from "./login/login";

import Admin from "./admin/Admin";
import Board from "./board/Board";
import BoardDetail from "./board/BoardDetail";
import BoardWrite from "./board/BoardWrite";
import BoardChage from "./board/BoardChange";
import Notice from "./notice/Notice";
import ProfileEdit from "./mypage/ProfileEdit";
import MyPage from "./mypage/MyPage";
import Main from "./main/Main";

// Layout용 Outlet
import { Outlet } from "react-router-dom";
import AdminMembers from "./admin/AdminMembers";
import AdminBoards from "./admin/AdminBoards";
import AdminPlants from "./admin/AdminPlants";
import AdminNotices from "./admin/AdminNotices";
import AdminDash from "./admin/AdminDash";
import AdminNoticesPlus from "./admin/AdminNoticesPlus";
import AdminNoticeEdit from "./admin/AdminNoticeEdit";
import AdminPlantsPlus from "./admin/AdminPlantsPlus";

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
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:boardNo" element={<BoardDetail />} />
        <Route path="/board/:boardNo/edit" element={<BoardChage />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/notice" element={<Notice />} />
      </Route>

      {/* Header/Footer 없는 페이지 */}
      <Route element={<EmptyLayout />}>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/member" element={<Members />} /> */}
        <Route path="/admin/member" element={<AdminMembers />} />
        <Route path="/admin/board" element={<AdminBoards />} />
        <Route path="/admin/plant" element={<AdminPlants />} />
        <Route path="/admin/plant/plus" element={<AdminPlantsPlus />} />
        <Route path="/admin/notice" element={<AdminNotices />} />
        <Route path="/admin/notice/plus" element={<AdminNoticesPlus />} />
        <Route path="/admin/notice/edit" element={<AdminNoticeEdit />} />
        <Route path="/admin/dash" element={<AdminDash />} />
      </Route>
    </Routes>
  );
}

export default App;
