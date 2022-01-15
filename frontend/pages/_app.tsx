import "../styles/index.css";
import "../styles/ck-editor.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ExploreContext } from "../lib/context";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import Intro from "../components/intro";
import PageLoading from "../components/page-loading";
import PageTransition from "../components/page-transition";
import { UserProvider } from "@auth0/nextjs-auth0";
import ProfileProvider from "../components/profile-provider";
import AuthorizedApolloProvider from "../components/authorized-apollo-provider";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [category, setCategory] = useState("all");
  const categoryState = { category, setCategory };

  useEffect(() => {
    router.events.on("routeChangeStart", () => setPageLoading(true));
    router.events.on("routeChangeComplete", () => setPageLoading(false));
  }, [router]);

  return (
    <UserProvider>
      <AuthorizedApolloProvider pageProps={pageProps}>
        <ProfileProvider>
          <ExploreContext.Provider value={categoryState}>
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
          </ExploreContext.Provider>
        </ProfileProvider>
      </AuthorizedApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
