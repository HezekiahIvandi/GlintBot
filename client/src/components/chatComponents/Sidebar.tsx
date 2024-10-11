import { Link } from "react-router-dom";
import ChatList from "./ChatList";

const Sidebar = () => {
  return (
    <div className="sidebar h-full flex flex-col px-[3rem] w-fit">
      <div>
        <span className="text-[0.8em] text-muted-foreground ">DASHBOARD</span>
        <div className="text-[1em] flex flex-col ml-[0.5rem] w-[130px]">
          <Link to="/">Create a new Chat</Link>
          <Link to="/"> Explore GlintBot</Link>
          <Link to="/"> Contact</Link>
        </div>
      </div>

      <hr className="my-[1rem]" />
      <div>
        <span className="text-[0.8em] text-muted-foreground ">
          RECENT CHATS
        </span>
        <div className="text-[1em] flex flex-col ml-[0.5rem] h-auto mt-[7px]">
          <ChatList />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
