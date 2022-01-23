import Avatar from "../avatar";
import Link from "next/link";
import PreviewImage from "./preview-image";
import { motion } from "framer-motion";
import Date from "../date";
import { Post, User } from "../../lib/types";
import AnimatedButton from "../animated-button";
import { BiCommentDetail, BiLike } from "react-icons/bi";

interface SmallPostPreviewProps {
  title: string;
  featuredImage: string;
  author: User;
  slug: string;
  createdAt: Date;
  likeCount?: number;
  commentCount?: number;
}

export default function SmallPostPreview({
  title,
  createdAt,
  featuredImage,
  author,
  slug,
  likeCount,
  commentCount,
}: SmallPostPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ bounce: 0, duration: 0.5 }}
      className="rounded-lg my-6"
    >
      <div className="grid grid-cols-6 gap-2">
        {/* Image */}
        <div className="mr-2 col-span-2">
          <PreviewImage
            title={title}
            coverImage={featuredImage}
            slug={slug}
            width={300}
            height={300}
          />
        </div>
        <div className="col-span-4">
          {/* Title */}
          <AnimatedButton className="text-left text-base lg:text-lg mb-2 leading-snug font-serif text-ellipsis">
            <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="">{title}</a>
            </Link>
          </AnimatedButton>
          {/* Date */}
          <div className="mb-2 text-xs">
            <Date date={createdAt}></Date>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex flex-row justify-start items-center col-span-3 ">
              <Avatar small user={author} />
            </div>
            <div className="flex">
              {likeCount ? (
                <div className="flex items-center mx-3">
                  <BiLike className="w-4 h-4" />
                  <span className="ml-1 font-serif">{likeCount}</span>
                </div>
              ) : null}
              {commentCount ? (
                <div className="flex items-center mx-3">
                  <BiCommentDetail className="w-4 h-4" />
                  <span className="ml-1 font-serif ">{commentCount}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
