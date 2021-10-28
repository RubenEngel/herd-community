import firebase from "./firebase";
import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { User } from "./types";

export const UserContext =
  createContext<{ userAuth: firebase.User; userData: User }>(null);

interface CategoryState {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

export const ExploreContext = createContext<CategoryState>(null);
