import { motion } from "framer-motion";
import React from "react";
import { CategoryContext } from "../components/context/category-provider";
import PostGrid from "../components/post-grid/post-grid";

export default function Explore() {
  const { category } = React.useContext(CategoryContext);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PostGrid animate published={true} limit={6} category={category} />
    </motion.div>
  );
}
