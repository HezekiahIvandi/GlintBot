import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <div className="root-layout h-full flex flex-col">
      <Navbar />
      <main className="pt-[2rem] h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
