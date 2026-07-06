import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import "./App.css";

import SignUp from "./signup/SignUp";
import Login from "./login/login";
import ProfileEdit from "./mypage/ProfileEdit";
import MyPage from "./mypage/MyPage";

// Layout용 Outlet
import { Outlet } from "react-router-dom";

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
        <Route path="/" element={<h1>메인 콘텐츠 영역입니다.</h1>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
      </Route>

      {/* Header/Footer 없는 페이지 */}
      <Route element={<EmptyLayout />}>
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
