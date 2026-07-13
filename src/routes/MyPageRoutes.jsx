import { Route } from "react-router-dom";

import MyPage from "../mypage/MyPage";

export const MyPageRoutes = [
  // 마이페이지 헤더 푸터가 없어서 따로 분리
  <Route key="mypage" path="/mypage" element={<MyPage />} />,
];
