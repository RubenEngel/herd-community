import Avatar from "../avatar";
import Link from "next/link";
import PreviewImage from "./preview-image";
import { motion } from "framer-motion";
import Date from "../date";
import { User } from "../../lib/generated/graphql-types";
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
      className="my-6 rounded-lg"
    >
      <div className="grid grid-cols-6 gap-2">
        {/* Image */}
        <div className="col-span-2 mr-2">
          <PreviewImage
            title={title}
            coverImage={featuredImage}
            slug={slug}
            width={300}
          />
        </div>
        <div className="col-span-4">
          {/* Title */}
          <AnimatedButton className="mb-2 text-ellipsis text-left font-serif text-base leading-snug lg:text-lg">
            <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="">{title}</a>
            </Link>
          </AnimatedButton>
          {/* Date */}
          <div className="mb-2 text-xs">
            <Date date={createdAt}></Date>
          </div>
          <div className="flex justify-between text-sm">
            <div className="col-span-3 flex flex-row items-center justify-start">
              <Avatar small user={author} />
            </div>
            <div className="flex">
              {commentCount ? (
                <div className="flex items-center">
                  <BiCommentDetail className="h-4 w-4" />
                  <span className="ml-1 font-serif ">{commentCount}</span>
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
        </div>
      </div>
    </motion.div>
  );
}
