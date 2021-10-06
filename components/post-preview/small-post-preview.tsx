import Avatar from "../avatar";
import Link from "next/link";
import PreviewImage from "./preview-image";
import { motion } from "framer-motion";
import Date from "../date";
import { Post, User } from "../../lib/types";

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
    >
      <div className="grid grid-cols-5">
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
          <h3 className="text-sm mb-3 leading-snug">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a
                className="hover:underline"
                dangerouslySetInnerHTML={{ __html: title }}
              ></a>
            </Link>
          </h3>
          {/* Date */}
          <div className="text-sm">
            <Date date={createdAt}></Date>
          </div>
          {/* Author */}
          <div className="flex flex-row justify-start items-center text-xs col-span-3">
            <Avatar author={author} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
