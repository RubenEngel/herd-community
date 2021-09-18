import { useContext } from "react";
import Head from "next/head";
import { initializeApollo, addApolloState } from "../lib/apolloClient";
import { GET_POSTS, GET_ALL_POST_SLUGS, GET_USER } from "../lib/apolloQueries";
import PostPreview from "../components/post-preview";
import SmallPostPreview from "../components/small-post-preview";
import HomeCategory from "../components/home-category";
import { AiFillCaretRight } from "react-icons/ai";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExploreContext } from "../lib/context";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Post } from "../lib/types";
import { supportsResultCaching } from "@apollo/client/cache/inmemory/entityStore";

// interface IndexProps {
//   posts: Post[];
// }

const Index = ({
  posts = [],
  sportPosts = [],
  culturePosts = [],
  currentAffairsPosts = [],
  lifestylePosts = [],
  climatePosts = [],
}) => {
  const latestPost: Post = posts[0];
  const desktopLatestPosts: Post[] = posts.slice(0, 3);
  const mobileLatestPosts: Post[] = posts.slice(1, 4);

  const { setCategory } = useContext(ExploreContext);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
      >
        {/* {loading ? <h1>Loading</h1> : <h1>Not loading</h1>} */}
        {/* </motion.div>
    </>
  );
} */}

        <Head>
          <title>HERD</title>
        </Head>
        <div className="text-center">
          <div className="bg-primary text-secondary lg:inline-block items-center lg:mt-6 lg:px-56 rounded-xl p-1 lg:p-2 font-bold uppercase">
            <Link href="/explore">
              <button
                onClick={(e) => setCategory("All")}
                className="flex items-center font-bold mx-auto"
              >
                <h1 className="text-lg uppercase mr-4">Latest Stories</h1>
                <AiFillCaretRight />
              </button>
            </Link>
          </div>
        </div>
        {/* Desktop Latest Posts*/}
        <div className="hidden md:grid md:grid-cols-3 max-w-6xl mx-auto">
          {desktopLatestPosts.map((post, index) => (
            <div className="p-6">
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                categories={post.categories}
                // animateScale={0.5}
                // animateOpacity={0}
              />
            </div>
          ))}
        </div>
        {/* Mobile Latest Posts */}
        <div className="p-4 md:hidden">
          <PostPreview
            key={latestPost.slug}
            title={latestPost.title}
            coverImage={latestPost.featuredImage}
            date={latestPost.date}
            author={latestPost.author}
            slug={latestPost.slug}
            categories={latestPost.categories}
            // animateScale={0.5}
            // animateOpacity={0}
          />

          {mobileLatestPosts.map((post) => (
            <SmallPostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.featuredImage}
              author={post.author}
              slug={post.slug}
              // categories={post.categories}
              // date={post.date}
            />
          ))}
        </div>

        {/* Categories after latest posts */}
        <div className="grid md:grid-cols-2 max-w-6xl mx-auto">
          <HomeCategory categoryName="Climate" posts={climatePosts} />

          <HomeCategory categoryName="Lifestyle" posts={lifestylePosts} />

          <HomeCategory categoryName="Culture" posts={culturePosts} />

          <HomeCategory
            categoryName="Current Affairs"
            posts={currentAffairsPosts}
          />

          <HomeCategory categoryName="Sport" posts={sportPosts} />
        </div>
      </motion.div>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  // const postsRes = await apolloClient.query({
  //   query: GET_POSTS,
  //   variables: { category: "All", limit: 5 },
  // });

  // const sportRes = await apolloClient.query({
  //   query: GET_POSTS,
  //   variables: { category: "Sport", limit: 5 },
  // });

  // const cultureRes = await apolloClient.query({
  //   query: GET_POSTS,
  //   variables: { category: "Culture", limit: 5 },
  // });

  // const currentAffairsRes = await apolloClient.query({
  //   query: GET_POSTS,
  //   variables: { category: "Current Affairs", limit: 5 },
  // });

  // const lifestyleRes = await apolloClient.query({
  //   query: GET_POSTS,
  //   variables: { category: "Lifestyle", limit: 5 },
  // });

  // const climateRes = await apolloClient.query({
  //   query: GET_POSTS,
  //   variables: { category: "Climate", limit: 5 },
  // });

  // const posts = await postsRes.data.posts;
  // const sportPosts = await sportRes.data.posts;
  // const culturePosts = await cultureRes.data.posts;
  // const currentAffairsPosts = await currentAffairsRes.data.posts;
  // const lifestylePosts = await lifestyleRes.data.posts;
  // const climatePosts: Post[] = await climateRes.data.posts;

  return addApolloState(apolloClient, {
    props: {
      // posts,
      // sportPosts,
      // culturePosts,
      // currentAffairsPosts,
      // lifestylePosts,
      // climatePosts,
    },
    // revalidate: 600,
  });
}
