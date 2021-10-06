import firebase from "./firebase";
import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

export const UserContext = createContext<{
  user: firebase.User;
  username: string;
}>({
  user: null,
  username: null,
});

interface ICategoryState {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

export const ExploreContext = createContext<ICategoryState>(null);
