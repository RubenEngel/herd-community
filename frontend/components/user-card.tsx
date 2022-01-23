import { User } from "../lib/types";
import AnimatedButton from "./animated-button";
import { FaUserCircle } from "react-icons/fa";
import capitalizeFirstLetter from "../lib/capitalize-first-letter";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FOLLOW_USER, GET_FOLLOWED, UNFOLLOW_USER } from "../lib/gql-queries";
import toast from "react-hot-toast";
import UploadProfileImage from "./upload-profile-image";
import Link from "next/link";
import router from "next/router";
import { UserContext } from "./context/auth-provider";
import { supabase, authHeaders } from "../lib/supabase";

interface UserCardProps {
  user?: Omit<User, "email"> & {
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

const ProfileImage = ({
  profileImageUrl,
  ownProfile,
  editable,
  cancelUpload,
  setProfileImage,
}: {
  profileImageUrl: string;
  ownProfile: boolean;
  editable: boolean;
  cancelUpload: () => void;
  setProfileImage: Dispatch<SetStateAction<string>>;
}) => {
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

const ProfileName = ({
  firstName,
  lastName,
  username,
}: {
  firstName: string;
  lastName: string;
  username: string;
}) => {
  return (
    <>
      <h1 className="text-3xl">
        {lastName
          ? `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
              lastName
            )}`
          : `${capitalizeFirstLetter(firstName)}`}
      </h1>
      <h4 className="text-lg">@{username}</h4>
    </>
  );
};

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
  const [followUser, { loading: followLoading }] = useMutation(FOLLOW_USER, {
    context: authHeaders(),
  });

  const [unfollowUser, { loading: unfollowLoading }] = useMutation(
    UNFOLLOW_USER,
    {
      context: authHeaders(),
    }
  );

  useEffect(() => {
    if (!userData || !user || ownProfile) return;
    if (userData?.username === user?.username) {
      setOwnProfile(true);
    }
    setIsFollowing(
      user.followers?.some((follower) => follower.id === userData.id)
    );
    if (!followerData) {
      return;
    } else {
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
        toast.error("Error");
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
        toast.error("Error");
      }
    }
  };

  return (
    <div
      className={`flex justify-center z-10 pt-4 mx-auto text-left ${
        !editable || (router.route === "/my-account" && "items-center")
      }`}
    >
      <div className="mr-4 relative z-0">
        {linked ? (
          <AnimatedButton>
            <Link href={`/users/${user.username}`}>
              <a href="">
                <ProfileImage
                  profileImageUrl={profileImageUrl}
                  cancelUpload={cancelUpload}
                  ownProfile={ownProfile}
                  editable={editable}
                  setProfileImage={setProfileImage}
                />
              </a>
            </Link>
          </AnimatedButton>
        ) : (
          <ProfileImage
            profileImageUrl={profileImageUrl}
            cancelUpload={cancelUpload}
            ownProfile={ownProfile}
            editable={editable}
            setProfileImage={setProfileImage}
          />
        )}
      </div>
      <div className={`text-left ${editable && ""}`}>
        {(user?.firstName || user?.lastName || user?.username) &&
          (linked ? (
            <AnimatedButton className="block text-left">
              <Link href={`/users/${user.username}`}>
                <a href="">
                  <ProfileName
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    username={user?.username}
                  />
                </a>
              </Link>
            </AnimatedButton>
          ) : (
            <ProfileName
              firstName={user?.firstName}
              lastName={user?.lastName}
              username={user?.username}
            />
          ))}
        {ownProfile && editable && router.route !== "/my-account" && (
          <AnimatedButton
            variant={"primary"}
            className="mt-3 mr-2"
            onClick={() => router.push("/my-account")}
          >
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
