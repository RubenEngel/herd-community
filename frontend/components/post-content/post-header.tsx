import Avatar from "../avatar";
import Date from "../date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Categories from "../categories";
import Tags from "../../components/post-content/tags";
import { Post } from "../../lib/types";
import Loading from "../loading";
import { motion, Transition, Variants } from "framer-motion";

interface PostHeaderProps {
  title: Post["title"];
  coverImage: Post["featuredImage"];
  date?: Post["createdAt"];
  author?: Post["author"];
  categories?: Post["categories"];
  tags?: Post["tags"];
  likeCount?: number;
  likedByDataLoading?: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  coverImage,
  date,
  author,
  categories,
  tags,
  likeCount,
  // likedByDataLoading,
}) => {
  const variants: Variants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
  };

  const transition: Transition = {
    // type: "spring",
    ease: "easeInOut",
    duration: 0.4,
    // bounce: 0,
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        variants={variants}
        initial={"hidden"}
        animate={"show"}
        transition={transition}
      >
        <PostTitle>{title}</PostTitle>
        <div className="flex justify-between items-center">
          {categories && <Categories categories={categories} />}
          {/* {likedByDataLoading && <Loading fontSize="text-sm" />} */}
          {likeCount > 0 && (
            <div className="mb-2">{`${likeCount} like${
              likeCount > 1 ? "s" : ""
            }`}</div>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={variants}
        initial={"hidden"}
        animate={"show"}
        transition={transition}
        className="flex flex-col sm:flex-row justify-between mb-6 "
      >
        <div className="mb-2 sm:mb-0">{date && <Date date={date} />}</div>
        <div>
          <Avatar author={author} />
        </div>
      </motion.div>
      <motion.div
        variants={variants}
        initial={{ opacity: 0 }}
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
