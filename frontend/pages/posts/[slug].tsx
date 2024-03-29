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
  POST_LIKED_BY,
} from "../../lib/graphql/queries-and-mutations";
import { addApolloState, initializeApollo } from "../../lib/apollo-client";
import {
  Post,
  PostLikedByQueryVariables,
  Role,
  useLikePostMutation,
  usePostLikedByQuery,
  useUnlikePostMutation,
} from "../../lib/generated/graphql-types";
import PostGridDataProvider from "../../components/post-grid/post-grid.data-provider";
import { useViewportScroll, AnimatePresence } from "framer-motion";
import { Waypoint } from "react-waypoint";
import formatString from "../../lib/format-string";
import PostInteractions from "../../components/header/post-interactions";
import ProgressBar from "../../components/progress-bar";
import UserCard from "../../components/users/user-card";
import toast from "react-hot-toast";
import Modal from "../../components/modal";
import { AuthContext } from "../../components/context/auth-provider";
import { CategoryContext } from "../../components/context/category-provider";
import { authHeaders } from "../../lib/supabase";
import Comments from "../../components/comments/comment-list";
import LikedByUserList from "../../components/users/liked-by-user-list";

export default function PostPage({ post }: { post: Post }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  // --- context
  const { category } = useContext(CategoryContext);
  const { userData, setShowSignIn } = useContext(AuthContext);

  // --- check if user can edit post, own post or ADMIN account
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (userData?.email && userData.email === post.author?.email) {
      setIsEditable(true);
    }
    if (String(userData?.role) === Role.Admin) {
      setIsEditable(true);
    }
  }, [userData]);

  // ----- post liking functions and state
  const [likePost, { loading: likeLoading }] = useLikePostMutation({
    variables: {
      id: post.id,
    },
    refetchQueries: () => [
      {
        query: POST_LIKED_BY,
        variables: {
          id: post.id,
        } as PostLikedByQueryVariables,
      },
    ],
    context: authHeaders(),
  });

  const [unlikePost, { loading: unlikeLoading }] = useUnlikePostMutation({
    variables: {
      id: post.id,
    },
    refetchQueries: () => [
      {
        query: POST_LIKED_BY,
        variables: {
          id: post.id,
        } as PostLikedByQueryVariables,
      },
    ],
    context: authHeaders(),
  });

  const { data: likedByData, loading: likedByDataLoading } =
    usePostLikedByQuery({
      variables: {
        id: post.id,
      },
    });

  useEffect(() => {
    if (likedByData) {
      const likedByArr = likedByData.postLikedBy;
      if (userData) {
        setIsLiked(
          likedByArr?.some((user) => user.id === userData.id) || false
        );
      }
    }
  }, [likedByData, userData]);

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!userData) return setShowSignIn(true);
    if (!isLiked) {
      try {
        const res = await likePost();
        const newLikedByArray = res.data.likePost.likedBy;
        setIsLiked(newLikedByArray.some((user) => user.id === userData.id));
      } catch (error) {
        toast.error("Error");
      }
    } else {
      try {
        const unlikeRes = await unlikePost();
        const newLikedByArray = unlikeRes.data.unlikePost.likedBy;
        setIsLiked(newLikedByArray.some((user) => user.id === userData.id));
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
        <div className="flex h-full flex-col justify-center">
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
                  title={`Comments ${
                    post._count.comments ? "(" + post._count.comments + ")" : ""
                  }`}
                  setModalOpen={setShowComments}
                >
                  <Comments postId={post.id} />
                </Modal>
              )}
              {showLikedBy && (
                <Modal
                  key={"liked-by-modal"}
                  title={`Liked By ${
                    likedByData?.postLikedBy.length
                      ? "(" + likedByData?.postLikedBy.length + ")"
                      : ""
                  }`}
                  setModalOpen={setShowLikedBy}
                >
                  <LikedByUserList postId={post.id} />
                </Modal>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {percentageComplete < 100 && (
                <PostInteractions
                  likeLoading={likeLoading || unlikeLoading}
                  likeCount={likedByData?.postLikedBy.length}
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
              likeCount={
                likedByData?.postLikedBy.length
                  ? likedByData?.postLikedBy.length
                  : post._count.likedBy
              }
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
            <h1 className="mb-8 text-center text-4xl uppercase">
              More Posts from {formatString(category, "_")}
            </h1>
          </Waypoint>
          <PostGridDataProvider
            animate
            published
            startLoad={reachedEnd}
            category={category}
            limit={12}
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
    revalidate: 60,
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
