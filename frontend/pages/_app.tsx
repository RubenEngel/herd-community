import "../styles/index.css";
import "../styles/ck-editor.css";
import { ApolloProvider } from "@apollo/client";
import { ADD_USER, GET_USER } from "../lib/apolloQueries";
import { useApollo } from "../lib/apolloClient";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ExploreContext, UserContext, SignInContext } from "../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import { User } from "../lib/types";
import SignIn from "../components/sign-in";
import { BsArrowUp } from "react-icons/bs";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<User>(null);

  const [category, setCategory] = useState("all");
  const categoryState = { category, setCategory };

  const [showSignIn, setShowSignIn] = useState(false);
  useEffect(() => {
    if (!user) {
      setTimeout(() => setShowSignIn(true), 1000);
    } else setShowSignIn(false);
  }, [loading]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setPageLoading(true));
    router.events.on("routeChangeComplete", () => setPageLoading(false));
  }, [router]);

  const findOrCreateUser = async () => {
    const res = await apolloClient.query({
      query: GET_USER,
      variables: {
        email: user.email,
      },
    });
    if (res.data.user) {
      console.log("Found User");
      setUserData(res.data.user);
    } else {
      console.log("no user exists");
      await apolloClient.mutate({
        mutation: ADD_USER,
        variables: {
          email: user.email,
        },
      });
      console.log("New User Created");
    }
  };

  useEffect(() => {
    if (!user) {
      setUserData(null);
    } else if (user.email) {
      findOrCreateUser();
    }
  }, [user]);

  const [firstLoad, setFirstLoad] = useState(true);

  return (
    <ApolloProvider client={apolloClient}>
      <ExploreContext.Provider value={categoryState}>
        <UserContext.Provider value={{ userAuth: user, userData }}>
          <SignInContext.Provider value={setShowSignIn}>
            <AnimatePresence exitBeforeEnter>
              {firstLoad ? (
                <motion.div
                  exit={{ scale: 0 }}
                  key={router.route}
                  className="w-screen h-75-screen flex flex-col justify-center items-center"
                >
                  <motion.h1
                    initial={{ y: 100, scale: 0 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="text-7xl flex"
                  >
                    {"HERD.".split("").map((letter, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 0 }}
                        animate={{ y: 10 }}
                        transition={{
                          delay: 0.2 * index,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: "HERD.".length * 0.3,
                        }}
                      >
                        {letter}
                      </motion.div>
                    ))}
                  </motion.h1>
                  <motion.button
                    className="bg-primary mt-20 text-white px-4 py-2 rounded-full text-3xl"
                    onClick={() => setFirstLoad(false)}
                    initial={{ y: 50, scale: 0 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", duration: 0.7 }}
                  >
                    <BsArrowUp />
                  </motion.button>
                </motion.div>
              ) : (
                // When site has been entered
                <Layout>
                  <AnimatePresence exitBeforeEnter>
                    {pageLoading ? (
                      <motion.div
                        key={"loading"}
                        initial={{ opacity: 0, y: 50, scale: 0 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 50,
                          scale: 0,
                        }}
                        className="h-50-screen flex flex-col justify-center items-center "
                        transition={{
                          type: "spring",
                          bounce: 0,
                          duration: 0.4,
                        }}
                      >
                        <Loading />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={router.route}
                        initial={{
                          opacity: 0,
                          y: -200,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 200,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                          type: "linear",
                        }}
                      >
                        <Component {...pageProps} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!user && showSignIn && (
                    <div className="fixed flex flex-col h-screen w-screen justify-center left-0 bottom-0 bg-primary z-10">
                      <SignIn />
                      <button
                        onClick={() => setShowSignIn(false)}
                        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 uppercase"
                      >
                        <h3 className="text-white">Not now</h3>
                      </button>
                    </div>
                  )}
                </Layout>
              )}
            </AnimatePresence>
            <Toaster />
          </SignInContext.Provider>
        </UserContext.Provider>
      </ExploreContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
