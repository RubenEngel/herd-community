import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { LIKED_BY } from "../../lib/gql-queries";
import Loading from "../loading";
import UserList from "./user-list";

const LikedByUserList = ({ postId }: { postId: number }) => {
  const { data: likedByData, loading } = useQuery(LIKED_BY, {
    variables: {
      id: postId,
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <UserList users={likedByData?.likedBy?.likedBy} />
    </>
  );
};

export default LikedByUserList;