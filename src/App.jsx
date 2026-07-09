import { Route, Routes } from "react-router-dom";
import "./App.css";

// Layout용 Outlet
import EmptyLayout from "./layout/EmptyLayout";
import MainLayout from "./layout/MainLayout";
import {
  AdminRoutes,
  BoardRoutes,
  MainRoutes,
  MemberRoutes,
  MyPageRoutes,
  NoticeRoutes,
  PlantRoutes,
} from "./routes";

function App() {
  return (
    <Routes>
      {/* Header/Footer 있는 페이지 */}
      <Route element={<MainLayout />}>
        {MainRoutes}
        {MemberRoutes}
        {BoardRoutes}
        {PlantRoutes}
        {NoticeRoutes}
      </Route>

      {/* Header/Footer 없는 페이지 */}
      <Route element={<EmptyLayout />}>
        {AdminRoutes}
        {MyPageRoutes}
      </Route>
    </Routes>
  );
}

export default App;
