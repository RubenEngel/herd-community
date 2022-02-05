import { PrismaUser } from "../lib/types";
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
import { useMutation } from "@apollo/client";
import { FOLLOW_USER, UNFOLLOW_USER } from "../lib/gql-queries";
import toast from "react-hot-toast";
import UploadProfileImage from "./upload-profile-image";
import Link from "next/link";
import router from "next/router";
import { SignInContext, AuthContext } from "./context/auth-provider";
import { authHeaders } from "../lib/supabase";

interface UserCardProps {
  user?: Omit<PrismaUser, "email"> & {
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
          className="h-28 w-28 rounded-full object-cover"
          src={profileImageUrl}
        ></img>
      ) : (
        <FaUserCircle className="h-28 w-28 rounded-full" />
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
  const { userAuth, userData, updateUserData, setShowSignIn } =
    useContext(AuthContext);

  const [ownProfile, setOwnProfile] = useState(false);

  const [profileImageUrl, setProfileImage] = useState(user?.imageUrl);

  const cancelUpload = () => {
    setProfileImage(user.imageUrl);
  };

  // ---- Follow user
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
    if (userData) {
      setIsFollowing(
        userData.following?.some(
          (followedUser) => followedUser.id === user.id
        ) || false
      );
    }
  }, [userData]);

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
        updateUserData();
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
        updateUserData();
      } catch (error) {
        toast.error("Error");
      }
    }
  };

  return (
    <div
      className={`z-10 mx-auto flex justify-center pt-4 text-left ${
        !editable || (router.route === "/my-account" && "items-center")
      }`}
    >
      <div className="relative z-0 mr-4">
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
        {!ownProfile && (
          <AnimatedButton
            variant={isFollowing ? "green" : "green-outline"}
            className="mt-3 mr-2"
            disabled={followLoading || unfollowLoading}
            onClick={() => {
              if (userAuth && userData) {
                handleFollow();
              } else {
                setShowSignIn(true);
              }
            }}
          >
            {isFollowing ? "Following" : "Follow"}
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default UserCard;
