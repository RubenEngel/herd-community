import { motion } from "framer-motion";
import React from "react";
import PostList from "../components/post-list";
import { ExploreContext } from "../lib/context";

export default function Explore() {
  const { category } = React.useContext(ExploreContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
    >
      <PostList
        published={true}
        startLoad={true}
        limit={5}
        category={category}
      />
    </motion.div>
  );
}
