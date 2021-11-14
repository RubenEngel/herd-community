import "../styles/index.css";
import "../styles/ck-editor.css";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import { motion } from "framer-motion";
import { ExploreContext, UserContext, SignInContext } from "../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import { User } from '../lib/types';
import SignIn from "../components/sign-in";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<User>(null)

  const [category, setCategory] = useState("all");
  const categoryState = { category, setCategory };

  const [showSignIn, setShowSignIn] = useState(false);
  useEffect(() => {
    if (!user) {
      setTimeout(() => setShowSignIn(true), 1000)
    } else setShowSignIn(false)
  }, [loading])

  useEffect(() => {
    router.events.on("routeChangeStart", () => setPageLoading(true));
    router.events.on("routeChangeComplete", () => setPageLoading(false));
  }, [router]);

  useEffect(() => {
    if (!user) {
      setUserData(null)
    } else if (user.email) { 
      apolloClient.query({
          query: gql`
            query GetUser($email: String!) {
              getUser(email: $email) {
                email
                role
                firstName
                lastName
                imageUrl
              }
            }
          `,
          variables: {
            email: user.email
          }
        }).then((res) => setUserData(res.data.getUser))
    }
  }, [user])



  return (
    <ApolloProvider client={apolloClient}>
      <ExploreContext.Provider value={categoryState}>
        <UserContext.Provider value={{ userAuth: user, userData }}>
          <SignInContext.Provider value={setShowSignIn}>
          <Layout>
            {pageLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-50-screen flex flex-col justify-center items-center "
              >
                <Loading />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Component {...pageProps} />
              </motion.div>
            )}
            {!user && showSignIn && (
              <div className="fixed flex flex-col h-screen w-screen justify-center left-0 bottom-0 bg-primary">
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
          <Toaster />
          </SignInContext.Provider>
        </UserContext.Provider>
      </ExploreContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
