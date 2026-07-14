import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 로그인 안 된 경우
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ADMIN이 아닌 경우
  if (role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  // 통과하면 자식 라우트들 렌더링
  return <Outlet />;
};

export default AdminRoute;
