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
  useTransform,
  useSpring,
  useElementScroll,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Waypoint } from "react-waypoint";

interface PostProps {
  post: Post;
}

export default function PostPage({ post }: PostProps) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const [percentageComplete, setPercentageComplete] = useState(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pathLength = useSpring(yRange, {
    stiffness: 400,
    damping: 90,
  });

  useEffect(() => {
    pathLength.onChange((value) => {
      setPercentageComplete(value);
      console.log(value);
    });
  }, [pathLength]);

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
                    background: "green",
                    position: "fixed",
                    left: "0px",
                    top: "68px",
                    height: "5px",
                    opacity: 0.5 + percentageComplete / 85,
                    width: (percentageComplete / 85) * 100 + "%",
                  }}
                />
              </div>
            )}

            {post.tags.length > 0 && <Tags tags={post.tags} />}
            <Container>
              <PostBody content={post.content} />
            </Container>
          </article>
          <div
          // className={!reachedEnd ? "mt-52" : null}
          >
            <Waypoint
              onEnter={() => {
                setReachedEnd(true);
              }}
            ></Waypoint>
          </div>
          <h1 className="text-4xl uppercase text-center mb-8">
            More Posts from {post.categories[0].name}
          </h1>
          <PostList
            startLoad={reachedEnd}
            category={post.categories[0].name}
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
