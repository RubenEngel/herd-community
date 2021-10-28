import React from "react";
import { motion } from "framer-motion";
import { BiUpvote } from "react-icons/bi";
import { FiShare, FiEdit3 } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { UserContext } from '../../lib/context';

const InteractionButton = ({ children }) => {
  return (
    <motion.button
    whileHover={{
      scale: 1.2,
      transition: { duration: 0.2 },
    }}
    className="text-3xl p-4 flex items-center ">
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

  const {userData} = React.useContext(UserContext)

  return (
    <motion.div
      initial={hidden}
      animate={showing}
      exit={hidden}
      transition={{
        duration: 0.4
      }}
      className="text-primary fixed bottom-0 right-0 w-20 -mr-6 z-10"
    >
      {userData?.role.toString() === "ADMIN" && (
      <InteractionButton><FiEdit3 /></InteractionButton>
  )}
      <InteractionButton>
        <BiUpvote/>
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
