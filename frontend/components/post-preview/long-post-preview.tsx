import React from "react";
import Avatar from "../avatar";
import Link from "next/link";
import PreviewImage from "./preview-image";
import { motion } from "framer-motion";
import Date from "../date";
import { Post } from "../../lib/types";
import AnimatedButton from "../animated-button";
import { BiCommentDetail, BiLike } from "react-icons/bi";
import Categories from "../categories";

interface PostPreviewProps extends Partial<Post> {}

const LongPostPreview = ({
  title,
  createdAt,
  featuredImage,
  author,
  slug,
  categories,
}: PostPreviewProps) => {
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
          <AnimatedButton className="text-left text-xl mb-2 leading-snug font-serif text-ellipsis">
            <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="">{title}</a>
            </Link>
          </AnimatedButton>

          {/* Date */}
          <div className="mb-2 text-xs">
            <Date date={createdAt}></Date>
          </div>
          {/* Categories */}
          <div className="my-2">
            <Categories categories={categories} />
          </div>
          <div className="flex">
            <div className="flex flex-row justify-start items-center col-span-3 ">
              <Avatar author={author} />
            </div>
            <div className="flex items-center mx-3">
              <BiLike />
              <h4 className="ml-1">2</h4>
            </div>
            <div className="flex items-center mx-3">
              <BiCommentDetail />
              <h4 className="ml-1">3</h4>
            </div>
          </div>
          {/* Author */}
        </div>
      </div>
    </motion.div>
  );
};

export default LongPostPreview;
