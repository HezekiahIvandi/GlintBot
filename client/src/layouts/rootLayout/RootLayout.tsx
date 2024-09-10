import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
