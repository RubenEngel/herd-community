import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiUpvote } from "react-icons/bi";
import { FiShare, FiEdit3 } from "react-icons/fi";
// import { BiCommentDetail } from "react-icons/bi";
// import { useRouter } from "next/router";
import Link from "next/link";
import { FetchResult, MutationFunctionOptions } from "@apollo/client";

const InteractionButton = (props) => {
  return (
    <motion.button
      {...props}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 1.4 }}
      className={`text-3xl p-4 flex flex-col items-center`}
    >
      {props.children}
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
  scale: 1,
};

const PostInteractions: React.FC<{
  isEditable: boolean;
  isLiked: boolean;
  slug: string;
  likeCount: number;
  likePost: (
    options?: MutationFunctionOptions<
      any,
      {
        id: number;
      }
    >
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
}> = ({ isEditable, isLiked, slug, likePost, likeCount }) => {
  const handleLike = () => {
    if (!isLiked) {
      likePost();
    }
  };

  return (
    <motion.div
      initial={hidden}
      animate={showing}
      exit={hidden}
      transition={{
        duration: 0.4,
      }}
      className="text-primary fixed bottom-0 right-0 w-20 -mr-6 z-10"
    >
      {isEditable && (
        <Link href={{ pathname: "/edit-post", query: { slug: slug } }}>
          <a>
            <InteractionButton>
              <FiEdit3 />
            </InteractionButton>
          </a>
        </Link>
      )}
      <InteractionButton onClick={handleLike}>
        <BiUpvote fill={isLiked ? "#47B36B" : "#5c5c5ce6"} />
        {likeCount > 0 && <div className="text-sm block">{likeCount}</div>}
      </InteractionButton>
      <InteractionButton>
        <FiShare />
      </InteractionButton>
      {/* <InteractionButton>
        <BiCommentDetail />
      </InteractionButton> */}
    </motion.div>
  );
};

export default PostInteractions;
