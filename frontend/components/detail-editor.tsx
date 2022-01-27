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

const InputContainer = ({ children }) => <div className="my-3">{children}</div>;

const DetailEditor = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [editedData, setEditedData] = useState(userData);

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (
      editedData.firstName !== userData.firstName ||
      editedData.lastName !== userData.lastName ||
      editedData.username !== userData.username
    ) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [editedData]);

  const [updateUserDetails, { loading, error }] = useMutation(
    UPDATE_USER_DETAILS,
    {
      context: authHeaders(),
    }
  );

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
      console.log("updatedDetails", updateDetailsResponse?.data?.updateUser);
      setUserData({ ...userData, ...updateDetailsResponse?.data?.updateUser });
      setIsEdited(false);
      toast.success("Updated");
    } catch (error) {
      if (String(error).toLowerCase().includes("unique")) {
        throw toast.error("Username taken");
      }
      throw toast.error("Couldn't update");
    }
  };

  const handleCancelChanges = () => {
    setUserData(userData);
    setEditedData(userData);
    setIsEdited(false);
  };

  return (
    <>
      <div className="mb-3">
        <UserCard editable={true} linked={false} user={editedData} />
      </div>
      <div className="flex flex-col justify-center items-center mb-8">
        <InputContainer>
          <label className="font-serif text-sm pl-2">First Name</label>
          <div>
            <InputBox
              type="text"
              id="firstName"
              value={editedData?.firstName}
              onChange={(e) => handleChange(e, "firstName")}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <label className="font-serif text-sm pl-2">Last Name</label>
          <div>
            <InputBox
              type="text"
              id="lastName"
              value={editedData?.lastName}
              onChange={(e) => handleChange(e, "lastName")}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <label className="font-serif text-sm pl-2">Username</label>
          <div>
            <InputBox
              type="text"
              id="username"
              value={editedData?.username}
              onChange={(e) => handleChange(e, "username")}
            />
          </div>
        </InputContainer>
      </div>
      {isEdited && (
        <div>
          <AnimatedButton
            variant="green-outline"
            className="mx-2"
            onClick={() => handleSaveChanges()}
            disabled={loading}
          >
            Save Changes
          </AnimatedButton>
          <AnimatedButton
            variant="red-outline"
            className="mx-2"
            onClick={() => handleCancelChanges()}
            disabled={loading}
          >
            Cancel
          </AnimatedButton>
        </div>
      )}
    </>
  );
};

export default DetailEditor;
