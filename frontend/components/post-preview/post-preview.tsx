import Avatar from "../avatar";
import Date from "../date";
import Link from "next/link";
import Categories from "../categories";
import { motion } from "framer-motion";
import PreviewImage from "./preview-image";
import { Post } from "../../lib/types";
import AnimatedButton from "../animated-button";
import { BiCommentDetail, BiLike } from "react-icons/bi";

interface PostPreviewProps extends Partial<Post> {
  likeCount: number;
  commentCount: number;
  animateY?: number | string;
  animateScale?: number;
  animateOpacity?: number;
}

export default function PostPreview({
  title,
  featuredImage,
  createdAt,
  categories,
  author,
  slug,
  likeCount,
  commentCount,
  animateY = 0,
  animateScale = 1,
  animateOpacity = 0,
}: PostPreviewProps) {
  return (
    <>
      <motion.div
        initial={{ scale: animateScale, y: animateY, opacity: animateOpacity }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.6,
          bounce: 0.1,
        }}
        className="flex mx-auto my-2 flex-col justify-center rounded-lg"
      >
        {/* Image */}
        <div className="mb-1">
          <PreviewImage
            title={title}
            coverImage={featuredImage}
            slug={slug}
            width={600}
            height={400}
          />
        </div>
        {/* Categories */}
        <div className="mt-2">
          <Categories categories={categories} />
        </div>
        {/* Title */}
        <AnimatedButton className="text-lg mb-1 text-left font-serif">
          <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
            <a aria-label={title}>{title}</a>
          </Link>
        </AnimatedButton>
        <div className="text-xs mb-3">
          <Date date={createdAt} />
        </div>
        {/* Date and Author */}
        <div className="text-sm flex flex-row justify-between items-center">
          <Avatar user={author} />
          <div className="flex">
            {likeCount ? (
              <div className="flex items-center mx-2">
                <BiLike className="w-4 h-4" />
                <span className="ml-1 font-serif">{likeCount}</span>
              </div>
            ) : null}
            {commentCount ? (
              <div className="flex items-center mx-2">
                <BiCommentDetail className="w-4 h-4" />
                <span className="ml-1 font-serif">{commentCount}</span>
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </>
  );
}
