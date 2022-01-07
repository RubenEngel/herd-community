import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/loading";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter";
import {
  FOLLOW_USER,
  GET_USER_BY_USERNAME,
  UNFOLLOW_USER,
} from "../../lib/apolloQueries";
import { User } from "../../lib/types";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../lib/context";
import UploadProfileImage from "../../components/upload-profile-image";
import AnimatedButton from "../../components/animated-button";
import ProfilePostList from "../../components/profile-post-list";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { BsArrowDown } from "react-icons/bs";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface UserPageProps {
  user: Omit<User, "email"> & {
    followers: User[];
    _count: {
      posts: number;
      followers: number;
      following: number;
      likedPosts: number;
      comments: number;
    };
  };
}

const ProfileStat = ({
  title,
  count,
  onClick,
}: {
  title: string;
  count: number;
  onClick: () => void;
}) => {
  return (
    <AnimatedButton onClick={onClick} className="mx-5 text-center">
      <h4 className="">{title}</h4>
      <h4>{count}</h4>
    </AnimatedButton>
  );
};

const UserPage = ({ user }: UserPageProps) => {
  const router = useRouter();

  // current logged in user's data
  const { userData } = useContext(UserContext);

  const [ownProfile, setOwnProfile] = useState(false);

  const [profileImage, setProfileImage] = useState(user?.imageUrl);

  const cancelUpload = () => {
    setProfileImage(user.imageUrl);
  };

  useEffect(() => {
    if (!userData || !user) return;
    if (userData?.username === user?.username) {
      setOwnProfile(true);
    }
    setIsFollowing(
      user.followers.some((follower) => follower.id === userData.id)
    );
  }, [userData]);

  // ---- Follow users
  const [followedBy, setFollowedBy] = useState<{ id: number }[]>(
    user.followers
  );
  const [isFollowing, setIsFollowing] = useState(
    user.followers.some((follower) => follower.id === userData.id)
  );
  const [followUser, { loading: followLoading }] = useMutation(FOLLOW_USER);
  const [unfollowUser, { loading: unfollowLoading }] =
    useMutation(UNFOLLOW_USER);

  const handleFollow = async () => {
    if (!isFollowing) {
      try {
        const res = await followUser({
          variables: { userId: user.id },
        });
        const newFollowers = res.data.followUser.followers;
        setFollowedBy(newFollowers);
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
        setFollowedBy(newFollowers);
        setIsFollowing(
          newFollowers.some((follower) => follower.id === userData.id)
        );
      } catch (error) {
        toast.error("Error", { position: "bottom-right" });
      }
    }
  };

  // ---- modal open state
  const [modalOpen, setModalOpen] = useState(false);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 1000,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  if (!user) return <h1 className="text-center mt-44">User doesn't exist</h1>;

  return (
    <>
      {router.isFallback ? (
        <div className="h-full flex flex-col justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {/* Modal */}
          <AnimatePresence exitBeforeEnter>
            {modalOpen && (
              <motion.div
                key={"modal-background"}
                className="w-screen h-screen z-10 fixed left-0 bottom-0 bg-primary flex justify-center items-center pt-36"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0 }}
              >
                <motion.div
                  key={"modal-content"}
                  drag
                  dragConstraints={{ top: 0, left: 0, right: 0 }}
                  dragElastic={{ left: 0, right: 0, top: 0 }}
                  dragMomentum={false}
                  className="bg-white h-full w-full rounded-t-3xl justify-center max-w-4xl"
                  variants={variants}
                  initial={"hidden"}
                  animate={"show"}
                  exit={"hidden"}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                >
                  {/* Close button */}
                  <AnimatedButton
                    onClick={() => setModalOpen(false)}
                    className="bg-white h-10 w-10 rounded-full flex justify-center items-center mx-auto relative bottom-2"
                  >
                    <BsArrowDown className="h-6 w-6" />
                  </AnimatedButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* User Card */}
          <div className="flex mt-10 justify-center">
            <div className="mr-6 relative">
              {profileImage ? (
                <img
                  className="w-28 h-28 rounded-full object-cover"
                  src={profileImage}
                ></img>
              ) : (
                <FaUserCircle className="w-28 h-28 rounded-full" />
              )}
              {ownProfile && (
                <div className="absolute -top-3 -right-3">
                  <UploadProfileImage
                    cancelUpload={cancelUpload}
                    setProfileImage={setProfileImage}
                  />
                </div>
              )}
            </div>
            <div className="mt-2">
              <h1 className="text-3xl">
                {user.lastName
                  ? `${capitalizeFirstLetter(
                      user.firstName
                    )} ${capitalizeFirstLetter(user.lastName)}`
                  : `${capitalizeFirstLetter(user.firstName)}`}
              </h1>
              <h4 className="text-lg">@{user.username}</h4>
              {ownProfile && (
                <AnimatedButton variant={"primary"} className="mt-3 mr-2">
                  Edit Details
                </AnimatedButton>
              )}
              {!ownProfile && (
                <AnimatedButton
                  variant={isFollowing ? "green" : "green-outline"}
                  className="mt-3 mr-2"
                  disabled={followLoading || unfollowLoading}
                  onClick={
                    // setIsFollowing((prevFollowing) => !prevFollowing)
                    handleFollow
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </AnimatedButton>
              )}
            </div>
          </div>
          {/* Profile stats */}
          <div className="flex mt-10 md:justify-center overflow-auto md:overflow-hidden">
            <ProfileStat
              onClick={() => setModalOpen(true)}
              title="Posts"
              count={user._count.posts}
            />
            <ProfileStat
              onClick={() => setModalOpen(true)}
              title="Followers"
              count={followedBy.length}
            />
            <ProfileStat
              onClick={() => setModalOpen(true)}
              title="Following"
              count={user._count.following}
            />
            <ProfileStat
              onClick={() => setModalOpen(true)}
              title="Liked Posts"
              count={user._count.likedPosts}
            />
            <ProfileStat
              onClick={() => setModalOpen(true)}
              title="Comments"
              count={user._count.comments}
            />
          </div>
          {/* Post list */}
          <hr className="my-10" />
          <ProfilePostList
            limit={3}
            maxLength={user._count.posts}
            published
            authorId={user.id}
          />
        </>
      )}
    </>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const username = params.username;

  const userResponse = await apolloClient.query({
    query: GET_USER_BY_USERNAME,
    variables: { username: username },
  });

  const user = userResponse.data.userByUsername;

  return addApolloState(apolloClient, {
    props: {
      user,
    },
  });
};
