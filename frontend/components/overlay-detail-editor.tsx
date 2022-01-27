import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UPDATE_USER_DETAILS } from "../lib/gql-queries";
import { authHeaders } from "../lib/supabase";
import { PrismaUser } from "../lib/types";
import AnimatedButton from "./animated-button";
import { UserContext } from "./context/auth-provider";
import InputBox from "./input-box";
import UserCard from "./user-card";

const InputContainer = ({ children }) => <div className="my-7">{children}</div>;

const OverlayDetailEditor: React.FC<{}> = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [editedData, setEditedData] = useState(userData);

  const [isEdited, setIsEdited] = useState(false);

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (editedData !== userData) {
      setIsEdited(true);
    }
    if (editedData?.firstName && editedData?.lastName && editedData?.username) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [editedData]);

  const [updateUserDetails, { loading }] = useMutation(UPDATE_USER_DETAILS, {
    context: authHeaders(),
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof PrismaUser
  ) => {
    setEditedData({
      ...editedData,
      [key]: event.target.value,
    });
    if (userData[key] !== event.target.value) {
      setIsEdited(true);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updateDetailsResponse = await updateUserDetails({
        variables: {
          ...editedData,
        },
      });
      setUserData({ ...userData, ...updateDetailsResponse?.data?.updateUser });
      setIsEdited(false);
      toast.success("Updated");
    } catch (error) {
      toast.error("Couldn't update");
    }
  };

  return (
    <>
      <div>
        <InputContainer>
          <label className="text-secondary font-serif text-sm pl-2">
            First Name
          </label>
          <div>
            <InputBox
              dark
              type="text"
              id="firstName"
              value={editedData?.firstName}
              onChange={(e) => handleChange(e, "firstName")}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <label className="text-secondary font-serif text-sm pl-2">
            Last Name
          </label>
          <div>
            <InputBox
              dark
              type="text"
              id="lastName"
              value={editedData?.lastName}
              onChange={(e) => handleChange(e, "lastName")}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <label className="text-secondary font-serif text-sm pl-2">
            Username
          </label>
          <div>
            <InputBox
              dark
              type="text"
              id="username"
              value={editedData?.username}
              onChange={(e) => handleChange(e, "username")}
            />
          </div>
        </InputContainer>
      </div>
      {isEdited && complete && (
        <div className="mt-4">
          <AnimatedButton
            variant="green-outline"
            className="mx-2"
            onClick={() => handleSaveChanges()}
            disabled={loading}
          >
            Save Changes
          </AnimatedButton>
        </div>
      )}
    </>
  );
};

export default OverlayDetailEditor;
