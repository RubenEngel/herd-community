import "../styles/index.css";
import "../styles/ck-editor.css";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import { motion } from "framer-motion";
import { ExploreContext, UserContext } from "../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import { User } from '../lib/types';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<User>(null)

  const [category, setCategory] = useState("all");
  const categoryState = { category, setCategory };

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
          </Layout>
          <Toaster />
        </UserContext.Provider>
      </ExploreContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
