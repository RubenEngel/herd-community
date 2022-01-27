import React, { useContext, useEffect, useState } from "react";
import AnimatedButton from "../components/animated-button";
import router from "next/router";
import { UserContext } from "../components/context/auth-provider";
import { supabase } from "../lib/supabase";
import DetailEditor from "../components/detail-editor";

const MyAccount = () => {
  const { userAuth } = useContext(UserContext);

  useEffect(() => {
    if (!userAuth) {
      router.push("/");
    }
  }, [userAuth]);

  if (!userAuth) {
    return <h1 className="text-center mt-36">Sign in to view this page</h1>;
  }

  return (
    <>
      <>
        <div className="text-center">
          <h1 className="text-2xl uppercase mb-3">My Account</h1>
          <p className="mb-5 font-serif">({userAuth.email})</p>
        </div>
        <div className="flex flex-col justify-center items-center mx-auto">
          <DetailEditor />
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mt-14 mb-10">
            {/* <SelectUsername /> */}
            <AnimatedButton
              variant="red-outline"
              className="mx-4"
              onClick={() => {
                supabase.auth.signOut();
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
