import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../lib/firebase';
import { motion } from "framer-motion";

export const uiConfig = {
  signInSuccessUrl: '/my-account',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function SignIn() {
  return (
    <motion.div
    initial={{scale: 0}}
    animate={{scale: 1}}
    transition={{duration: 0.4}}
    className=" text-secondary w-full relative bottom-10 mx-auto p-2 text-center">
      <h2 className="uppercase">Sign In</h2>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </motion.div>
  );
}

export default SignIn;
