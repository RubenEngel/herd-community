import { useEffect, useState, useContext } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../../components/post-content/post-body";
import PostHeader from "../../components/post-content/post-header";
import Head from "next/head";
import Loading from "../../components/loading";
import { GET_POST, GET_ALL_POST_SLUGS } from "../../lib/apolloQueries";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { Post } from "../../lib/types";
import PostList from "../../components/post-list";
import { UserContext } from "../../lib/context";
import {
  motion,
  useViewportScroll,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { Waypoint } from "react-waypoint";
import formatString from "../../lib/formatString";
import { ExploreContext } from "../../lib/context";
import PostInteractions from "../../components/header/post-interactions";

interface PostProps {
  post: Post;
}

export default function PostPage({ post }: PostProps) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const { userData } = useContext(UserContext);

  // Check if user can edit post, own post or ADMIN account
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
    if (userData?.email && (userData.email === post.author?.email)) {
      setIsEditable(true);
    }
    if (String(userData?.role) === "ADMIN") {
      setIsEditable(true);
    }
  }, [userData]);

  const { category } = useContext(ExploreContext);

  // ---> Scroll progress bar
  const [startedReading, setStartedReading] = useState(false);
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const { scrollY, scrollYProgress } = useViewportScroll();
  const scrollYSpring = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });
  useEffect(() =>
    scrollY.onChange((value) => {
      if (value > 60) {
        setStartedReading(true);
      } else {
        setStartedReading(false);
      }
    })
  );
  // <---

  useEffect(() => {
    scrollYSpring.onChange((value) => setPercentageComplete(value * 100));
  }, [scrollYSpring]);

  return (
    <>
      {router.isFallback ? (
        <div className="h-full flex flex-col justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title || "HERD Post"}</title>
              <meta property="og:image" content={post.featuredImage} />
            </Head>
            <AnimatePresence>
              {startedReading && (
                <PostInteractions
                  slug={post.slug}
                  isEditable={isEditable}
                />
              )}
            </AnimatePresence>
            <PostHeader
              title={post.title}
              coverImage={post.featuredImage}
              date={post.createdAt}
              author={post.author}
              categories={post.categories}
              tags={post.tags}
            />
            {!reachedEnd && startedReading && (
              <div className="w-screen">
                <motion.div
                  style={{
                    background: "#50C878",
                    position: "fixed",
                    left: "0px",
                    top: "68px",
                    height: "8px",
                    width: ((percentageComplete - 3) / 80) * 100 + "%",
                  }}
                />
              </div>
            )}
            <PostBody content={post.content} />
          </article>
          <div>
            <Waypoint
              bottomOffset={"25%"}
              onEnter={() => {
                setReachedEnd(true);
              }}
            >
              <h1 className="text-4xl text-center mb-8 uppercase">
                More Posts from {formatString(category, "_")}
              </h1>
            </Waypoint>
          </div>
          <PostList published startLoad={reachedEnd} category={category} limit={3} />
        </>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_POST,
    variables: { slug: params.slug },
  });

  const post = await response.data.post;

  return addApolloState(apolloClient, {
    props: {
      post: post,
    },
    revalidate: 30
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_ALL_POST_SLUGS,
  });

  return {
    paths: response.data.posts.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
};
