import '../styles/index.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
config.autoAddCss = false;

const client = new ApolloClient({
  uri: 'https://www.herdcommunity.co.uk/graphql',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
        <Component {...pageProps}/>
    </ApolloProvider>
  ) 
}

export default MyApp
