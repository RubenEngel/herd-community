import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { BiLike } from "react-icons/bi";
import { FiShare, FiEdit3 } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";
import AnimatedButton from "../animated-button";

const InteractionButton = (props) => {
  return (
    <AnimatedButton
      {...props}
      className={`flex flex-col items-center p-4 text-3xl`}
    >
      {props.children}
    </AnimatedButton>
  );
};

const hidden = {
  opacity: 0,
  scale: 0.9,
};

const showing = {
  opacity: 1,
  scale: 1,
};

const PostInteractions: React.FC<{
  isEditable: boolean;
  isLiked: boolean;
  slug: string;
  likeCount: number;
  commentCount: number;
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
  commentCount,
  isSharable,
  setShowComments,
}) => {
  return (
    <motion.div
      initial={hidden}
      animate={showing}
      exit={hidden}
      transition={{
        delay: 0.8,
        duration: 0.3,
      }}
      className="text-primary fixed bottom-4 right-0 z-10 -mr-6 w-20"
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
          <div className="block font-serif text-sm">{likeCount}</div>
        )}
      </InteractionButton>
      <InteractionButton onClick={() => setShowComments(true)}>
        <BiCommentDetail />
        {commentCount > 0 && (
          <div className="block font-serif text-sm">{commentCount}</div>
        )}
      </InteractionButton>
      {isSharable && (
        <InteractionButton onClick={handleShare}>
          <FiShare />
        </InteractionButton>
      )}
    </motion.div>
  );
};

export default PostInteractions;
