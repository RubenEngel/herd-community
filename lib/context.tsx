import { createContext } from 'react';

export const UserContext = createContext<{ user: string; userName: string }>({
  user: null,
  userName: null,
});

export const ExploreContext = createContext({} as any);
