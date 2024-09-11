import { Send, Upload } from "lucide-react";
import { useEffect, useRef } from "react";

const NewPrompt = () => {
  const endRef: any = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div ref={endRef} className="pb-[100px]" />;
      <div className="flex mt-[1rem] justify-center items-center absolute bottom-0 w-full">
        <form
          action=""
          className="flex gap-[20px] w-[70%] justify-center items-center bg-primary-foreground rounded-lg p-[1.2rem]"
        >
          <label htmlFor="file" className="cursor-pointer">
            <Upload />
          </label>
          <input id="file" type="file" multiple={false} hidden />
          <input
            type="text"
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

export default NewPrompt;
