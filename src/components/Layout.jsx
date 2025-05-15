// react-router-dom
import { Outlet } from "react-router-dom";
// components
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="site-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
