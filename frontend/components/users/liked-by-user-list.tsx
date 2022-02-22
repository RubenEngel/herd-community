import React from "react";
import { usePostLikedByQuery } from "../../lib/generated/graphql-types";
import Loading from "../loading";
import UserList from "./user-list";

const LikedByUserList = ({ postId }: { postId: number }) => {
  const { data: likedByData, loading } = usePostLikedByQuery({
    variables: {
      id: postId,
    },
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
