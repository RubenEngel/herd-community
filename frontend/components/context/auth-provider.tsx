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

  const [user, setUser] = useState(supabase.auth.user());

  const [userData, setUserData] = useState<PrismaUser>(null);

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

  const [incompleteData, setIncompleteData] = useState(false);

  const [showEditDetails, setShowEditDetails] = useState(false);

  useEffect(() => {
    if (user && incompleteData) {
      setTimeout(() => setShowEditDetails(true), 1000);
    }
  }, []);

  useEffect(() => {
    if (!userData?.firstName || !userData?.lastName || !userData?.username) {
      setIncompleteData(true);
    } else {
      setIncompleteData(false);
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userAuth: user, userData, setUserData }}>
      <SignInContext.Provider value={setShowSignIn}>
        {children}
        {showSignIn && <SignInModal setShowSignIn={setShowSignIn} />}
        {showEditDetails && (
          <Overlay>
            <h1 className="text-secondary">
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
