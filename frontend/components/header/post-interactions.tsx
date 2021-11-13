import React from "react";
import { motion } from "framer-motion";
import { BiUpvote } from "react-icons/bi";
import { FiShare, FiEdit3 } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";

const InteractionButton = (props) => {
  return (
    <motion.button
      {...props}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.2 },
      }}
      className="text-3xl p-4 flex items-center "
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

const PostInteractions = ({
  isEditable,
  slug,
}: {
  isEditable: boolean;
  slug: string;
}) => {


  const router = useRouter();

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
        <Link href={{ pathname: '/edit-post', query: { slug: slug }} }>
          <a>
            <InteractionButton>
              <FiEdit3 />
            </InteractionButton>
          </a>
        </Link>
      )}
      <InteractionButton>
        <BiUpvote />
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
