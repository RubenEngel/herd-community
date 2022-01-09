import { User } from "../lib/types";
import AnimatedButton from "./animated-button";
import { FaUserCircle } from "react-icons/fa";
import capitalizeFirstLetter from "../lib/capitalizeFirstLetter";
import { useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FOLLOW_USER, GET_FOLLOWED, UNFOLLOW_USER } from "../lib/apolloQueries";
import toast from "react-hot-toast";
import UploadProfileImage from "./upload-profile-image";
import { UserContext } from "../lib/context";
import Link from "next/link";

interface UserCardProps {
  user: Omit<User, "email"> & {
    _count: {
      posts: number;
      followers: number;
      following: number;
      likedPosts: number;
      comments: number;
    };
  };
  editable: boolean;
  linked: boolean;
  setFollowedBy?: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
      }[]
    >
  >;
}

const UserCard = ({
  user,
  setFollowedBy,
  editable = false,
  linked,
}: UserCardProps) => {
  // current logged in user's data
  const { userData } = useContext(UserContext);

  const [ownProfile, setOwnProfile] = useState(false);

  const [profileImageUrl, setProfileImage] = useState(user?.imageUrl);

  const cancelUpload = () => {
    setProfileImage(user.imageUrl);
  };

  // ---- Follow user

  const { data: followerData, loading: followerDataLoading } = useQuery(
    GET_FOLLOWED,
    {
      variables: {
        username: userData?.username,
      },
    }
  );

  const [isFollowing, setIsFollowing] = useState(false);
  const [followUser, { loading: followLoading }] = useMutation(FOLLOW_USER);
  const [unfollowUser, { loading: unfollowLoading }] =
    useMutation(UNFOLLOW_USER);

  useEffect(() => {
    if (!userData || !user) return;
    if (userData?.username === user?.username) {
      setOwnProfile(true);
    }
    setIsFollowing(
      user.followers?.some((follower) => follower.id === userData.id)
    );
    if (!followerData) {
      return;
    } else {
      console.log(followerData);
      setIsFollowing(
        followerData.user.following.some(
          (followedUser) => followedUser.id === user.id
        )
      );
    }
  }, [userData, followerData]);

  const handleFollow = async () => {
    if (!isFollowing) {
      try {
        const res = await followUser({
          variables: { userId: user.id },
        });
        const newFollowers = res.data.followUser.followers;
        setFollowedBy?.(newFollowers);
        setIsFollowing(
          newFollowers.some((follower) => follower.id === userData.id)
        );
      } catch (error) {
        toast.error("Error", { position: "bottom-right" });
      }
    } else {
      try {
        const res = await unfollowUser({ variables: { userId: user.id } });
        const newFollowers = res.data.unfollowUser.followers;
        setFollowedBy?.(newFollowers);
        setIsFollowing(
          newFollowers.some((follower) => follower.id === userData.id)
        );
      } catch (error) {
        toast.error("Error", { position: "bottom-right" });
      }
    }
  };

  const ProfileImage = () => {
    return (
      <>
        {profileImageUrl ? (
          <img
            className="w-28 h-28 rounded-full object-cover"
            src={profileImageUrl}
          ></img>
        ) : (
          <FaUserCircle className="w-28 h-28 rounded-full" />
        )}
        {ownProfile && editable && (
          <div className="absolute -top-3 -right-3">
            <UploadProfileImage
              cancelUpload={cancelUpload}
              setProfileImage={setProfileImage}
            />
          </div>
        )}
      </>
    );
  };

  const ProfileName = () => {
    return (
      <>
        <h1 className="text-3xl">
          {user.lastName
            ? `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(
                user.lastName
              )}`
            : `${capitalizeFirstLetter(user.firstName)}`}
        </h1>
        <h4 className="text-lg">@{user.username}</h4>
      </>
    );
  };

  return (
    <div
      className={`flex justify-center z-10 mx-auto text-left p-5 ${
        !editable && "items-center"
      }`}
    >
      <div className="mr-6 relative z-0">
        {linked ? (
          <AnimatedButton>
            <Link href={`/users/${user.username}`}>
              <a href="">
                <ProfileImage />
              </a>
            </Link>
          </AnimatedButton>
        ) : (
          <ProfileImage />
        )}
      </div>
      <div className={`text-left ${editable && ""}`}>
        {linked ? (
          <AnimatedButton className="block text-left">
            <Link href={`/users/${user.username}`}>
              <a href="">
                <ProfileName />
              </a>
            </Link>
          </AnimatedButton>
        ) : (
          <ProfileName />
        )}
        {ownProfile && editable && (
          <AnimatedButton variant={"primary"} className="mt-3 mr-2">
            Edit Details
          </AnimatedButton>
        )}
        {!ownProfile && userData && (
          <AnimatedButton
            variant={isFollowing ? "green" : "green-outline"}
            className="mt-3 mr-2"
            disabled={followLoading || unfollowLoading || followerDataLoading}
            onClick={() => handleFollow()}
          >
            {isFollowing ? "Following" : "Follow"}
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default UserCard;
