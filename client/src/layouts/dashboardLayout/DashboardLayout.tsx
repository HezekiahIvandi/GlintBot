import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/chatComponents/Sidebar";
const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && isLoaded) {
      navigate("/sign-in");
    }
  }, [userId, isLoaded, navigate]);

  if (!isLoaded) return "Loading...";
  return (
    <div className="dashboard-layout h-full flex">
      <div className="menu h-full">
        <Sidebar />
      </div>
      <div className="content bg-muted w-full h-full px-[2rem] py-[2rem] rounded-[7px]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
