import { useApolloClient } from "@apollo/client";
import { User } from "@supabase/supabase-js";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ADD_USER, GET_USER_BY_EMAIL } from "../../lib/gql-queries";
import { supabase } from "../../lib/supabase";
import { PrismaUser } from "../../lib/types";
import Overlay from "../overlay";
import OverlayDetailEditor from "../overlay-detail-editor";
import SignInModal from "../sign-in-modal";

// User data accesible anywhere
export const UserContext = createContext<{
  userAuth: User;
  userData: PrismaUser;
  setUserData: React.Dispatch<React.SetStateAction<PrismaUser>>;
}>(null);

export const SignInContext =
  createContext<Dispatch<SetStateAction<boolean>>>(null);

const SignInProvider = ({ children }) => {
  const apolloClient = useApolloClient();

  const [userAuth, setUserAuth] = useState(supabase.auth.user());

  const [userData, setUserData] = useState<PrismaUser>(null);

  const [showSignIn, setShowSignIn] = useState(false);

  const [incompleteData, setIncompleteData] = useState(false);

  const [showEditDetails, setShowEditDetails] = useState(false);

  const findOrCreateUser = async () => {
    const res = await apolloClient.query({
      query: GET_USER_BY_EMAIL,
      variables: { email: userAuth.email },
    });
    if (res.data.userByEmail) {
      setUserData(res.data.userByEmail);
    } else {
      await apolloClient.mutate({
        mutation: ADD_USER,
        variables: {
          email: userAuth.email,
        },
      });
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
    if (!userData?.firstName || !userData?.lastName || !userData?.username) {
      setIncompleteData(true);
      console.log("Incomplete Data");
    } else {
      setIncompleteData(false);
      console.log("Complete Data");
    }
  }, [userAuth, userData]);

  useEffect(() => {
    if (userAuth && incompleteData) {
      console.log("show edit data");
      const showDetailEditorTimeout = setTimeout(() => {
        if (incompleteData) {
          setShowEditDetails(true);
        }
      }, 1000);
      return clearTimeout(showDetailEditorTimeout);
    } else {
      setShowEditDetails(false);
    }
  }, [userAuth, incompleteData]);

  return (
    <UserContext.Provider value={{ userAuth: userAuth, userData, setUserData }}>
      <SignInContext.Provider value={setShowSignIn}>
        {children}
        {showSignIn && <SignInModal setShowSignIn={setShowSignIn} />}
        {showEditDetails && (
          <Overlay>
            <h1 className="text-secondary text-center px-16">
              Complete details to create a profile
            </h1>
            <OverlayDetailEditor />
          </Overlay>
        )}
      </SignInContext.Provider>
    </UserContext.Provider>
  );
};

export default SignInProvider;
