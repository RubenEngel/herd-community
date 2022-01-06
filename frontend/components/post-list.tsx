import { useEffect } from "react";
import PostPreview from "./post-preview/post-preview";
import { useLazyQuery } from "@apollo/client";
import Loading from "./loading";
import { Waypoint } from "react-waypoint";
import { GET_POSTS } from "../lib/apolloQueries";

export default function PostList({
  published,
  startLoad = true,
  category,
  limit,
  authorId,
}: {
  limit: number;
  published: boolean;
  startLoad?: boolean;
  category?: string;
  authorId?: number;
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
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    getPosts();
  }, [category]);

  return !data ? (
    <div className="h-50-screen flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <div className="px-3 md:px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
      {error && <h1 className="text-4xl text-center">An Error Occurred</h1>}

      {startLoad &&
        data.posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            featuredImage={post.featuredImage}
            createdAt={post.createdAt}
            author={post.author}
            slug={post.slug}
            categories={post.categories}
            animateY={"50%"}
            likeCount={post._count.likedBy}
            commentCount={post._count.comments}
          />
        ))}
      {loading && (
        <div className="mt-20 text-2xl">
          <Loading />
        </div>
      )}
      {data.posts.length > 0 && (
        <Waypoint
          onEnter={() => {
            const endCursor = data.posts[data.posts.length - 1].id;
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
