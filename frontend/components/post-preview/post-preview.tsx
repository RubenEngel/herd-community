import Avatar from "../avatar";
import Date from "../date";
import Link from "next/link";
import Categories from "../categories";
import { motion } from "framer-motion";
import PreviewImage from "./preview-image";
import { Post } from "../../lib/generated/graphql-types";
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
        className="mx-auto my-2 flex flex-col justify-center rounded-lg"
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
        <AnimatedButton className="mb-1 text-left font-serif text-lg">
          <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
            <a aria-label={title}>{title}</a>
          </Link>
        </AnimatedButton>
        <div className="mb-3 text-xs">
          <Date date={createdAt} />
        </div>
        {/* Date and Author */}
        <div className="flex flex-row items-center justify-between text-sm">
          <Avatar user={author} />
          <div className="flex">
            {commentCount ? (
              <div className="flex items-center">
                <BiCommentDetail className="h-4 w-4" />
                <span className="ml-1 font-serif">{commentCount}</span>
              </div>
            ) : null}
            {likeCount ? (
              <div className="ml-3 flex items-center">
                <BiLike className="h-4 w-4" />
                <span className="ml-1 font-serif">{likeCount}</span>
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </>
  );
}
