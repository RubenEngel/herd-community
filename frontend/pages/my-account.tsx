import React, {useContext, useEffect} from "react";
// import SignIn from "../components/sign-in";
// import SelectUsername from "../components/select-username";
import { UserContext, SignInContext } from "../lib/context";
import { FaUserCircle } from "react-icons/fa";
// import Button from '../components/button';
// import { useQuery } from '@apollo/client';
// import { GET_USER } from '../lib/apolloQueries';
// import Loading from '../components/loading';

const MyAccount = () => {
  const {userAuth, userData} = useContext(UserContext);
  const setShowSignIn = useContext(SignInContext)

  useEffect(() => {
    if (!userAuth) {
      setShowSignIn(true)
    }
  }, [userAuth])

  return (
    <>
      {userAuth ? (
        <>
        <h1 className="text-center text-2xl uppercase">My Account</h1>
        <div className="flex flex-col items-center m-6 text-center">
          {/* Profile Picture */}
          <div>
            {userData?.imageUrl ? (
              <img className="rounded-full" src={userAuth.photoURL} />
            ) : (
              <FaUserCircle className="text-9xl " />
            )}
          </div>
          {/* User details */}
          <div className="mb-4 mt-7">
            <p className="text-xl">{userAuth.email}</p>
            <p>{`${userData?.firstName}${" " + userData?.lastName }`}</p>
          </div>
          {/* <div className="flex m-4">
            <Button onClick={() => console.log("hello")}>Upload</Button>

            <Button>Remove</Button>
          </div>

          <SelectUsername /> */}
        </div>
        </>
      ) :
      <h1 className="text-center mt-36">Sign in to view this page</h1>
      }
    </>
  );
};

export default MyAccount;
