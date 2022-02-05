import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { GET_POSTS } from "../../lib/gql-queries";
import Loading from "../loading";
import PostPreview from "../post-preview/post-preview";

export default function PostGrid({
  published,
  startLoad = true,
  category,
  limit,
  authorId,
  likedByUserId,
  animate,
}: {
  limit: number;
  published: boolean;
  startLoad?: boolean;
  category?: string;
  authorId?: number;
  likedByUserId?: number;
  animate: boolean;
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

  return !data ? (
    <div className="h-50-screen flex items-center justify-center text-2xl tracking-wide md:text-3xl">
      <Loading />
    </div>
  ) : (
    <div className="mb-32 grid grid-cols-1 gap-6 px-3 md:grid-cols-2 md:px-4 lg:grid-cols-3">
      {error && <h1 className="text-center text-4xl">An Error Occurred</h1>}

      {startLoad &&
        data.posts.posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            featuredImage={post.featuredImage}
            createdAt={post.createdAt}
            author={post.author}
            slug={post.slug}
            categories={post.categories}
            animateY={animate && "50%"}
            likeCount={post._count?.likedBy}
            commentCount={post._count?.comments}
          />
        ))}
      {loading && (
        <div className="mt-20 text-2xl tracking-wide md:text-3xl">
          <Loading />
        </div>
      )}
      {data.posts.posts.length > 0 &&
        data.posts.posts.length < data.posts._count && (
          <Waypoint
            onEnter={() => {
              const endCursor =
                data.posts.posts[data.posts.posts.length - 1].id;
              fetchMore({
                variables: {
                  startAfter: endCursor,
                },
              });
            }}
          ></Waypoint>
        )}
    </div>
  );
}
