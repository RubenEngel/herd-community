import React, { useContext, useEffect } from "react";
import AnimatedButton from "../components/animated-button";
import router from "next/router";
import { AuthContext } from "../components/context/auth-provider";
import { supabase } from "../lib/supabase";
import DetailEditor from "../components/detail-editor";

const MyAccount = () => {
  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!userAuth) {
      router.push("/");
    }
  }, [userAuth]);

  if (!userAuth) {
    return <h1 className="mt-36 text-center">Sign in to view this page</h1>;
  }

  return (
    <>
      <>
        <div className="mb-5 text-center">
          <h1 className="mb-3 text-2xl uppercase">My Account</h1>
          <p className="mb-2 font-serif">({userAuth.email})</p>
          <AnimatedButton
            // variant="red-outline"
            className="mx-4 font-serif text-red-600"
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Sign Out
          </AnimatedButton>
        </div>
        <DetailEditor />
        <div className="flex flex-col items-center text-center">
          <div className="mt-14 mb-10">{/* <SelectUsername /> */}</div>
        </div>
      </>
    </>
  );
};

export default MyAccount;
