import { useQuery } from "@apollo/client";
import React from "react";
import { POST_LIKED_BY } from "../../lib/gql-queries";
import Loading from "../loading";
import UserList from "./user-list";

const LikedByUserList = ({ postId }: { postId: number }) => {
  const { data: likedByData, loading } = useQuery(POST_LIKED_BY, {
    variables: {
      id: postId,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <div className="relative bottom-10 flex h-full w-full items-center justify-center text-2xl">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <UserList users={likedByData?.postLikedBy} />
    </>
  );
};

export default LikedByUserList;
