import { useEffect, useRef } from "react";
import "./Chat.css";
import NewPrompt from "@/layouts/dashboardLayout/NewPrompt";
const ChatPage = () => {
  return (
    <div className="chat-container h-full flex flex-col items-center relative">
      <div className="wrapper flex flex-col flex-1 w-full items-center overflow-scroll">
        <div className="chat w-[80%] flex flex-col items-center">
          <div className="message user">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
            obcaecati aperiam id, corrupti animi tempore temporibus fuga ipsa
            possimus doloremque!hello im user
          </div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <div className="message user">hello im user</div>
          <div className="message">hello im AI</div>
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
