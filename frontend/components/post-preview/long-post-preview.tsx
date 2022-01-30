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
import { FiClock } from "react-icons/fi";

interface PostPreviewProps extends Partial<Post> {
  likeCount: number;
  commentCount: number;
}

const getMinuteRead = (wordCount: number) => {
  // 250 WPM reading speed
  return Math.round(wordCount / 250);
};

const LongPostPreview = ({
  title,
  createdAt,
  featuredImage,
  author,
  slug,
  categories,
  excerpt,
  wordCount,
  likeCount,
  commentCount,
}: PostPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className="rounded-lg my-6 text-left"
    >
      <div className="md:grid grid-cols-6 gap-2">
        {/* Image */}
        <div className="mx-au mr-2 mb-4 col-span-2">
          <PreviewImage title={title} coverImage={featuredImage} slug={slug} />
        </div>
        <div className="col-span-4">
          {/* Title */}
          <AnimatedButton className="text-left text-xl mb-2 leading-snug font-serif">
            <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
              <a>{title}</a>
            </Link>
          </AnimatedButton>
          {/* Date */}
          <div className="mb-2 text-xs">
            <Date date={createdAt}></Date>
          </div>
          {/* Categories */}
          <div className="my-3">
            <Categories categories={categories} />
          </div>
          {/* Avatar and Interactions */}
          <div className="flex justify-between">
            {/* Author */}
            <div className="flex flex-row justify-start items-center col-span-3 ">
              <Avatar user={author} />
            </div>
            <div className="flex">
              {commentCount ? (
                <div className="flex items-center mx-2">
                  <BiCommentDetail className="w-5 h-5" />
                  <h4 className="ml-1">{commentCount}</h4>
                </div>
              ) : null}
              {likeCount ? (
                <div className="flex items-center mx-2">
                  <BiLike className="w-5 h-5" />
                  <h4 className="ml-1">{likeCount}</h4>
                </div>
              ) : null}
            </div>
            {/* Likes and Comments */}
          </div>
          <div
            className="mt-5"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></div>
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <FiClock className="mr-2" />
              <h4>{getMinuteRead(wordCount)} minute read</h4>
            </div>
            <span className="text-3xl">&#183;</span>
            <AnimatedButton className="p-4 text-sm">
              <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
                <a>
                  <h4>Continue Reading...</h4>
                </a>
              </Link>
            </AnimatedButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LongPostPreview;
