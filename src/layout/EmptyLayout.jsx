import { Outlet } from "react-router-dom";

function EmptyLayout() {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
}

export default EmptyLayout;
