import { Send} from "lucide-react";
import { useEffect, useRef} from "react";

const DashboardPrompt = () => {
  //Auto stroll to latest chat
  const endRef: any = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const text = e.target.text.value;
    if(!text) return;
    console.log("client: ", text);
    
    try{
        const response = await fetch('http://localhost:3002/api/v1/chat', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: text
            })
        });
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
  };



  
  //htmls
  return (
    <>
      <div ref={endRef} className="pb-[100px]" />;
      <div className="flex mt-[1rem] justify-center items-center absolute bottom-0 w-full">
        <form
          action=""
          className="flex gap-[20px] w-[70%] justify-center items-center bg-primary-foreground rounded-lg p-[1.2rem]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="text"
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent outline-none"
          />
          <button type="submit">
            <Send />
          </button>
        </form>
      </div>
    </>
  );
};

export default DashboardPrompt;
