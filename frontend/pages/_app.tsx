import "../styles/index.css";
import "../styles/ck-editor.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import Intro from "../components/intro";
import PageLoading from "../components/page-loading";
import PageTransition from "../components/page-transition";
import { useApollo } from "../lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import AuthProvider from "../components/context/auth-provider";
import CategoryProvider from "../components/context/category-provider";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setPageLoading(true));
    router.events.on("routeChangeComplete", () => setPageLoading(false));
    return () => {
      router.events.off("routeChangeStart", () => setPageLoading(true));
      router.events.off("routeChangeComplete", () => setPageLoading(false));
    };
  }, [router]);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <CategoryProvider>
          <AnimatePresence exitBeforeEnter>
            {firstLoad ? (
              <Intro key={router.route} setFirstLoad={setFirstLoad} />
            ) : (
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
              </Layout>
            )}
          </AnimatePresence>
          <Toaster />
        </CategoryProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
