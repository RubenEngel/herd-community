import Head from 'next/head';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import { GET_POSTS } from '../lib/apolloQueries';
import PostPreview from '../components/post-preview';
import SmallPostPreview from '../components/small-post-preview';
import HomeCategory from '../components/home-category';
import { AiFillCaretRight } from 'react-icons/ai';
import Link from 'next/link';
import Header from '../components/header/header';
import { categoryVar } from '../lib/reactiveVars';
import { motion } from 'framer-motion';

export default function Index({
  posts,
  sportPosts,
  culturePosts,
  currentAffairsPosts,
  lifestylePosts,
}) {
  const latestPost = posts[0];
  const desktopLatestPosts = posts.slice(0, 3);
  const mobileLatestPosts = posts.slice(1, 4);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
      >
        <Header />
        <Head>
          <title>HERD</title>
        </Head>
        <div className="text-center">
          <div className="bg-primary text-secondary lg:inline-block items-center lg:mt-6 lg:px-56 lg:rounded-xl p-2 font-bold uppercase">
            <Link href="/explore">
              <button
                onClick={() => categoryVar('All')}
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
          {desktopLatestPosts.map(({ node }) => (
            <div className="p-6">
              <PostPreview
                key={node.slug}
                title={node.title}
                coverImage={node.featuredImage?.node}
                date={node.date}
                author={node.author?.node}
                slug={node.slug}
                excerpt={node.excerpt}
                categories={node.categories}
                // animateScale={0.5}
                // animateOpacity={0}
              />
            </div>
          ))}
        </div>
        {/* Mobile Latest Posts */}
        <div className="p-4 md:hidden">
          <PostPreview
            key={latestPost.node.slug}
            title={latestPost.node.title}
            coverImage={latestPost.node.featuredImage?.node}
            date={latestPost.node.date}
            author={latestPost.node.author?.node}
            slug={latestPost.node.slug}
            excerpt={latestPost.node.excerpt}
            categories={latestPost.node.categories}
            // animateScale={0.5}
            // animateOpacity={0}
          />

          {mobileLatestPosts.map(({ node }) => (
            <SmallPostPreview
              key={node.slug}
              title={node.title}
              coverImage={node.featuredImage?.node}
              date={node.date}
              author={node.author?.node}
              slug={node.slug}
              excerpt={node.excerpt}
              categories={node.categories}
            />
          ))}
        </div>

        {/* Categories after latest posts */}
        <div className="grid md:grid-cols-2 max-w-6xl mx-auto">
          <HomeCategory category="Sport" posts={sportPosts} />

          <HomeCategory category="Culture" posts={culturePosts} />

          <HomeCategory category="Lifestyle" posts={lifestylePosts} />

          <HomeCategory
            category="Current Affairs"
            posts={currentAffairsPosts}
          />
        </div>

        <div className="w-screen font-bold py-6 pr-10 bg-primary text-secondary absolute">
          <div className="flex max-w-6xl m-auto justify-end">
            <Link href="/explore">
              <button className="flex items-center font-bold justify-end">
                <h1 className="text-2xl uppercase mr-4">Explore</h1>
                <AiFillCaretRight className="text-md" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const postsRes = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 4, after: '', category: '' },
  });

  const sportRes = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 4, after: '', category: 'Sport' },
    fetchPolicy: 'no-cache',
  });

  const cultureRes = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 4, after: '', category: 'Culture' },
    fetchPolicy: 'no-cache',
  });

  const currentAffairsRes = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 4, after: '', category: 'Current Affairs' },
    fetchPolicy: 'no-cache',
  });

  const lifestyleRes = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 4, after: '', category: 'Lifestyle' },
    fetchPolicy: 'no-cache',
  });

  const posts = await postsRes.data.posts.edges;
  const culturePosts = await cultureRes.data.posts.edges;
  const sportPosts = await sportRes.data.posts.edges;
  const currentAffairsPosts = await currentAffairsRes.data.posts.edges;
  const lifestylePosts = await lifestyleRes.data.posts.edges;

  return addApolloState(apolloClient, {
    props: {
      posts,
      sportPosts,
      culturePosts,
      currentAffairsPosts,
      lifestylePosts,
    },
    revalidate: 30,
  });
}
