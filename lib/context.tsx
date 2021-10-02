import firebase from "./firebase";
import { createContext } from "react";

export const UserContext = createContext<{
  user: firebase.User;
  username: string;
}>({
  user: null,
  username: null,
});

export const ExploreContext = createContext({} as any);
