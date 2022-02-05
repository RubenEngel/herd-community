import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./animated-button";
import { supabase } from "../lib/supabase";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import Loading from "./loading";
import router from "next/router";
import Overlay from "./overlay";

const SignInModal = ({
  setShowSignIn,
}: {
  setShowSignIn: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Overlay>
      <motion.div
        initial={{ y: 200, scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="text-secondary relative bottom-10 mx-auto flex w-full flex-col items-center p-2 text-center"
      >
        {/* Sign in with Google */}
        <AnimatedButton
          onClick={() => {
            console.log(window.location.href);
            supabase.auth.signIn(
              { provider: "google" },
              { redirectTo: window.location.origin }
            );
          }}
          // variant=""
          className="bg-primary white text-secondary flex items-center rounded-md border-2 py-3 px-5"
        >
          <AiFillGoogleCircle className="mr-3 text-2xl" />

          <h4>Sign in with Google</h4>
          {/* <BsArrowRight /> */}
        </AnimatedButton>
        <div className="my-10 flex items-center">
          <div className="h-px w-28 bg-white"></div>
          <h4 className="mx-4 text-sm">OR</h4>
          <div className="h-px w-28 bg-white"></div>
        </div>

        {/* Sign in with Email Link */}
        <SignInWithLink />
      </motion.div>
      <AnimatedButton
        onClick={() => setShowSignIn(false)}
        className="fixed bottom-10 left-1/2 mx-auto -ml-24 w-48 uppercase"
      >
        <h3 className="text-white">Not now</h3>
      </AnimatedButton>
    </Overlay>
  );
};

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
      const res = await supabase.auth.signIn(
        { email: email },
        { redirectTo: window.location.origin }
      );
      if (!res.error) {
        setEmailSent(true);
        setEmailLoading(false);
        setEmailSentTo(email);
        setEmail("");
        toast.success("Email sent!");
      }
    } catch (error) {
      toast.error("Error sending email");
      setEmailLoading(false);
    }
  };

  useEffect(() => {
    const isValid = emailRegEx.test(email);
    setValidEmail(isValid);
  }, [email]);

  return (
    <>
      <div>
        <p className="mb-2 font-serif text-sm">Sign in with email link</p>
        <div className="flex">
          <label className="text-secondary relative block focus-within:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute top-1/2 left-3 h-8 w-8 -translate-y-1/2 transform"
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
              className="form-input border-secondary bg-primary placeholder-secondary block w-56 appearance-none rounded-md border py-3 px-4 pl-14 text-gray-500 focus:outline-none"
            />
          </label>
          {email && validEmail && (
            <div className="relative">
              {emailLoading ? (
                <div className="-right-13 absolute top-3 left-3">
                  <Loading color="secondary" />
                </div>
              ) : (
                <AnimatedButton
                  disabled={!validEmail}
                  onClick={() => handleSendEmail(email)}
                  className="absolute -right-11 top-1 ml-2 p-3 disabled:opacity-50"
                >
                  <FiSend className="text-2xl" />
                </AnimatedButton>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        {!validEmail && email && (
          <p className="mt-2 font-serif text-sm text-red-600">Invalid Email</p>
        )}
        {emailSent && (
          <p className="mt-4 font-serif text-sm">
            Email sent to <span className="text-green-400">{emailSentTo}</span>,
            click the link to sign in.
          </p>
        )}
      </div>
    </>
  );
};

export default SignInModal;
