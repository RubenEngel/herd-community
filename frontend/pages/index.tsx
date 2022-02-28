import { useContext } from "react";
import Head from "next/head";
import { initializeApollo, addApolloState } from "../lib/apollo-client";
import {
  GET_POSTS,
  GET_CATEGORIES,
} from "../lib/graphql/queries-and-mutations";
import PostPreview from "../components/post-preview/post-preview";
import SmallPostPreview from "../components/post-preview/small-post-preview";
import HomeCategory from "../components/post-preview/home-category";
import { AiFillCaretRight } from "react-icons/ai";
import Link from "next/link";
import { motion } from "framer-motion";
import { Category, Post } from "../lib/generated/graphql-types";
import type { GetStaticProps } from "next";
import { CategoryContext } from "../components/context/category-provider";
// import { useUser } from "@auth0/nextjs-auth0";

interface CategoryPosts {
  [categoryName: string]: Post[];
}

interface IndexProps {
  categoryPosts: CategoryPosts;
}

const Home = ({ categoryPosts }: IndexProps) => {
  const latestPost: Post = categoryPosts["all"][0];
  const desktopLatestPosts: Post[] = categoryPosts["all"].slice(0, 3);
  const mobileLatestPosts: Post[] = categoryPosts["all"].slice(1, 4);

  const { setCategory } = useContext(CategoryContext);

  const variants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  const transition = {
    type: "spring",
    bounce: 0,
  };

  return (
    <>
      <motion.div>
        <Head>
          <title>HERD</title>
        </Head>
        {/* --------------- Latest Posts Heading ----------------- */}
        <div className="px-4">
          <Link scroll={false} href="/explore">
            <motion.button
              variants={variants}
              transition={transition}
              initial={"hidden"}
              animate="show"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary text-secondary mx-auto mb-5 flex w-full items-center justify-center rounded-xl p-1 font-bold lg:p-2"
              onClick={() => setCategory("all")}
            >
              <h1 className="mr-4 text-center text-lg uppercase">
                Latest Stories
              </h1>
              <AiFillCaretRight />
            </motion.button>
          </Link>
        </div>

        {/* ------------------ Desktop Latest Posts ------------- */}
        <div className="mx-auto hidden max-w-6xl md:grid md:grid-cols-3">
          {desktopLatestPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={variants}
              initial={"hidden"}
              animate={"show"}
              transition={{
                ...transition,
                delay: 0.3 + 0.15 * index,
              }}
              className="p-6"
            >
              <PostPreview
                title={post.title}
                featuredImage={post.featuredImage}
                createdAt={post.createdAt}
                author={post.author}
                slug={post.slug}
                categories={post.categories}
                likeCount={post._count.likedBy}
                commentCount={post._count.comments}
              />
            </motion.div>
          ))}
        </div>
        {/* ------------------ Mobile Latest Posts ---------------- */}
        <div className="p-4 md:hidden">
          <motion.div
            variants={variants}
            initial={"hidden"}
            animate={"show"}
            transition={{
              ...transition,
              delay: 0.4,
            }}
          >
            <PostPreview
              key={latestPost.id + "m"}
              title={latestPost.title}
              featuredImage={latestPost.featuredImage}
              createdAt={latestPost.createdAt}
              author={latestPost.author}
              slug={latestPost.slug}
              categories={latestPost.categories}
              likeCount={latestPost._count.likedBy}
              commentCount={latestPost._count.comments}
            />
          </motion.div>

          {mobileLatestPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={variants}
              initial={"hidden"}
              animate={"show"}
              transition={{
                ...transition,
                delay: 0.5 + 0.2 * index,
              }}
            >
              <SmallPostPreview
                createdAt={post.createdAt}
                key={post.id}
                title={post.title}
                featuredImage={post.featuredImage}
                author={post.author}
                slug={post.slug}
                likeCount={post._count.likedBy}
                commentCount={post._count.comments}
              />
            </motion.div>
          ))}
        </div>

        {/* ----------- Categories after latest posts ------------- */}
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          {Object.keys(categoryPosts)
            .filter((categoryName) => categoryName !== "all")
            .map((category, index) => {
              return (
                <motion.div
                  key={index}
                  variants={variants}
                  initial={"hidden"}
                  animate={"show"}
                  transition={{
                    ...transition,
                    delay: 0.8 + 0.15 * index,
                  }}
                >
                  <HomeCategory
                    key={index}
                    categoryName={category}
                    posts={categoryPosts[category]}
                  />
                </motion.div>
              );
            })}
        </div>
      </motion.div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const categoriesRes = await apolloClient.query({
    query: GET_CATEGORIES,
  });

  const categoryNames = categoriesRes.data.categories.map(
    (category: Category) => category.name
  );
  categoryNames.unshift("all");

  let categoryPosts: { [catgoryName: string]: Post[] } = {};

  const limit = 6;

  for (let i = 0; i < categoryNames.length; ++i) {
    const category = categoryNames[i];
    const postsRes = await apolloClient.query({
      query: GET_POSTS,
      variables: { published: true, category: category, limit: limit },
    });
    const posts: Post[] = postsRes.data.posts.posts;
    categoryPosts[category] = [];
    categoryPosts[category].push(...posts);
  }

  return addApolloState(apolloClient, {
    props: {
      categoryPosts,
    },
    revalidate: 30,
  });
};
