import React, { useEffect } from "react";
import { useGetFollowersQuery, User } from "../../lib/generated/graphql-types";
import UserList from "./user-list";
import Loading from "../loading";
import toast from "react-hot-toast";

const FollowersUserList = ({ username }: { username: User["username"] }) => {
  const { data, loading, error } = useGetFollowersQuery({
    variables: { username: username },
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
