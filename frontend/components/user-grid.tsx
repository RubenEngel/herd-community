import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_FOLLOWED, GET_FOLLOWERS } from "../lib/gql-queries";
import { User } from "../lib/types";
import UserCard from "./user-card";

interface FollowedUserProps {
  user: Omit<User, "email">;
  type: "followers" | "following";
}

const UserGrid = ({ user, type }: FollowedUserProps) => {
  const getQuery = () => {
    switch (type) {
      case "following":
        return GET_FOLLOWED;
      case "followers":
        return GET_FOLLOWERS;
    }
  };
  const { data } = useQuery(getQuery(), {
    variables: { username: user?.username },
  });

  return (
    <div className="px-3 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-32 content-start items-center justify-start">
      {type === "following" &&
        data?.user.following.map((user) => (
          <UserCard key={user.id} editable={false} linked user={user} />
        ))}
      {type === "followers" &&
        data?.user.followers.map((user) => (
          <UserCard key={user.id} editable={false} linked user={user} />
        ))}
    </div>
  );
};

export default UserGrid;
