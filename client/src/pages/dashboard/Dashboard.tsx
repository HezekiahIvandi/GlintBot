const Dashboard = () => {
  return (
    <div className="flex flex-col items-center h-[100%] w-full">
      <div className="texts flex-1 w-1/2">
        <div className="options flex justify-between mx-[20%]">
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
      <div className="formContainer mt-auto w-full">
        <form action="">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="w-1/2 bg-muted-foreground rounded-lg text-primary-foreground placeholder-muted px-[1rem] py-[0.5rem]"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
