import { Route } from "react-router-dom";

import Notice from "../notice/Notice";
import NoticeDetail from "../notice/NoticeDetail";

export const NoticeRoutes = [
  <Route key="notice" path="/notice" element={<Notice />} />,
  <Route
    key="notice-detail"
    path="/notice/:noticeNo"
    element={<NoticeDetail />}
  />,
];
