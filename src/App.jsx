import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import "./App.css";

import SignUp from "./signup/SignUp";
import Login from "./login/login";
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
        <Route path="/2" element={<Main_2 />} />
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
      </Route>
    </Routes>
  );
}

export default App;
