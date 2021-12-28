import React, { useContext, useEffect, useState } from "react";
// import SignIn from "../components/sign-in";
// import SelectUsername from "../components/select-username";
import { UserContext, SignInContext } from "../lib/context";
import { FaUserCircle } from "react-icons/fa";
import firebase from "../lib/firebase";
import AnimatedButton from "../components/button";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";
// import { UPLOAD_PROFILE_IMAGE } from "../lib/apolloQueries";
// import { useQuery } from '@apollo/client';
// import { GET_USER } from '../lib/apolloQueries';
// import Loading from '../components/loading';

const UploadFile = () => {
  const [mutate, { loading, error }] = useMutation(gql`
    mutation ($file: Upload!) {
      singleUpload(file: $file) {
        filename
        mimetype
        encoding
        url
      }
    }
  `);

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    validity.valid && mutate({ variables: { file } });
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <>
      <input type="file" onChange={onChange} />
    </>
  );
};

const MyAccount = () => {
  const { userAuth, userData } = useContext(UserContext);
  const setShowSignIn = useContext(SignInContext);

  useEffect(() => {
    if (!userAuth) {
      setShowSignIn(true);
    }
  }, [userAuth]);

  const [previewSource, setPreviewSource] = useState<string>();

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     if (typeof reader.result === "string") {
  //       setPreviewSource(reader.result);
  //     }
  //   };
  // };

  return (
    <>
      {userAuth ? (
        <>
          <h1 className="text-center text-2xl uppercase">My Account</h1>
          <div className="flex flex-col items-center m-6 text-center">
            {/* Profile Picture */}
            <div>
              {previewSource && <img src={previewSource} alt="" />}
              {userData?.imageUrl ? (
                <img
                  className="rounded-full w-32 shadow-lg"
                  src={userData.imageUrl}
                />
              ) : (
                <FaUserCircle className="text-9xl " />
              )}
            </div>
            {/* <input type="file" name="image" onChange={handleSubmit} /> */}
            {/* <UploadFile /> */}
            {/* <Button onClick={handleSubmitFile}>Upload</Button> */}
            {/* <Button>Remove</Button> */}
            {/* User details */}
            <div className="mt-10">
              <label>Email</label>
              <p className="mb-5">{userData.email}</p>
              <label>Name</label>
              <p>{`${userData?.firstName}${" " + userData?.lastName}`}</p>
            </div>
            {/* <SelectUsername /> */}
            <AnimatedButton
              className="bg-red-500  py-1 px-2 rounded-lg shadow-md hover:shadow-lg text-secondary mt-11"
              onClick={() => {
                router.push("/home");
                firebase.auth().signOut();
              }}
            >
              Sign Out
            </AnimatedButton>
          </div>
        </>
      ) : (
        <h1 className="text-center mt-36">Sign in to view this page</h1>
      )}
    </>
  );
};

export default MyAccount;
