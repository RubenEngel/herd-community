import { useApolloClient } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";
import { ADD_USER, GET_USER_BY_EMAIL } from "../lib/apolloQueries";
import { UserContext } from "../lib/context";
import { User } from "../lib/types";
// import SignInModal from "./sign-in-modal";

const ProfileProvider = ({ children }) => {
  const apolloClient = useApolloClient();

  const { user } = useUser();
  const [userData, setUserData] = useState<User>(null);

  const findOrCreateUser = async () => {
    const res = await apolloClient.query({
      query: GET_USER_BY_EMAIL,
      variables: { email: user.email },
    });
    if (res.data.userByEmail) {
      setUserData(res.data.userByEmail);
    } else {
      await apolloClient.mutate({
        mutation: ADD_USER,
        variables: {
          email: user.email,
        },
      });
    }
  };

  useEffect(() => {
    if (!user) {
      setUserData(null);
    } else if (user.email) {
      findOrCreateUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ userAuth: user, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default ProfileProvider;
