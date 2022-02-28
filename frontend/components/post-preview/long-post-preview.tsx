import React from "react";
import Avatar from "../avatar";
import Link from "next/link";
import PreviewImage from "./preview-image";
import { motion } from "framer-motion";
import Date from "../date";
import { Post } from "../../lib/generated/graphql-types";
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
      className="my-6 rounded-lg text-left"
    >
      <div className="grid-cols-6 gap-2 md:grid">
        {/* Image */}
        <div className="mx-au col-span-2 mr-2 mb-4">
          <PreviewImage
            width={300}
            height={250}
            title={title}
            coverImage={featuredImage}
            slug={slug}
          />
        </div>
        <div className="col-span-4">
          {/* Title */}
          <AnimatedButton
            hoverScale={1.02}
            className="mb-2 text-left font-serif text-xl leading-snug"
          >
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
            <div className="col-span-3 flex flex-row items-center justify-start ">
              <Avatar user={author} />
            </div>
            <div className="flex">
              {commentCount ? (
                <div className="mx-2 flex items-center">
                  <BiCommentDetail className="h-5 w-5" />
                  <h4 className="ml-1">{commentCount}</h4>
                </div>
              ) : null}
              {likeCount ? (
                <div className="mx-2 flex items-center">
                  <BiLike className="h-5 w-5" />
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
            <div className="mr-3 flex items-center">
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
