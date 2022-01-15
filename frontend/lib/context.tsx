import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { User } from "./types";
import { UserProfile } from "@auth0/nextjs-auth0";

// User data accesible anywhere
export const UserContext = createContext<{
  userAuth: UserProfile;
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}>(null);

// Selected category to browse accesible anywhere
interface CategoryState {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}
export const ExploreContext = createContext<CategoryState>(null);

// Allow opening of sign in popup anywhere in app
export const SignInContext =
  createContext<Dispatch<SetStateAction<boolean>>>(null);
