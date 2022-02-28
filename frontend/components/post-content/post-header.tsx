import Avatar from "../avatar";
import Date from "../date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Categories from "../categories";
import Tags from "../../components/post-content/tags";
import { Post } from "../../lib/generated/graphql-types";
// import Loading from "../loading";
import { motion, Transition, Variants } from "framer-motion";
import { BiCommentDetail, BiLike } from "react-icons/bi";
import AnimatedButton from "../animated-button";
import { Dispatch, SetStateAction } from "react";

const PostHeader = ({
  title,
  coverImage,
  date,
  author,
  categories,
  tags,
  likeCount,
  commentCount,
  setShowComments,
  setShowLikedBy,
}: {
  title: Post["title"];
  coverImage: Post["featuredImage"];
  date?: Post["createdAt"];
  author?: Post["author"];
  categories?: Post["categories"];
  tags?: Post["tags"];
  likeCount?: number;
  commentCount?: number;
  likedByDataLoading?: boolean;
  setShowComments?: Dispatch<SetStateAction<boolean>>;
  setShowLikedBy?: Dispatch<SetStateAction<boolean>>;
}) => {
  const variants: Variants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
  };

  const transition: Transition = {
    type: "spring",
    duration: 0.6,
    bounce: 0.1,
  };

  return (
    <div className="mx-auto max-w-3xl px-4">
      <motion.div
        variants={variants}
        initial={"hidden"}
        animate={"show"}
        transition={transition}
      >
        <PostTitle>{title}</PostTitle>
        <div className="mb-2 text-sm sm:mb-0 md:text-base">
          {date && <Date date={date} />}
        </div>
        <div className="my-3 flex items-center justify-between">
          {categories && <Categories categories={categories} />}
        </div>
      </motion.div>

      <motion.div
        variants={variants}
        initial={"hidden"}
        animate={"show"}
        transition={{ ...transition, delay: 0.3 }}
        className="mb-6 flex justify-between sm:flex-row "
      >
        <div>
          <Avatar user={author} showUsername />
        </div>
        <div className="flex items-center">
          {commentCount > 0 && (
            <AnimatedButton
              onClick={() => setShowComments(true)}
              className="flex items-center"
            >
              <BiCommentDetail className="h-5 w-5" />
              <h4 className="ml-1">{commentCount}</h4>
            </AnimatedButton>
          )}
          {likeCount > 0 && (
            <AnimatedButton
              onClick={() => setShowLikedBy(true)}
              className="ml-4 flex items-center"
            >
              <BiLike className="h-5 w-5" />
              <h4 className="ml-1">{likeCount}</h4>
            </AnimatedButton>
          )}
        </div>
      </motion.div>
      <motion.div
        variants={variants}
        initial={{ opacity: 0, y: 100 }}
        animate={"show"}
        transition={{ ...transition, delay: 0.3 }}
        className="mb-8"
      >
        <CoverImage title={title} coverImage={coverImage} />
        <div>{tags?.length > 0 && <Tags tags={tags} />}</div>
      </motion.div>
    </div>
  );
};

export default PostHeader;
