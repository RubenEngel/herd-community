import { useEffect, useState, useContext } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../../components/post-content/post-body";
import PostHeader from "../../components/post-content/post-header";
import Head from "next/head";
import Loading from "../../components/loading";
import {
  GET_POST,
  GET_ALL_POST_SLUGS,
  LIKE_POST,
  LIKED_BY,
  UNLIKE_POST,
} from "../../lib/gql-queries";
import { addApolloState, initializeApollo } from "../../lib/apollo-client";
import { Post } from "../../lib/types";
import PostGrid from "../../components/post-grid";
import { useViewportScroll, AnimatePresence } from "framer-motion";
import { Waypoint } from "react-waypoint";
import formatString from "../../lib/format-string";
import PostInteractions from "../../components/header/post-interactions";
import { useMutation, useQuery } from "@apollo/client";
import ProgressBar from "../../components/progress-bar";
import UserCard from "../../components/user-card";
import toast from "react-hot-toast";
import Modal from "../../components/modal";
import {
  SignInContext,
  UserContext,
} from "../../components/context/auth-provider";
import { CategoryContext } from "../../components/context/category-provider";
import { authHeaders } from "../../lib/supabase";
import Comments from "../../components/comments";
import LikedByUserGrid from "../../components/user-grid/liked-by-user-grid";

interface PostProps {
  post: Post;
}

export default function PostPage({ post }: PostProps) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  // --- context
  const setShowSignIn = useContext(SignInContext);
  const { category } = useContext(CategoryContext);
  const { userData } = useContext(UserContext);

  // --- check if user can edit post, own post or ADMIN account
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (userData?.email && userData.email === post.author?.email) {
      setIsEditable(true);
    }
    if (String(userData?.role) === "ADMIN") {
      setIsEditable(true);
    }
  }, [userData]);

  // ----- post liking function and state
  const [likePost, { loading: likeLoading }] = useMutation(LIKE_POST, {
    variables: {
      id: post?.id,
    },
    context: authHeaders(),
  });

  const [unlikePost, { loading: unlikeLoading }] = useMutation(UNLIKE_POST, {
    variables: {
      id: post?.id,
    },
    context: authHeaders(),
  });

  const { data: likedByData, loading: likedByDataLoading } = useQuery(
    LIKED_BY,
    {
      variables: {
        id: post?.id,
      },
    }
  );

  type LikedBy = {
    firstName: string;
    lastName: string;
    id: number;
    username: string;
  }[];

  const [likedBy, setLikedBy] = useState<LikedBy>();

  useEffect(() => {
    if (!userData) return;
    if (likedByData) {
      const likedByArray: LikedBy = likedByData.likedBy.likedBy;
      setLikedBy(likedByArray);
      setIsLiked(likedByArray.some((user) => user.id === userData.id));
    }
  }, [likedByData, userData]);

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!userData) return setShowSignIn(true);
    if (!isLiked) {
      try {
        const likeRes = await likePost();
        const likedByArray: LikedBy = likeRes.data.likePost.likedBy;
        setLikedBy(likedByArray);
        setIsLiked(likedByArray.some((user) => user.id === userData.id));
      } catch (error) {
        toast.error("Error");
      }
    } else {
      try {
        const unlikeRes = await unlikePost();
        const likedByArray: LikedBy = unlikeRes.data.unlikePost.likedBy;
        setLikedBy(likedByArray);
        setIsLiked(likedByArray.some((user) => user.id === userData.id));
      } catch (error) {
        toast.error("Error");
      }
    }
  };

  // ---- Post sharing
  const [isSharable, setIsShareable] = useState(false);

  useEffect(() => {
    if (navigator?.share) setIsShareable(true);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator
          .share({
            url: router.asPath,
            title: post.title,
            text: "Check out this article on HERD!",
          })
          .then(() => console.log("The post was shared!"));
      } catch (error) {
        console.log(`Oops! I couldn't share because: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        "Web share is currently not supported on this browser. Please provide a callback"
      );
    }
  };

  // --- Scroll progress bar
  const [startedReading, setStartedReading] = useState(false);
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const { scrollY } = useViewportScroll();
  const [intialPageHeight, setInitialPageHeight] = useState<number>();
  useEffect(() => {
    setInitialPageHeight(
      window.document.body.offsetHeight - window.innerHeight
    );
  }, []);
  useEffect(() => {
    return scrollY.onChange((value) => {
      if (value > 60) {
        setStartedReading(true);
      } else {
        setStartedReading(false);
      }
    });
  });
  useEffect(() => {
    return scrollY.onChange((value) => {
      setPercentageComplete((value / intialPageHeight) * 100);
    });
  }, [scrollY, intialPageHeight]);
  // ---

  // --- Socials
  const [showComments, setShowComments] = useState(false);
  const [showLikedBy, setShowLikedBy] = useState(false);

  // ---

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
              {showComments && (
                <Modal
                  key="comments-modal"
                  title="Comments"
                  setModalOpen={setShowComments}
                >
                  <Comments postId={post.id} />
                </Modal>
              )}
              {showLikedBy && (
                <Modal
                  key={"liked-by-modal"}
                  title="Liked By"
                  setModalOpen={setShowLikedBy}
                >
                  <LikedByUserGrid postId={post.id} />
                </Modal>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {startedReading && percentageComplete < 100 && (
                <PostInteractions
                  likeLoading={likeLoading || unlikeLoading}
                  likeCount={likedBy?.length}
                  commentCount={post._count.comments}
                  slug={post.slug}
                  isEditable={isEditable}
                  isLiked={isLiked}
                  isSharable={isSharable}
                  handleLike={handleLike}
                  handleShare={handleShare}
                  setShowComments={setShowComments}
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
              likeCount={likedBy ? likedBy.length : post._count.likedBy}
              commentCount={post._count.comments}
              likedByDataLoading={likedByDataLoading}
              setShowComments={setShowComments}
              setShowLikedBy={setShowLikedBy}
            />
            {startedReading && percentageComplete < 100 && (
              <ProgressBar percentageComplete={percentageComplete} />
            )}
            <PostBody content={post.content} />
            <div className="mb-16">
              <UserCard linked={true} editable={false} user={post.author} />
            </div>
          </article>
          <Waypoint
            bottomOffset={100}
            onEnter={() => {
              setReachedEnd(true);
            }}
          >
            <h1 className="text-4xl text-center mb-8 uppercase">
              More Posts from {formatString(category, "_")}
            </h1>
          </Waypoint>
          <PostGrid
            animate
            published
            startLoad={reachedEnd}
            category={category}
            limit={6}
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

  const post = await response.data.post;

  return addApolloState(apolloClient, {
    props: {
      post: post,
    },
    revalidate: 1,
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_ALL_POST_SLUGS,
  });

  return {
    paths: response.data.posts.posts.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
};
