import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useApolloClient } from "@apollo/client";
import { User } from "@supabase/supabase-js";
import { ADD_USER, GET_USER_BY_EMAIL } from "../../lib/gql-queries";
import { supabase } from "../../lib/supabase";
import { PrismaUser } from "../../lib/types";
import Overlay from "../overlay";
import OverlayDetailEditor from "../overlay-detail-editor";
import SignInModal from "../sign-in-modal";

// User data accesible anywhere
export const AuthContext = createContext<{
  userAuth: User | null;
  userData: PrismaUser | null;
  setUserData: React.Dispatch<React.SetStateAction<PrismaUser>>;
  updateUserData: () => Promise<void>;
  setShowSignIn: Dispatch<SetStateAction<boolean>>;
}>(null);

export const SignInContext =
  createContext<Dispatch<SetStateAction<boolean>>>(null);

const SignInProvider = ({ children }) => {
  const apolloClient = useApolloClient();

  const [userAuth, setUserAuth] = useState(supabase.auth.user());

  const [userData, setUserData] = useState<PrismaUser | null>(null);

  const [showSignIn, setShowSignIn] = useState(false);

  const [showEditDetails, setShowEditDetails] = useState(false);

  const updateUserData = async () => {
    const getUserResponse = await apolloClient.query({
      query: GET_USER_BY_EMAIL,
      variables: { email: userAuth.email },
      fetchPolicy: "network-only",
    });
    if (getUserResponse.data.userByEmail) {
      setUserData(getUserResponse.data.userByEmail);
    } else {
      console.log("no data from update");
    }
  };

  const findOrCreateUser = async () => {
    const getUserResponse = await apolloClient.query({
      query: GET_USER_BY_EMAIL,
      variables: { email: userAuth.email },
    });
    if (getUserResponse.data.userByEmail) {
      setUserData(getUserResponse.data.userByEmail);
    } else {
      const addUserResponse = await apolloClient.mutate({
        mutation: ADD_USER,
        variables: {
          email: userAuth.email,
        },
      });
      setUserData(addUserResponse.data.createUser);
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserAuth(session?.user);
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userAuth) {
      setUserData(null);
    } else if (userAuth.email) {
      findOrCreateUser();
    }
  }, [userAuth]);

  useEffect(() => {
    if (!userAuth || !userData) return;
    if (userAuth && userData) {
      const isComplete = Boolean(
        userData?.firstName && userData?.lastName && userData?.username
      );
      setShowEditDetails(!isComplete);
    }
  }, [userAuth, userData]);

  return (
    <AuthContext.Provider
      value={{ userAuth, userData, setUserData, updateUserData, setShowSignIn }}
    >
      {children}
      {showSignIn && <SignInModal setShowSignIn={setShowSignIn} />}
      {showEditDetails && (
        <Overlay>
          <h1 className="text-secondary px-16 text-center">
            Complete details to create a profile
          </h1>
          <OverlayDetailEditor />
        </Overlay>
      )}
    </AuthContext.Provider>
  );
};

export default SignInProvider;
