import { Send, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UploadComp from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "@/lib/gemini";

const NewPrompt = () => {
  //importing env variables
  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
  //Images state
  interface ImageObjectType {
    isLoading: boolean;
    error: string;
    imageData: {
      filePath?: string;
    };
  }

  const [img, setImg] = useState<ImageObjectType>({
    isLoading: false,
    error: "",
    imageData: {},
  });

  //Auto stroll to latest chat
  const endRef: any = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [question, setQuestion] = useState<string>("");
  const [ans, setAns] = useState<string>("");
  //model request
  const add = async (text: string) => {
    setQuestion(text);
    console.log(question);
    const result = await model.generateContent(question);
    const response = result.response.text();
    setAns(response);
    console.log(result.response.text());
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text);
  };
  return (
    <>
      {img.isLoading && <div className="message">Loading...</div>}
      {img.imageData?.filePath && (
        <IKImage
          className="message"
          urlEndpoint={urlEndpoint}
          path={img.imageData?.filePath}
          transformation={[
            {
              width: "300",
            },
          ]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {ans && <div className="message">{ans}</div>}
      <div ref={endRef} className="pb-[100px]" />;
      <div className="flex mt-[1rem] justify-center items-center absolute bottom-0 w-full">
        <form
          action=""
          className="flex gap-[20px] w-[70%] justify-center items-center bg-primary-foreground rounded-lg p-[1.2rem]"
          onSubmit={handleSubmit}
        >
          <UploadComp setImg={setImg} />
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

export default NewPrompt;
