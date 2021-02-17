import '../styles/index.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { ApolloProvider } from '@apollo/client';
import { useApollo } from "../lib/apolloClient"
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loading from '../components/loading';
config.autoAddCss = false;


function MyApp({ Component, pageProps }) {

  const apolloClient = useApollo(pageProps)

  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => { setPageLoading(true); };
    const handleComplete = () => { setPageLoading(false); };

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete);
  }, [router])

  return (
    <ApolloProvider client={apolloClient}>
        {pageLoading ?
        <div className='h-75-screen flex flex-col justify-center items-center '>
          <Loading/>
        </div>
        :
        <Component {...pageProps}/>
        }
       
    </ApolloProvider>
  ) 
}

export default MyApp
