import firebase from "./firebase";
import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { User } from "./types";

// User data accesible anywhere
export const UserContext =
  createContext<{ userAuth: firebase.User; userData: User }>(null);

// Selected category to browse accesible anywhere
interface CategoryState {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}
export const ExploreContext = createContext<CategoryState>(null);

// Allow opening of sign in popup anywhere in app
export const SignInContext = createContext<Dispatch<SetStateAction<boolean>>>(null)
