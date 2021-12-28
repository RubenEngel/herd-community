import Avatar from "../avatar";
import Link from "next/link";
import PreviewImage from "./preview-image";
import { motion } from "framer-motion";
import Date from "../date";
import { Post, User } from "../../lib/types";
import AnimatedButton from "../button";

interface SmallPostPreviewProps {
  title: Post["title"];
  coverImage: Post["featuredImage"];
  author: User;
  slug: Post["slug"];
  createdAt: Post["createdAt"];
}

export default function SmallPostPreview({
  title,
  createdAt,
  coverImage,
  author,
  slug,
}: SmallPostPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ bounce: 0, duration: 0.5 }}
      className="rounded-lg my-6"
      whileHover={{
        scale: 1.03,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <div className="grid grid-cols-5 gap-2">
        {/* Image */}
        <div className="mr-2 col-span-2">
          <PreviewImage
            title={title}
            coverImage={coverImage}
            slug={slug}
            width={500}
            height={400}
          />
        </div>
        <div className="col-span-3">
          {/* Title */}
          <AnimatedButton className="text-left text-sm mb-2 leading-snug font-serif">
            <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
              <a>{title}</a>
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
