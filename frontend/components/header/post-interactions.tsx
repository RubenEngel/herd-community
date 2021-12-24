import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiUpvote } from "react-icons/bi";
import { FiShare, FiEdit3 } from "react-icons/fi";
// import { BiCommentDetail } from "react-icons/bi";
// import { useRouter } from "next/router";
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
  handleLike: () => void;
  handleShare: () => void;
  isSharable: boolean;
}> = ({
  isEditable,
  isLiked,
  slug,
  handleLike,
  handleShare,
  likeCount,
  isSharable,
}) => {
  return (
    <motion.div
      initial={hidden}
      animate={showing}
      exit={hidden}
      transition={{
        duration: 0.3,
        // delay: 0.5,
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
      <InteractionButton onClick={handleLike}>
        <BiUpvote
          className={`${isLiked ? "text-green-600" : "text-primary"}`}
        />
        {likeCount > 0 && <div className="text-sm block">{likeCount}</div>}
      </InteractionButton>
      {isSharable && (
        <InteractionButton onClick={handleShare}>
          <FiShare />
        </InteractionButton>
      )}
      {/* <InteractionButton>
        <BiCommentDetail />
      </InteractionButton> */}
    </motion.div>
  );
};

export default PostInteractions;
