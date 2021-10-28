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
import { Post } from "../lib/types";
import { useRouter } from "next/router";
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

  // const router = useRouter();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
      >
        <Head>
          <title>HERD</title>
        </Head>
        {/* --------------- Latest Posts Heading ----------------- */}
        <div className="text-center">
          <div className="bg-primary text-secondary lg:inline-block items-center lg:mt-6 lg:px-56 rounded-xl p-1 lg:p-2 font-bold uppercase">
            <Link href="/explore">
              <button
                onClick={(e) => setCategory("all")}
                className="flex items-center font-bold mx-auto"
              >
                <h1 className="text-lg uppercase mr-4">Latest Stories</h1>
                <AiFillCaretRight />
              </button>
            </Link>
          </div>
        </div>
        {/* ------------------ Desktop Latest Posts ------------- */}
        <div className="hidden md:grid md:grid-cols-3 max-w-6xl mx-auto">
          {desktopLatestPosts.map((post, index) => (
            <div key={index} className="p-6">
              <PostPreview
                title={post.title}
                featuredImage={post.featuredImage}
                createdAt={post.createdAt}
                author={post.author}
                slug={post.slug}
                categories={post.categories}
                // animateScale={0.5}
                // animateOpacity={0}
              />
            </div>
          ))}
        </div>
        {/* ------------------ Mobile Latest Posts ---------------- */}
        <div className="p-4 md:hidden">
          <PostPreview
            key={latestPost.id + "m"}
            title={latestPost.title}
            featuredImage={latestPost.featuredImage}
            createdAt={latestPost.createdAt}
            author={latestPost.author}
            slug={latestPost.slug}
            categories={latestPost.categories}
            // animateScale={0.5}
            // animateOpacity={0}
          />

          {mobileLatestPosts.map((post) => (
            <SmallPostPreview
              createdAt={post.createdAt}
              key={post.id}
              title={post.title}
              coverImage={post.featuredImage}
              author={post.author}
              slug={post.slug}
            />
          ))}
        </div>

        {/* ----------- Categories after latest posts ------------- */}
        <div className="grid md:grid-cols-2 max-w-6xl mx-auto">
          {Object.keys(categoryPosts)
            .filter((categoryName) => categoryName !== "all")
            .map((category, index) => {
              return (
                <HomeCategory
                  key={index}
                  categoryName={category}
                  posts={categoryPosts[category]}
                />
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

  const categoryNames = categoriesRes.data.getCategories.map((cat) => cat.name);
  categoryNames.unshift("all");

  let categoryPosts: { [catgoryName: string]: Post[] } = {};

  const limit = 6;

  for (let i = 0; i < categoryNames.length; ++i) {
    let category = categoryNames[i];
    let postsRes = await apolloClient.query({
      query: GET_POSTS,
      variables: { category: category, limit: limit },
    });
    let posts: Post[] = postsRes.data.getPosts;
    categoryPosts[category] = [];
    categoryPosts[category].push(...posts);
  }

  return addApolloState(apolloClient, {
    props: {
      categoryPosts,
    },
    revalidate: 60,
  });
};
