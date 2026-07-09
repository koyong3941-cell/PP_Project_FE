import { Route } from "react-router-dom";

import Main from "../main/Main";
import Main_2 from "../main/Main_3";

export const MainRoutes = [
  <Route key="main" path="/" element={<Main />} />,
  <Route key="main2" path="/2" element={<Main_2 />} />,
];
