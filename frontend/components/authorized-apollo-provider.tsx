import { ApolloProvider } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { useApollo } from "../lib/apolloClient";

const AuthorizedApolloProvider = ({ children, pageProps }) => {
  const { user } = useUser();

  const apolloClient = useApollo(pageProps, user?.email);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
