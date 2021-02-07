import '../styles/index.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { useRouter } from 'next/router';
import { relayStylePagination } from "@apollo/client/utilities";
import { useState, useEffect } from 'react';
import Loading from '../components/loading';
config.autoAddCss = false;

const client = new ApolloClient({
  uri: 'https://www.herdcommunity.co.uk/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: relayStylePagination()
        },
      },
    },
  })
});

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => { setPageLoading(true); };
    const handleComplete = () => { setPageLoading(false); };

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete);
  }, [router])

  return (
    <ApolloProvider client={client}>
        {pageLoading ?
        <div className='h-screen flex justify-center items-center'>
          <Loading/>
        </div>
        :
        <Component {...pageProps}/>
        }
       
    </ApolloProvider>
  ) 
}

export default MyApp
