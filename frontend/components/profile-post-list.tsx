import React from "react";
import { Waypoint } from "react-waypoint";
import { useGetPostsWithExcerptQuery } from "../lib/generated/graphql-types";
import Loading from "./loading";
import LongPostPreview from "./post-preview/long-post-preview";

const ProfilePostList = ({
  published,
  limit,
  authorId,
}: {
  limit: number;
  published: boolean;
  startLoad?: boolean;
  category?: string;
  authorId?: number;
}) => {
  const { data, loading, fetchMore } = useGetPostsWithExcerptQuery({
    variables: {
      published: published,
      authorId: authorId,
      limit: limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className="mx-auto max-w-2xl text-center">
      {!loading && !data && <h1>No Posts</h1>}
      {data?.posts.posts.map((post, index) => (
        <div key={post.slug}>
          <LongPostPreview
            title={post.title}
            createdAt={post.createdAt}
            featuredImage={post.featuredImage}
            author={post.author}
            slug={post.slug}
            categories={post.categories}
            excerpt={post.excerpt}
            wordCount={post.wordCount}
            likeCount={post._count?.likedBy}
            commentCount={post._count?.comments}
          />
          <hr />
        </div>
      ))}
      {loading && (
        <div className="my-20 text-2xl">
          <Loading />
        </div>
      )}
      {data?.posts.posts.length > 0 &&
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
};

export default ProfilePostList;
