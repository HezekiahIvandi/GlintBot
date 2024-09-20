import NewPrompt from "@/layouts/dashboardLayout/NewPrompt";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center h-[100%] w-full">
      <div className="texts flex-1">
        <div className="flex-1 options flex mx-[2rem] gap-[10px] items-center justify-center">
          <div className="option">
            <img src="" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="" alt="" />
            <span>Help me with my Codes</span>
          </div>
        </div>
      </div>
      <div className="formContainer mt-auto w-full relative">
        <div>
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
