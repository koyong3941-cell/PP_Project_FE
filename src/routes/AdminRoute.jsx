import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

<<<<<<< HEAD
  // 로그인 안 된 경우 → 권한 문제로 ErrorPage 이동
  if (!token) {
    return (
      <Navigate
        to="/error"
        replace
        state={{
          title: "로그인이 필요합니다.",
          description:
            "로그인 후 이용 가능한 페이지입니다.\n로그인 후 다시 시도해주세요.",
        }}
      />
    );
  }

  // ADMIN이 아닌 경우 → 권한 문제로 ErrorPage 이동
  if (role !== "ROLE_ADMIN") {
    return (
      <Navigate
        to="/error"
        replace
        state={{
          title: "접근 권한이 없습니다.",
          description: "관리자만 접근할 수 있는 페이지입니다.",
        }}
      />
    );
  }

=======
  // 로그인 안 된 경우
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ADMIN이 아닌 경우
  if (role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  // 통과하면 자식 라우트들 렌더링
>>>>>>> main
  return <Outlet />;
};

export default AdminRoute;
