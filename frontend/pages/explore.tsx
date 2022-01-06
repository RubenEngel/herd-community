import { motion } from "framer-motion";
import React from "react";
import PostList from "../components/post-list";
import { ExploreContext } from "../lib/context";

export default function Explore() {
  const { category } = React.useContext(ExploreContext);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PostList
        published={true}
        startLoad={true}
        limit={6}
        category={category}
      />
    </motion.div>
  );
}
