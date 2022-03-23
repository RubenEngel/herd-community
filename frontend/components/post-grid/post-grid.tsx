import { ApolloError } from "@apollo/client";
import React from "react";
import { Waypoint } from "react-waypoint";
import { Post } from "../../lib/generated/graphql-types";
import Loading from "../loading";
import PostPreview from "../post-preview/post-preview";

const PostGrid = ({
  startLoad,
  error,
  posts,
  animateY,
  loading,
  totalPostCount,
  onWaypointEnter,
}: {
  startLoad: boolean;
  error: ApolloError;
  posts: Post[];
  animateY?: string;
  loading: boolean;
  totalPostCount: number;
  onWaypointEnter: () => void;
}) => {
  return (
    <div className="mb-32 grid grid-cols-1 items-start gap-6 px-3 md:grid-cols-2 md:px-4 lg:grid-cols-3">
      {error && <h1 className="text-center text-4xl">An Error Occurred</h1>}

      {startLoad &&
        posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            featuredImage={post.featuredImage}
            createdAt={post.createdAt}
            author={post.author}
            slug={post.slug}
            categories={post.categories}
            animateY={animateY}
            likeCount={post._count?.likedBy}
            commentCount={post._count?.comments}
            twHeight={"md:h-80 lg:h-64"}
          />
        ))}
      {loading && (
        <div className="mt-20 text-2xl tracking-wide md:text-3xl">
          <Loading />
        </div>
      )}
      {posts.length > 0 && posts.length < totalPostCount && (
        <Waypoint
          onEnter={() => {
            onWaypointEnter ? onWaypointEnter() : null;
          }}
        ></Waypoint>
      )}
    </div>
  );
};

export default PostGrid;
