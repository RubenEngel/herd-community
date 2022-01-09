import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { GET_USER_LIKED_POSTS } from "../lib/apolloQueries";
import Loading from "./loading";
import PostPreview from "./post-preview/post-preview";

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
  const [getPosts, { loading, error, data, fetchMore }] = useLazyQuery(
    GET_USER_LIKED_POSTS,
    {
      variables: {
        likedByUserId: likedByUserId,
        limit: 9,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    getPosts();
  }, [category]);

  return !data ? (
    <div className="h-50-screen flex justify-center items-center text-2xl md:text-3xl tracking-wide">
      <Loading />
    </div>
  ) : (
    <div className="px-3 md:px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
      {error && <h1 className="text-4xl text-center">An Error Occurred</h1>}

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
            // animateY={"50%"}
            likeCount={post._count?.likedBy}
            commentCount={post._count?.comments}
          />
        ))}
      {loading && (
        <div className="mt-20 text-2xl md:text-3xl tracking-wide">
          <Loading />
        </div>
      )}
      {data.posts.posts.length > 0 &&
        data.posts.posts.length < (data.posts._count || Infinity) && (
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
