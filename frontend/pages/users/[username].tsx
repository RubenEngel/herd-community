import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/loading";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter";
import { GET_USER_BY_USERNAME } from "../../lib/apolloQueries";
import { User } from "../../lib/types";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../lib/context";
import UploadProfileImage from "../../components/upload-profile-image";
import AnimatedButton from "../../components/animated-button";
import ProfilePostList from "../../components/profile-post-list";

interface UserPageProps {
  user: Omit<User, "email"> & {
    _count: {
      posts: number;
      followers: number;
      following: number;
      likedPosts: number;
      comments: number;
    };
  };
}

const ProfileStat = ({ title, count }: { title: string; count: number }) => {
  return (
    <AnimatedButton className="mx-5 text-center">
      <h4 className="">{title}</h4>
      <h4>{count}</h4>
    </AnimatedButton>
  );
};

const UserPage = ({ user }: UserPageProps) => {
  const router = useRouter();

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
  }, [userData]);

  // TODO: check user is following
  const [isFollowing, setIsFollowing] = useState(false);

  if (!user) return <h1 className="text-center mt-44">User doesn't exist</h1>;

  return (
    <>
      {router.isFallback ? (
        <div className="h-full flex flex-col justify-center">
          <Loading />
        </div>
      ) : (
        <>
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
              {!ownProfile &&
                (isFollowing ? (
                  <AnimatedButton
                    variant={"green"}
                    className="mt-3 mr-2"
                    onClick={() => setIsFollowing(false)}
                  >
                    Following
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    variant={"green-outline"}
                    className="mt-3 mr-2"
                    onClick={() => setIsFollowing(true)}
                  >
                    Follow
                  </AnimatedButton>
                ))}
            </div>
          </div>
          <div className="flex mt-10 md:justify-center overflow-auto md:overflow-hidden">
            <ProfileStat title="Posts" count={user._count.posts} />
            <ProfileStat title="Followers" count={user._count.followers} />
            <ProfileStat title="Following" count={user._count.following} />
            <ProfileStat title="Liked Posts" count={user._count.likedPosts} />
            <ProfileStat title="Comments" count={user._count.comments} />
          </div>

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
