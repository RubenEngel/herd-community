import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../lib/gql-queries";
import { PrismaUser } from "../../lib/types";
import UserList from "./user-list";
import Loading from "../loading";
import toast from "react-hot-toast";

const FollowersUserList = ({
  username,
}: {
  username: PrismaUser["username"];
}) => {
  const { data, loading, error } = useQuery(GET_FOLLOWERS, {
    variables: { username: username },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load");
    }
  }, [error]);

  if (loading) {
    return (
      <div
        className="h-modal-content relative
      bottom-10 flex w-full items-center justify-center text-2xl"
      >
        <Loading />
      </div>
    );
  }

  return <UserList users={data?.user?.followers} />;
};

export default FollowersUserList;
