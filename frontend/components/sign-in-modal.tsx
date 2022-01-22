import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./animated-button";
import { supabase } from "../lib/supabase";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import Loading from "./loading";

const SignInWithLink = () => {
  // const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState<string>();

  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [validEmail, setValidEmail] = useState(false);

  const [emailSent, setEmailSent] = useState(false);

  const [emailSentTo, setEmailSentTo] = useState<string>();

  const [emailLoading, setEmailLoading] = useState(false);

  const handleSendEmail = async (email: string) => {
    setEmailLoading(true);
    try {
      const res = await supabase.auth.signIn({ email: email });
      if (!res.error) {
        setEmailSent(true);
        setEmailLoading(false);
        setEmailSentTo(email);
        setEmail("");
        toast.success("Email sent!", { position: "bottom-left" });
      }
    } catch (error) {
      toast.error("Error sending email", { position: "bottom-left" });
      setEmailLoading(false);
    }
  };

  useEffect(() => {
    const isValid = emailRegEx.test(email);
    console.log(isValid);
    setValidEmail(isValid);
  }, [email]);

  return (
    <>
      <div>
        <h3 className="mb-5 uppercase">Sign in with email Link</h3>
        <div className="flex relative left-4">
          <label className="relative text-gray-400 focus-within:text-gray-600 block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="form-input border border-gray-900 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none rounded-lg"
            />
          </label>
          {emailLoading ? (
            <div className="relative top-3 left-3">
              <Loading color="secondary" />
            </div>
          ) : (
            <AnimatedButton
              disabled={!validEmail}
              onClick={() => handleSendEmail(email)}
              className="ml-2 p-3 disabled:opacity-50"
            >
              <FiSend className="text-3xl" />
            </AnimatedButton>
          )}
        </div>
      </div>
      <div>
        {!validEmail && email && <p className="text-red-600">Invalid Email</p>}
        {emailSent && (
          <p className="mt-4">
            Email sent to <span className="text-green-400">{emailSentTo}</span>,
            click the link to sign in.
          </p>
        )}
      </div>
    </>
  );
};

const SignInModal: React.FC<{
  setShowSignIn: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowSignIn }) => {
  return (
    <div className="fixed flex flex-col h-screen w-screen justify-center left-0 bottom-0 bg-primary z-20">
      <motion.div
        initial={{ y: 200, scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="flex flex-col items-center text-secondary w-full relative bottom-10 mx-auto p-2 text-center"
      >
        {/* Sign in with Email Link */}
        <SignInWithLink />
        <h3 className="my-10">OR</h3>
        {/* Sign in with Google */}
        <AnimatedButton
          onClick={() => supabase.auth.signIn({ provider: "google" })}
          // variant=""
          className="bg-white flex items-center py-3 px-5 white text-primary rounded-lg"
        >
          <AiFillGoogleCircle className="text-2xl mr-3" />

          <span className="">Sign in with Google</span>
          {/* <BsArrowRight /> */}
        </AnimatedButton>
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
