import { useEffect, useState, useContext } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-content/post-body";
import PostHeader from "../../components/post-content/post-header";
import Head from "next/head";
import Tags from "../../components/post-content/tags";
import Loading from "../../components/loading";
import { GET_POST, GET_ALL_POST_SLUGS } from "../../lib/apolloQueries";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { Post } from "../../lib/types";
import PostList from "../../components/post-list";
import {
  motion,
  useViewportScroll,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { Waypoint } from "react-waypoint";
import formatString from '../../lib/formatString';
import { ExploreContext } from "../../lib/context"
import PostInteractions from '../../components/header/post-interactions';

interface PostProps {
  post: Post;
}

export default function PostPage({ post }: PostProps) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const {category} = useContext(ExploreContext)

  // Scroll progress bar
  const [startedReading, setStartedReading] = useState(false)
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const { scrollY, scrollYProgress } = useViewportScroll();;
  const scrollYSpring = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  useEffect(() => (
    scrollY.onChange(value => {
      if (value > 60) {
        setStartedReading(true)
      } else {
        setStartedReading(false)
      }
    })
    
  ))

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
              {startedReading && <PostInteractions/>}
            </AnimatePresence>
            
            <PostHeader
              title={post.title}
              coverImage={post.featuredImage}
              date={post.createdAt}
              author={post.author}
              categories={post.categories}
            />
            {!reachedEnd && (
              <div className="w-screen">
                <motion.div
                  style={{
                    background: "#50C878",
                    position: "fixed",
                    left: "0px",
                    top: "68px",
                    height: "9px",
                    width: (percentageComplete / 90) * 100 + "%",
                  }}
                />
              </div>
            )}

            {post.tags.length > 0 && <Tags tags={post.tags} />}
            <Container>
              <PostBody content={post.content} />
            </Container>
          </article>
          <div>
            <Waypoint
              onEnter={() => {
                setReachedEnd(true);
              }}
            ></Waypoint>
          </div>
          <h1 className="text-4xl uppercase text-center mb-8">
            More Posts from {formatString(category, "_")}
          </h1>
          <PostList
            startLoad={reachedEnd}
            category={category}
            limit={3}
          />
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

  const post = await response.data.getPost;

  return addApolloState(apolloClient, {
    props: {
      post: post,
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_ALL_POST_SLUGS,
  });

  return {
    paths: response.data.getPosts.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
};
