import React from "react";
import Link from "next/link";
import { AiFillCaretRight } from "react-icons/ai";
import PostPreview from "./post-preview";
import SmallPostPreview from "./small-post-preview";
import { Post } from "../../lib/types";
import { motion } from "framer-motion";
import { CategoryContext } from "../context/category-provider";

export default function HomeCategory({
  posts,
  categoryName,
}: {
  posts: Post[];
  categoryName: string;
}) {
  const latestPost = posts[0];
  const latestStories = posts?.slice(1, 4);

  const { setCategory } = React.useContext(CategoryContext);

  return (
    <div>
      <div className="px-4">
        <Link scroll={false} href="/explore">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex mx-auto max-w-md justify-center bg-primary w-full text-secondary items-center rounded-xl p-1 lg:p-2 font-bold"
            onClick={(e) => setCategory(e.currentTarget.textContent)}
          >
            <h1 className="text-lg mr-4 uppercase">
              {categoryName.split("_").join(" ")}
            </h1>
            <AiFillCaretRight />
          </motion.button>
        </Link>
      </div>

      <div className="p-4 md:p-6 lg:p-10">
        <PostPreview
          key={latestPost.slug}
          title={latestPost.title}
          featuredImage={latestPost.featuredImage}
          createdAt={latestPost.createdAt}
          author={latestPost.author}
          slug={latestPost.slug}
          categories={latestPost.categories}
          likeCount={latestPost._count.likedBy}
          commentCount={latestPost._count.comments}
        />

        {latestStories.map((post) => (
          <SmallPostPreview
            createdAt={post.createdAt}
            key={post.slug}
            title={post.title}
            featuredImage={post.featuredImage}
            author={post.author}
            slug={post.slug}
            likeCount={post._count.likedBy}
            commentCount={post._count.comments}
          />
        ))}
      </div>
    </div>
  );
}
