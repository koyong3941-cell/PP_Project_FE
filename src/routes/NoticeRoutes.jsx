import { Route } from "react-router-dom";

import Notice from "../notice/Notice";

export const NoticeRoutes = [
  <Route key="notice" path="/notice" element={<Notice />} />,
];
