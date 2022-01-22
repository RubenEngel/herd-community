import { useApolloClient } from "@apollo/client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ADD_USER, GET_USER_BY_EMAIL } from "../../lib/apollo-queries";
import { supabase } from "../../lib/supabase";
import { User } from "../../lib/types";
import SignInModal from "../sign-in-modal";

// User data accesible anywhere
export const UserContext = createContext<{
  userAuth: any;
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}>(null);

export const SignInContext =
  createContext<Dispatch<SetStateAction<boolean>>>(null);

const SignInProvider = ({ children }) => {
  const apolloClient = useApolloClient();

  const [user, setUser] = useState(supabase.auth.user());

  const [userData, setUserData] = useState<User>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user);
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);

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

  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <UserContext.Provider value={{ userAuth: user, userData, setUserData }}>
      <SignInContext.Provider value={setShowSignIn}>
        {children}
        {showSignIn && <SignInModal setShowSignIn={setShowSignIn} />}
      </SignInContext.Provider>
    </UserContext.Provider>
  );
};

export default SignInProvider;
