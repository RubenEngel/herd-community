import Avatar from "../avatar";
import Link from "next/link";
import PreviewImage from "./preview-image";
import { motion } from "framer-motion";
import Date from "../date";
import { Post, User } from "../../lib/types";
import AnimatedButton from "../animated-button";

interface SmallPostPreviewProps {
  title: Post["title"];
  featuredImage: Post["featuredImage"];
  author: User;
  slug: Post["slug"];
  createdAt: Post["createdAt"];
}

export default function SmallPostPreview({
  title,
  createdAt,
  featuredImage,
  author,
  slug,
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
          <AnimatedButton className="text-left text-sm md:text-base mb-2 leading-snug font-serif text-ellipsis">
            <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="">{title}</a>
            </Link>
          </AnimatedButton>

          {/* Date */}
          <div className="mb-2 text-xs">
            <Date date={createdAt}></Date>
          </div>
          <div className="lg:flex justify-between text-sm">
            <div className="flex flex-row justify-start items-center col-span-3 ">
              <Avatar author={author} />
            </div>
          </div>
          {/* Author */}
        </div>
      </div>
    </motion.div>
  );
}
