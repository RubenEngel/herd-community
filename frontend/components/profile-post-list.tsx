import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_POSTS } from "../lib/apolloQueries";
import { Post } from "../lib/types";
import LongPostPreview from "./post-preview/long-post-preview";

const ProfilePostList = ({
  published,
  limit = 3,
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
    error,
  }: { data: { posts: Post[] }; loading: boolean; error?: any } = useQuery(
    GET_POSTS,
    {
      variables: {
        published: published,
        authorId: authorId,
        limit: limit,
      },
    }
  );

  useEffect(() => {
    if (!data) return;
    console.log(data);
  }, [data]);

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
          />
          <hr />
          {/* <LongPostPreview
            title={post.title}
            createdAt={post.createdAt}
            featuredImage={post.featuredImage}
            author={post.author}
            slug={post.slug}
            categories={post.categories}
          />
          <hr />
          <LongPostPreview
            title={post.title + " " + post.title + " " + post.title}
            createdAt={post.createdAt}
            featuredImage={post.featuredImage}
            author={post.author}
            slug={post.slug}
            categories={post.categories}
          /> */}
        </>
      ))}
    </div>
  );
};

export default ProfilePostList;

// && data.posts.length < (maxLength || Infinity)
