import React, { useContext, useEffect, useState } from "react";
import { User } from "../../lib/generated/graphql-types";
import AnimatedButton from "../animated-button";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import capitalize from "../../lib/capitalize-first-letter";
import { AuthContext } from "../context/auth-provider";
import toast from "react-hot-toast";
import { authHeaders } from "../../lib/supabase";
import { useMutation } from "@apollo/client";
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../../lib/graphql/queries-and-mutations";

const UserRow = ({ user }: { user: User }) => {
  const { userData, userAuth, updateUserData, setShowSignIn } =
    useContext(AuthContext);

  const [isFollowing, setIsFollowing] = useState(
    userData?.following?.some((followedUser) => followedUser.id === user.id) ||
      false
  );

  useEffect(() => {
    if (userData) {
      setIsFollowing(
        userData.following?.some(
          (followedUser) => followedUser.id === user.id
        ) || false
      );
    }
  }, [userData]);

  const [followUser, { loading: followLoading }] = useMutation(FOLLOW_USER, {
    context: authHeaders(),
  });

  const [unfollowUser, { loading: unfollowLoading }] = useMutation(
    UNFOLLOW_USER,
    {
      context: authHeaders(),
    }
  );

  const handleFollow = async () => {
    if (!isFollowing) {
      try {
        const res = await followUser({
          variables: { userId: user.id },
        });
        if (!res) {
          throw new Error("couldn't follow");
        }
        const newFollowers = res.data.followUser.followers;
        if (!newFollowers) {
          throw new Error("no follower mutation data");
        }
        setIsFollowing(
          newFollowers.some((follower) => follower.id === userData.id)
        );
        updateUserData();
      } catch (error) {
        toast.error("Error following");
      }
    } else {
      try {
        const res = await unfollowUser({ variables: { userId: user.id } });
        if (!res) {
          throw new Error("couldn't unfollow");
        }
        const newFollowers = res.data.unfollowUser.followers;
        if (!newFollowers) {
          throw new Error("no follower mutation data");
        }
        setIsFollowing(
          newFollowers.some((follower) => follower.id === userData.id)
        );
        updateUserData();
      } catch (error) {
        toast.error("Error unfollowing");
      }
    }
  };

  return (
    <div className="mx-auto mb-7 mt-3 flex max-w-xl items-center justify-between">
      <AnimatedButton>
        <Link href={`/users/${user.username}`}>
          <a className="flex" href="">
            <div className="mr-3">
              {user.imageUrl ? (
                <img
                  className="h-14 w-14 rounded-full object-cover"
                  src={user.imageUrl}
                  alt={user.username}
                ></img>
              ) : (
                <FaUserCircle className="h-14 w-14 rounded-full" />
              )}
            </div>
            <div className="mr-3 text-left text-sm">
              <h3>
                {user.lastName
                  ? `${capitalize(user.firstName)} ${capitalize(user.lastName)}`
                  : `${capitalize(user.firstName)}`}
              </h3>
              <h4>@{user.username}</h4>
            </div>
          </a>
        </Link>
      </AnimatedButton>
      {userData?.id !== user.id && (
        <AnimatedButton
          disabled={followLoading || unfollowLoading}
          onClick={() => {
            if (userAuth && userData) {
              handleFollow();
            } else {
              setShowSignIn(true);
            }
          }}
          variant={isFollowing ? "green" : "green-outline"}
        >
          {isFollowing ? "Following" : "Follow"}
        </AnimatedButton>
      )}
    </div>
  );
};

const UserList = ({ users }: { users: User[] | undefined }) => {
  return (
    <div>
      {users?.map((user) => (
        <UserRow key={user.username} user={user} />
      ))}
    </div>
  );
};

export default UserList;
