import { useMemo } from "react";
import { useGetUserLikedPostsQuery } from "../../lib/generated/graphql-types";
import Loading from "../loading";
import PostGrid from "./post-grid";

export default function LikedPostGrid({
  startLoad = true,
  category,
  likedByUserId,
}: {
  limit: number;
  published: boolean;
  startLoad?: boolean;
  category?: string;
  authorId?: number;
  likedByUserId?: number;
}) {
  const { loading, error, data, fetchMore } = useGetUserLikedPostsQuery({
    variables: {
      likedByUserId: likedByUserId,
      limit: 9,
    },
    notifyOnNetworkStatusChange: true,
  });

  const posts = useMemo(() => data?.posts?.posts, [data]);

  return !data ? (
    <div className="h-50-screen flex items-center justify-center text-2xl tracking-wide md:text-3xl">
      <Loading />
    </div>
  ) : (
    <PostGrid
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
