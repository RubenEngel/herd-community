import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { UPDATE_USER_DETAILS } from "../lib/gql-queries";
import { useApolloToast } from "../lib/hooks/use-apollo-toast";
import { authHeaders } from "../lib/supabase";
import { PrismaUser } from "../lib/types";
import AnimatedButton from "./animated-button";
import { AuthContext } from "./context/auth-provider";
import InputBox, { InputBoxVariant } from "./input-box";

const InputContainer = ({ children }) => <div className="my-7">{children}</div>;

const OverlayDetailEditor: React.FC<{}> = () => {
  const { userData, setUserData } = useContext(AuthContext);

  const [editedData, setEditedData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    username: userData?.username || "",
  });

  const [isEdited, setIsEdited] = useState(false);

  const [isComplete, setIsComplete] = useState(
    Boolean(editedData.firstName && editedData.lastName && editedData.username)
  );

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
    if (editedData?.firstName && editedData?.lastName && editedData?.username) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [editedData]);

  const [updateUserDetails, { data, loading, error }] = useMutation(
    UPDATE_USER_DETAILS,
    {
      context: authHeaders(),
    }
  );

  useApolloToast(data, loading, error);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof Pick<PrismaUser, "firstName" | "lastName" | "username">
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
    const updateDetailsResponse = await updateUserDetails({
      variables: {
        ...editedData,
      },
    });
    setUserData({ ...userData, ...updateDetailsResponse?.data?.updateUser });
    setIsEdited(false);
  };

  return (
    <>
      <div>
        <InputContainer>
          <label className="text-secondary pl-2 font-serif text-sm">
            First Name
          </label>
          <div>
            <InputBox
              variant={InputBoxVariant.dark}
              type="text"
              id="firstName"
              value={editedData?.firstName}
              onChange={(e) => handleChange(e, "firstName")}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <label className="text-secondary pl-2 font-serif text-sm">
            Last Name
          </label>
          <div>
            <InputBox
              variant={InputBoxVariant.dark}
              type="text"
              id="lastName"
              value={editedData?.lastName}
              onChange={(e) => handleChange(e, "lastName")}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <label className="text-secondary pl-2 font-serif text-sm">
            Username
          </label>
          <div>
            <InputBox
              variant={InputBoxVariant.dark}
              type="text"
              id="username"
              value={editedData?.username}
              onChange={(e) => handleChange(e, "username")}
            />
          </div>
        </InputContainer>
      </div>
      {isEdited && isComplete && (
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
