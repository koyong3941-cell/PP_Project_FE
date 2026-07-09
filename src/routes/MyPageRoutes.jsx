import { Route } from "react-router-dom";

import MyPage from "../mypage/MyPage";

export const MyPageRoutes = [
  // 마이페이지
  <Route key="mypage" path="/mypage" element={<MyPage />} />,
];
