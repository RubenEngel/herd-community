import Avatar from "../avatar";
import Date from "../date";
import Link from "next/link";
import Categories from "../categories";
import { motion } from "framer-motion";
import PreviewImage from "./preview-image";
import { Post, Category, User } from "../../lib/types";

interface PostPreviewProps extends Partial<Post> {
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
  animateY = 0,
  animateScale = 1,
  animateOpacity = 1,
}: PostPreviewProps) {
  return (
    <>
      <motion.div
        initial={{ scale: animateScale, y: animateY, opacity: animateOpacity }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 10,
          duration: 0.5,
        }}
        whileHover={{
          scale: 1.03,
          transition: {
            duration: 0.2,
          },
        }}
        whileTap={{
          scale: 0.9,
        }}
        className="flex mx-auto my-2 flex-col justify-center rounded-lg "
      >
        {/* Image */}
        <div className="mb-1">
          <PreviewImage
            title={title}
            coverImage={featuredImage}
            slug={slug}
            width={1000}
            height={900}
          />
        </div>
        {/* Categories */}
        <div className="mt-2">
          <Categories categories={categories} />
        </div>
        {/* Title */}
        <h3 className="text-lg mb-2">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: title }}
            ></a>
          </Link>
        </h3>
        {/* Date and Author */}
        <div className="text-sm flex flex-row justify-between items-center">
          <Avatar author={author} />
          <Date date={createdAt} />
        </div>
      </motion.div>
    </>
  );
}
