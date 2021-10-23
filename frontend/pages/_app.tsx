import "../styles/index.css";
import "../styles/ck-editor.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import { motion } from "framer-motion";
import { ExploreContext, UserContext } from "../lib/context";
// import { useUserData } from "../lib/hooks/useUserData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [user] = useAuthState(auth);

  const [category, setCategory] = useState("all");
  const categoryState = { category, setCategory };

  useEffect(() => {
    router.events.on("routeChangeStart", () => setPageLoading(true));
    router.events.on("routeChangeComplete", () => setPageLoading(false));
  }, [router]);

  return (
    <ExploreContext.Provider value={categoryState}>
      <UserContext.Provider value={user}>
        <ApolloProvider client={apolloClient}>
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
        </ApolloProvider>
      </UserContext.Provider>
    </ExploreContext.Provider>
  );
}

export default MyApp;
