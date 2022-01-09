import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { BiLike, BiUpvote } from "react-icons/bi";
import { FiShare, FiEdit3 } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";

const InteractionButton = (props) => {
  return (
    <motion.button
      {...props}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 1.4 }}
      className={`text-3xl p-4 flex flex-col items-center disabled:opacity-30`}
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
  handleLike: () => void;
  likeLoading: boolean;
  handleShare: () => void;
  isSharable: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
}> = ({
  isEditable,
  isLiked,
  slug,
  handleLike,
  likeLoading,
  handleShare,
  likeCount,
  isSharable,
  setShowComments,
}) => {
  return (
    <motion.div
      initial={hidden}
      animate={showing}
      exit={hidden}
      transition={{
        duration: 0.3,
      }}
      className="text-primary fixed bottom-4 right-0 w-20 -mr-6 z-10"
    >
      {isEditable && (
        <Link
          scroll={false}
          href={{ pathname: "/edit-post", query: { slug: slug } }}
        >
          <a>
            <InteractionButton>
              <FiEdit3 />
            </InteractionButton>
          </a>
        </Link>
      )}
      <InteractionButton disabled={likeLoading} onClick={handleLike}>
        <BiLike className={`${isLiked ? "text-green-600" : "text-primary"}`} />
        {likeCount > 0 && (
          <div className="text-sm block font-serif">{likeCount}</div>
        )}
      </InteractionButton>
      {isSharable && (
        <InteractionButton onClick={handleShare}>
          <FiShare />
        </InteractionButton>
      )}
      <InteractionButton onClick={() => setShowComments(true)}>
        <BiCommentDetail />
      </InteractionButton>
    </motion.div>
  );
};

export default PostInteractions;
