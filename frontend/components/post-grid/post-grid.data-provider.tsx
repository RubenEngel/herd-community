import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { GET_POSTS } from "../../lib/gql-queries";
import Loading from "../loading";
import PostGrid from "./post-grid";

export default function PostGridDataProvider({
  published,
  startLoad = true,
  category,
  limit,
  authorId,
  likedByUserId,
  animate,
}: {
  animate?: boolean;
  limit: number;
  published: boolean;
  startLoad?: boolean;
  category?: string;
  authorId?: number;
  likedByUserId?: number;
}) {
  const [getPosts, { loading, error, data, fetchMore }] = useLazyQuery(
    GET_POSTS,
    {
      variables: {
        published: published,
        limit: limit,
        category: category,
        startAfter: null,
        authorId: authorId,
        likedByUserId: likedByUserId,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) getPosts();
    return () => {
      mounted = false;
    };
  }, [category]);

  const posts = useMemo(() => data?.posts?.posts, [data]);

  return !data ? (
    <div className="h-50-screen flex items-center justify-center text-2xl tracking-wide md:text-3xl">
      <Loading />
    </div>
  ) : (
    <PostGrid
      animateY={animate ? "50%" : undefined}
      error={error}
      onWaypointEnter={() =>
        fetchMore({
          variables: {
            startAfter: posts[posts?.length - 1].id,
          },
        })
      }
      loading={loading}
      posts={data.posts.posts}
      totalPostCount={data.posts._count}
      startLoad={startLoad}
    />
  );
}
