import { Send, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UploadComp from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "@/lib/gemini";
import Markdown from "react-markdown";
import { error } from "console";

const NewPrompt = () => {
  const [question, setQuestion] = useState<string>("");
  const [ans, setAns] = useState<string>("");
  //importing env variables
  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
  //Images state
  interface ImageObjectType {
    isLoading: boolean;
    error: string;
    imageData: {
      filePath?: string;
    };
    aiData: {
      inlineData?: {
        data: string;
        mimeType: string;
      };
    };
  }

  const [img, setImg] = useState<ImageObjectType>({
    isLoading: false,
    error: "",
    imageData: {},
    aiData: {},
  });

  //Auto stroll to latest chat
  const endRef: any = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, ans]);

  //model request
  const add = async (text: string) => {
    setQuestion(text);
    console.log(text);

    let content: any[];
    if (img.aiData) {
      content = [img.aiData, text];
    } else {
      content = [text];
    }

    try {
      const result = await model.generateContent(content);
      const response = result.response.text();
      setAns(response);
      setImg({
        isLoading: false,
        error: "",
        imageData: {},
        aiData: {},
      });
      console.log(result.response.text());
    } catch (e) {
      console.error(e);
    }
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
      {ans && (
        <div className="message">
          <Markdown>{ans}</Markdown>
        </div>
      )}
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
