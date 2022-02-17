import { motion } from "framer-motion";
import React from "react";
import { CategoryContext } from "../components/context/category-provider";
import ExplorePostGrid from "../components/post-grid/explore-post-grid";

export default function Explore() {
  const { category } = React.useContext(CategoryContext);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ExplorePostGrid published={true} limit={6} category={category} />
    </motion.div>
  );
}
