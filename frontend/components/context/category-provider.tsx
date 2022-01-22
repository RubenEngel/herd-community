import React, { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";

// interface CategoryState
export const CategoryContext = createContext<{
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}>(null);

const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState("all");
  const categoryState = { category, setCategory };

  return (
    <CategoryContext.Provider value={categoryState}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
