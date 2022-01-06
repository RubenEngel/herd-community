import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { GET_POSTS_WITH_EXCERPT } from "../lib/apolloQueries";
import { Post } from "../lib/types";
import Loading from "./loading";
import LongPostPreview from "./post-preview/long-post-preview";

const ProfilePostList = ({
  published,
  limit,
  authorId,
  maxLength,
}: {
  limit: number;
  published: boolean;
  startLoad?: boolean;
  category?: string;
  authorId?: number;
  maxLength?: number;
}) => {
  const {
    data,
    loading,
    // error,
    fetchMore,
  }: {
    data: { posts: Post[] };
    loading: boolean;
    // error?: any;
    fetchMore: any;
  } = useQuery(GET_POSTS_WITH_EXCERPT, {
    variables: {
      published: published,
      authorId: authorId,
      limit: limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className="mx-auto max-w-2xl">
      {!loading && !data && <h1>No Posts</h1>}
      {data?.posts.map((post) => (
        <>
          <LongPostPreview
            title={post.title}
            createdAt={post.createdAt}
            featuredImage={post.featuredImage}
            author={post.author}
            slug={post.slug}
            categories={post.categories}
            excerpt={post.excerpt}
            wordCount={post.wordCount}
            likeCount={post._count.likedBy}
            commentCount={post._count.comments}
          />
          <hr />
        </>
      ))}
      {loading && (
        <div className="my-20 text-2xl">
          <Loading />
        </div>
      )}
      {data?.posts.length > 0 && data.posts.length < (maxLength || Infinity) && (
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
};

export default ProfilePostList;
