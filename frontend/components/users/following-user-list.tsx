import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWING } from "../../lib/gql-queries";
import { PrismaUser } from "../../lib/types";
import UserList from "./user-list";
import Loading from "../loading";
import toast from "react-hot-toast";

const FollowingUserList = ({
  username,
}: {
  username: PrismaUser["username"];
}) => {
  const { data, loading, error } = useQuery(GET_FOLLOWING, {
    variables: { username: username },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load");
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  return <UserList users={data?.user?.following} />;
};

export default FollowingUserList;
