import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import AnimatedButton from "../components/animated-button";
import router from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import UserCard from "../components/user-card";
import { User } from "../lib/types";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_DETAILS } from "../lib/apolloQueries";

const InputBox = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => (
  <input
    {...props}
    className="border-2 md:mx-2 border-gray-300 mb-6 p-1 font-serif rounded-lg text-center w-48"
  />
);

const MyAccount = () => {
  const { userAuth, userData, setUserData } = useContext(UserContext);
  const { user } = useUser();

  useEffect(() => {
    if (!userAuth) {
      router.push("/api/auth/login");
    }
  }, [userAuth]);

  const [editedData, setEditedData] = useState(userData);

  const [edited, setEdited] = useState(false);

  const [updateUserDetails, { loading }] = useMutation(UPDATE_USER_DETAILS);

  useEffect(() => {
    if (editedData !== userData) {
      setEdited(true);
    }
  }, [editedData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof User
  ) => {
    setEditedData({
      ...editedData,
      [key]: event.target.value,
    });
    if (userData[key] !== event.target.value) {
      setEdited(true);
    }
  };

  const handleSaveChanges = async () => {
    const updatedDetails = await updateUserDetails({
      variables: {
        ...editedData,
      },
    });
    setUserData({ ...userData, ...updatedDetails });
    setEdited(false);
  };

  if (!userAuth) {
    return <h1 className="text-center mt-36">Sign in to view this page</h1>;
  }

  return (
    <>
      <>
        <div className="text-center">
          <h1 className="text-2xl uppercase mb-3">My Account</h1>
          <p className="mb-5 font-serif">({user.email})</p>
        </div>

        <div className="flex flex-col items-center m-6 text-center">
          {/* Profile Picture */}
          <UserCard editable={true} linked={false} user={editedData} />
          {/* User details */}
          <div>
            <div>
              <label>First Name</label>
              <div>
                <InputBox
                  type="text"
                  id="firstName"
                  value={editedData?.firstName}
                  onChange={(e) => handleChange(e, "firstName")}
                />
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <div>
                <InputBox
                  type="text"
                  id="lastName"
                  value={editedData?.lastName}
                  onChange={(e) => handleChange(e, "lastName")}
                />
              </div>
            </div>
            <div>
              <label>Username</label>
              <div>
                <InputBox
                  type="text"
                  id="username"
                  value={editedData?.username}
                  onChange={(e) => handleChange(e, "username")}
                />
              </div>
            </div>
          </div>
          <div className="mt-11">
            {edited && (
              <AnimatedButton
                variant="green-outline"
                className="green-outline mx-4"
                onClick={() => handleSaveChanges()}
                disabled={loading}
              >
                Save Changes
              </AnimatedButton>
            )}
            {/* <SelectUsername /> */}
            <AnimatedButton
              variant="red-outline"
              className="mx-4"
              onClick={() => {
                router.push("/api/auth/logout");
              }}
            >
              Sign Out
            </AnimatedButton>
          </div>
        </div>
      </>
    </>
  );
};

export default MyAccount;
