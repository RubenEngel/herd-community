import Avatar from "../avatar";
import Date from "../date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Categories from "../categories";
import Tags from "../../components/post-content/tags";
import { Post } from "../../lib/types";
import Loading from "../loading";
import { motion, Transition, Variants } from "framer-motion";
import { BiCommentDetail, BiLike } from "react-icons/bi";

interface PostHeaderProps {
  title: Post["title"];
  coverImage: Post["featuredImage"];
  date?: Post["createdAt"];
  author?: Post["author"];
  categories?: Post["categories"];
  tags?: Post["tags"];
  likeCount?: number;
  commentCount?: number;
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
  commentCount,
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
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        variants={variants}
        initial={"hidden"}
        animate={"show"}
        transition={transition}
      >
        <PostTitle>{title}</PostTitle>
        <div className="mb-2 sm:mb-0 text-sm md:text-base">
          {date && <Date date={date} />}
        </div>
        <div className="flex justify-between items-center my-3">
          {categories && <Categories categories={categories} />}
        </div>
      </motion.div>

      <motion.div
        variants={variants}
        initial={"hidden"}
        animate={"show"}
        transition={{ ...transition, delay: 0.3 }}
        className="flex sm:flex-row justify-between mb-6 "
      >
        <div>
          <Avatar user={author} />
        </div>
        <div className="flex">
          {likeCount ? (
            <div className="flex items-center mx-3">
              <BiLike className="w-5 h-5" />
              <h4 className="ml-1">{likeCount}</h4>
            </div>
          ) : null}
          {commentCount ? (
            <div className="flex items-center mx-3">
              <BiCommentDetail className="w-5 h-5" />
              <h4 className="ml-1">{commentCount}</h4>
            </div>
          ) : null}
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
