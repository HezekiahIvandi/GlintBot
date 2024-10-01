import { read } from "fs";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { Upload as UploadIcon } from "lucide-react";
import { useRef } from "react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

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
type SetImageFunction = React.Dispatch<React.SetStateAction<ImageObjectType>>;

interface UploadCompProps {
  setImg: SetImageFunction;
}

const UploadComp: React.FC<UploadCompProps> = ({ setImg }) => {
  const onError = (err: object) => {
    console.log("Error", err);
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, imageData: res }));
  };

  const onUploadProgress = (progress: any) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Start", evt);

    const file = evt.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data:
              typeof reader.result === "string"
                ? reader.result.split(",")[1]
                : "",
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const ikUploadRef = useRef<HTMLInputElement>(null);
  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      <label
        className="cursor-pointer"
        onClick={() => ikUploadRef.current?.click()}
      >
        <UploadIcon />
      </label>
    </IKContext>
  );
};

export default UploadComp;
