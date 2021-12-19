import { useContext } from "react";
import Head from "next/head";
import { initializeApollo, addApolloState } from "../lib/apolloClient";
import { GET_POSTS, GET_CATEGORIES } from "../lib/apolloQueries";
import PostPreview from "../components/post-preview/post-preview";
import SmallPostPreview from "../components/post-preview/small-post-preview";
import HomeCategory from "../components/post-preview/home-category";
import { AiFillCaretRight } from "react-icons/ai";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExploreContext } from "../lib/context";
import { Category, Post } from "../lib/types";
import type { GetStaticProps } from "next";

interface CategoryPosts {
  [categoryName: string]: Post[];
}

interface IndexProps {
  categoryPosts: CategoryPosts;
}

const Index = ({ categoryPosts }: IndexProps) => {
  const latestPost: Post = categoryPosts["all"][0];
  const desktopLatestPosts: Post[] = categoryPosts["all"].slice(0, 3);
  const mobileLatestPosts: Post[] = categoryPosts["all"].slice(1, 4);

  const { setCategory } = useContext(ExploreContext);

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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="flex max-w-screen-md justify-center mx-auto bg-primary w-full text-secondary items-center rounded-xl p-1 lg:p-2 font-bold"
              onClick={(e) => setCategory("all")}
            >
              <h1 className="text-lg uppercase mr-4 text-center">
                Latest Stories
              </h1>
              <AiFillCaretRight />
            </motion.button>
          </Link>
        </div>

        {/* ------------------ Desktop Latest Posts ------------- */}
        <div className="hidden md:grid md:grid-cols-3 max-w-6xl mx-auto">
          {desktopLatestPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                bounce: 0,
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
              />
            </motion.div>
          ))}
        </div>
        {/* ------------------ Mobile Latest Posts ---------------- */}
        <div className="p-4 md:hidden">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              bounce: 0,
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
            />
          </motion.div>

          {mobileLatestPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                bounce: 0,
                delay: 0.5 + 0.2 * index,
              }}
            >
              <SmallPostPreview
                createdAt={post.createdAt}
                key={post.id}
                title={post.title}
                coverImage={post.featuredImage}
                author={post.author}
                slug={post.slug}
              />
            </motion.div>
          ))}
        </div>

        {/* ----------- Categories after latest posts ------------- */}
        <div className="grid md:grid-cols-2 max-w-6xl mx-auto">
          {Object.keys(categoryPosts)
            .filter((categoryName) => categoryName !== "all")
            .map((category, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    bounce: 0.05,
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

export default Index;

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
    const posts: Post[] = postsRes.data.posts;
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
