import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import toast from "react-hot-toast";
import AnimatedButton from "./animated-button";
import Loading from "./loading";
import {
  SIGN_CLOUDINARY_UPLOAD,
  UPDATE_USER_IMAGE,
} from "../lib/apolloQueries";

// TODO: .env this
const cloudinaryUploadUrl =
  "https://api.cloudinary.com/v1_1/dnsihvop5/auto/upload";

const cloudinaryApiKey = "798653816451577";

//  --- Upload Component
const UploadFile = ({
  setProfileImage,
  cancelUpload,
}: {
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  cancelUpload: () => void;
}) => {
  const [signUploadMutation] = useMutation(SIGN_CLOUDINARY_UPLOAD);
  const [updateProfileImageMutation] = useMutation(UPDATE_USER_IMAGE);

  const formData = new FormData();

  const [image, setImage] = useState();
  const [uploadReady, setUploadReady] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

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
      const signResponse = await signUploadMutation();
      const { signature, timestamp } = signResponse.data.signUpload;
      formData.append("file", image);
      formData.append("api_key", cloudinaryApiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "profile_pictures");
      const uploadFile = async () => {
        const response = await fetch(cloudinaryUploadUrl, {
          method: "POST",
          body: formData,
        });
        if (response.ok === false) {
          return toast.error("Error", { position: "bottom-right" });
        } else {
          setUploadLoading(false);
          setUploadReady(false);
          toast.success("Success", { position: "bottom-right" });
        }
        return response.json();
      };
      const data = await uploadFile();
      updateProfileImageMutation({
        variables: {
          imageUrl: data.secure_url,
        },
      });
      setUploadLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (uploadLoading) return <Loading />;

  return (
    <>
      {!uploadReady ? (
        <input type="file" onChange={onChange} />
      ) : (
        <>
          <AnimatedButton
            onClick={onSubmit}
            className="bg-green-600 mx-2 text-secondary px-3 py-2 my-4 rounded-xl"
          >
            Confirm
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {
              cancelUpload();
              setUploadReady(false);
            }}
            className="bg-red-600 mx-2 text-secondary px-3 py-2 my-4 rounded-xl"
          >
            Cancel
          </AnimatedButton>
        </>
      )}
    </>
  );
};

export default UploadFile;
