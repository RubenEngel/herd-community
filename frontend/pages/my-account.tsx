import React from "react";
import SignIn from "../components/sign-in";
// import SelectUsername from "../components/select-username";

import { UserContext } from "../lib/context";
import { FaUserCircle } from "react-icons/fa";
// import Button from '../components/button';
// import { useQuery } from '@apollo/client';
// import { GET_USER } from '../lib/apolloQueries';
// import Loading from '../components/loading';

const MyAccount = () => {
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <h1 className="text-center text-2xl">My Account</h1>
      {!user && (
        <div className="flex items-center h-50-screen">
          <SignIn />
        </div>
      )}
      {user && (
        <div className="flex flex-col items-center m-6 text-center">
          {/* Profile Picture */}
          <div>
            {user.photoURL ? (
              <img className="rounded-full" src={user.photoURL} />
            ) : (
              <FaUserCircle className="text-9xl " />
            )}
          </div>
          {/* User details */}
          <div className="mb-4 mt-7">
            <p className="text-xl">{user.email}</p>
            <p>{user.displayName}</p>
          </div>
          {/* <div className="flex m-4">
            <Button onClick={() => console.log("hello")}>Upload</Button>

            <Button>Remove</Button>
          </div>

          <SelectUsername /> */}
        </div>
      )}
    </>
  );
};

export default MyAccount;
