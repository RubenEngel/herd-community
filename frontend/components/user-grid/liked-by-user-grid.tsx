import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { LIKED_BY } from "../../lib/gql-queries";
import Loading from "../loading";

const LikedByUserGrid = ({ postId }: { postId: number }) => {
  const { data: likedByData, loading } = useQuery(LIKED_BY, {
    variables: {
      id: postId,
    },
  });

  useEffect(() => {
    if (!likedByData) return;
    console.log(likedByData.likedBy.likedBy);
  }, [likedByData]);

  return (
    <>
      {likedByData?.likedBy?.likedBy?.map((user) => (
        <p>{user.username}</p>
      ))}
      {loading && <Loading />}
    </>
  );
};

export default LikedByUserGrid;
