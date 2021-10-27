import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiUpvote } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";

const InteractionButton = ({ children }) => {
  return (
    <motion.button className="text-3xl p-4 flex items-center ">
      {children}
    </motion.button>
  );
};

const hidden = {
  y: -300,
  opacity: 0,
  scale: 0.5,
};

const showing = {
  y: 0,
  opacity: 1,
  scale: 1
};

const PostInteractions = () => {
  return (
    <motion.div
      initial={hidden}
      animate={showing}
      exit={hidden}
      transition={{
        duration: 0.4
      }}
      className="text-primary fixed bottom-0 right-0 w-20 -mr-5 z-10"
    >
      <InteractionButton>
        <BiUpvote floodColor={"black"} />
      </InteractionButton>
      <InteractionButton>
        <FiShare />
      </InteractionButton>
      <InteractionButton>
        <BiCommentDetail />
      </InteractionButton>
    </motion.div>
  );
};

export default PostInteractions;
