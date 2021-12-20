import "../styles/index.css";
import "../styles/ck-editor.css";
import { ApolloProvider } from "@apollo/client";
import { ADD_USER, GET_USER } from "../lib/apolloQueries";
import { useApollo } from "../lib/apolloClient";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ExploreContext, UserContext, SignInContext } from "../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import { User } from "../lib/types";
import Intro from "../components/intro";
import PageLoading from "../components/page-loading";
import SignInModal from "../components/sign-in-modal";
import PageTransition from "../components/page-transition";
import { CloudinaryContext, Image } from "cloudinary-react";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<User>(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [category, setCategory] = useState("all");
  const categoryState = { category, setCategory };

  const [showSignIn, setShowSignIn] = useState(false);

  // useEffect(() => {
  //   if (!user && !firstLoad) {
  //     setTimeout(() => setShowSignIn(true));
  //   } else setShowSignIn(false);
  // }, [user, firstLoad]);

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
      setUserData(res.data.user);
    } else {
      await apolloClient.mutate({
        mutation: ADD_USER,
        variables: {
          email: user.email,
        },
      });
    }
  };

  useEffect(() => {
    if (!user) {
      setUserData(null);
    } else if (user.email) {
      findOrCreateUser();
    }
  }, [user]);

  return (
    <ApolloProvider client={apolloClient}>
      <CloudinaryContext cloudName="dnsihvop5">
        <ExploreContext.Provider value={categoryState}>
          <UserContext.Provider value={{ userAuth: user, userData }}>
            <SignInContext.Provider value={setShowSignIn}>
              <AnimatePresence exitBeforeEnter>
                {firstLoad ? (
                  <Intro key={router.route} setFirstLoad={setFirstLoad} />
                ) : (
                  // When site has been entered
                  <Layout>
                    <AnimatePresence
                      onExitComplete={() => window?.scrollTo(0, 0)}
                      exitBeforeEnter
                    >
                      {pageLoading ? (
                        <PageLoading key={"page-loading"} />
                      ) : (
                        <PageTransition key={router.asPath}>
                          <Component {...pageProps} />
                        </PageTransition>
                      )}
                    </AnimatePresence>
                    {!user && showSignIn && (
                      <SignInModal setShowSignIn={setShowSignIn} />
                    )}
                  </Layout>
                )}
              </AnimatePresence>
              <Toaster />
            </SignInContext.Provider>
          </UserContext.Provider>
        </ExploreContext.Provider>
      </CloudinaryContext>
    </ApolloProvider>
  );
}

export default MyApp;
