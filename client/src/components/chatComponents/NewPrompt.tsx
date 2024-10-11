import { Send, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UploadComp from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "@/lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = () => {
  //Variables's states
  interface ImageObjectType {
    isLoading: boolean;
    error: string;
    imageData: {
      filePath?: string;
    };
    aiData?: {
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
  const [question, setQuestion] = useState<string>("");
  const [ans, setAns] = useState<string>("");

  //importing env variables
  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;

  //Auto stroll to latest chat
  const endRef: any = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, ans]);

  //Define model
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });
  //<<---------------------------------- Functions --------------------------------------------->>//

  //Ask model question
  const askModel = async (text: string) => {
    setQuestion(text);
    console.log("Question: ", text);

    let content: any[];
    if (img.aiData?.inlineData) {
      //Question related to image upload
      content = [img.aiData, text];
    } else {
      //Just a standalone question
      content = [text];
    }

    try {
      console.log("content: ", content);
      const result = await chat.sendMessageStream(content);

      // Print text as it comes in.
      let text = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        setAns(text);
      }

      setImg({
        isLoading: false,
        error: "",
        imageData: {},
        aiData: {},
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    e.target.text.value = "";
    askModel(text);
  };

  console.log("test", img.imageData);

  //htmls
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
