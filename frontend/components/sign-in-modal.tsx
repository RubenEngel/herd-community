import React, { Dispatch, SetStateAction } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../lib/firebase";
import { motion } from "framer-motion";

export const uiConfig = {
  // signInSuccessUrl: '/my-account',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

const SignInModal: React.FC<{
  setShowSignIn: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowSignIn }) => {
  return (
    <div className="fixed flex flex-col h-screen w-screen justify-center left-0 bottom-0 bg-primary z-10">
      <motion.div
        initial={{ y: 200, scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
        className=" text-secondary w-full relative bottom-10 mx-auto p-2 text-center"
      >
        <h2 className="uppercase">Sign In</h2>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </motion.div>
      <button
        onClick={() => setShowSignIn(false)}
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 uppercase"
      >
        <h3 className="text-white">Not now</h3>
      </button>
    </div>
  );
};

export default SignInModal;
