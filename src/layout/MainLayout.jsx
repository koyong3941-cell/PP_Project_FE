import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
