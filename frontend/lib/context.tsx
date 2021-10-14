import firebase from "./firebase";
import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

export const UserContext = createContext<firebase.User>(null);

interface CategoryState {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

export const ExploreContext = createContext<CategoryState>(null);
