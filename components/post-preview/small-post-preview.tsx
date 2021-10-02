import Avatar from "../avatar";
import Link from "next/link";
import PreviewImage from "./preview-image";
import { motion } from "framer-motion";

export default function SmallPostPreview({ title, coverImage, author, slug }) {
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
          {/* Author */}
          <div className="flex flex-row justify-start items-center text-xs col-span-3">
            <Avatar author={author} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
