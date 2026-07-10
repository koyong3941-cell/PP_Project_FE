import { Route } from "react-router-dom";
import NoticeDetail from "../notice/NoticeDetail";
import Notice from "../notice/Notice";

export const NoticeRoutes = [
  <Route key="notice" path="/notice" element={<Notice />} />,
  <Route
    key="notice-detail"
    path="/notice/:noticeNo"
    element={<NoticeDetail />}
  />,
];
