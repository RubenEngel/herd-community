import '../styles/index.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loading from '../components/loading';
import { motion } from 'framer-motion';
import firebase, { firebasConfig } from '../lib/firebase';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setPageLoading(true));
    router.events.on('routeChangeComplete', () => setPageLoading(false));
  }, [router]);

  return (
    <ApolloProvider client={apolloClient}>
      {pageLoading ? (
        <motion.div
          initial={{ y: '-100%', opacity: 0.2 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
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
    </ApolloProvider>
  );
}

export default MyApp;
