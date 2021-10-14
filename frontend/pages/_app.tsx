import "../styles/index.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import { motion } from "framer-motion";
import { ExploreContext, UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks/useUserData";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const userData = useUserData();

  const [category, setCategory] = useState("all");
  const categoryState = { category, setCategory };

  useEffect(() => {
    router.events.on("routeChangeStart", () => setPageLoading(true));
    router.events.on("routeChangeComplete", () => setPageLoading(false));
  }, [router]);

  return (
    <ExploreContext.Provider value={categoryState}>
      <UserContext.Provider value={userData}>
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
