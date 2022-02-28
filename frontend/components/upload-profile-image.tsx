import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import AnimatedButton from "./animated-button";
import Loading from "./loading";
import { FiEdit3 } from "react-icons/fi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { AuthContext } from "./context/auth-provider";
import { authHeaders } from "../lib/supabase";
import {
  useSignCloudinaryUploadMutation,
  useUpdateUserImageMutation,
} from "../lib/generated/graphql-types";

const cloudinaryUploadUrl = process.env.CLOUDINARY_UPLOAD_URL;

const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;

// --- Upload Component
const UploadProfileImage = ({
  setProfileImage,
  cancelUpload,
}: {
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  cancelUpload: () => void;
}) => {
  const [signUploadMutation] = useSignCloudinaryUploadMutation({
    context: authHeaders(),
  });
  const [updateProfileImageMutation] = useUpdateUserImageMutation({
    context: authHeaders(),
  });

  const formData = new FormData();

  const [image, setImage] = useState();
  const [uploadReady, setUploadReady] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const { userData, updateUserData } = useContext(AuthContext);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(file);
        setProfileImage(reader.result);
        setUploadReady(true);
      }
    };
  };

  const onChange = async ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    if (validity.valid) {
      previewFile(file);
    }
  };

  const onSubmit = async () => {
    try {
      setUploadLoading(true);
      const signResponse = await signUploadMutation({
        variables: {
          publicId: String(userData.id),
          transforms: "c_fill,w_200,h_200,q_auto,f_jpg",
        },
      });
      const { signature, timestamp, transforms, publicId } =
        signResponse.data.signUpload;
      formData.append("file", image);
      formData.append("api_key", cloudinaryApiKey);
      formData.append("eager", transforms);
      formData.append("folder", "profile_pictures");
      formData.append("public_id", publicId);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);

      const uploadFile = async () => {
        const response = await fetch(cloudinaryUploadUrl, {
          method: "POST",
          body: formData,
        });
        if (response.ok === true) {
          setUploadLoading(false);
          setUploadReady(false);
          toast.success("Success");
        } else {
          throw new Error("Failed to upload image");
        }
        return response.json();
      };
      const data = await uploadFile();
      console.log(data);
      const newImageUrlData = await updateProfileImageMutation({
        variables: {
          imageUrl: data.eager[0].secure_url,
        },
      });
      if (newImageUrlData) {
        updateUserData();
      }
      setUploadLoading(false);
    } catch (error) {
      console.error(error);
      cancelUpload();
      setUploadLoading(false);
      setUploadReady(false);
      toast.error("Failed to upload");
    }
  };

  const startUploadRef = useRef(null);

  if (uploadLoading) return <Loading />;

  return (
    <>
      {!uploadReady ? (
        <>
          <AnimatedButton
            className="bg-primary text-secondary cursor-pointer rounded-full p-3 text-2xl shadow-lg"
            onClick={() => startUploadRef.current.click()}
          >
            <FiEdit3 />
          </AnimatedButton>
          <input
            className="hidden"
            type="file"
            id="file-upload"
            onChange={(e) => onChange(e)}
            ref={startUploadRef}
          />
        </>
      ) : (
        <div className="relative left-2 flex">
          <AnimatedButton
            onClick={() => onSubmit()}
            className="text-secondary rounded-full bg-green-600 p-3"
          >
            <FaCheck />
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {
              cancelUpload();
              setUploadReady(false);
            }}
            className="text-secondary rounded-full bg-red-600 p-3"
          >
            <FaTimes />
          </AnimatedButton>
        </div>
      )}
    </>
  );
};

export default UploadProfileImage;
