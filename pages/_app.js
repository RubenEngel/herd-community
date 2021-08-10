import '../styles/index.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loading from '../components/loading';
import { motion } from 'framer-motion';
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks';
import { Toaster } from 'react-hot-toast';

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const userData = useUserData()

  useEffect(() => {
    router.events.on('routeChangeStart', () => setPageLoading(true));
    router.events.on('routeChangeComplete', () => setPageLoading(false));
  }, [router]);

  return (
    <UserContext.Provider value={userData}>
    <ApolloProvider client={apolloClient}>
      {pageLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-75-screen flex flex-col justify-center items-center "
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
      <Toaster/>
    </ApolloProvider>
    </UserContext.Provider>
    
  );
}

export default MyApp;
