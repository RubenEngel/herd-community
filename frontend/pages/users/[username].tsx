import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../../components/loading";
import { addApolloState, initializeApollo } from "../../lib/apollo-client";
import capitalizeFirstLetter from "../../lib/capitalize-first-letter";
import { GET_USER_BY_USERNAME } from "../../lib/graphql/queries-and-mutations";
import AnimatedButton from "../../components/animated-button";
import ProfilePostList from "../../components/profile-post-list";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/modal";
import PostGridDataProvider from "../../components/post-grid/post-grid.data-provider";
import LikedPostGrid from "../../components/post-grid/liked-post-grid";
import UserCard from "../../components/users/user-card";
import FollowersUserList from "../../components/users/followers-user-list";
import FollowingUserList from "../../components/users/following-user-list";
import { useGetFollowersQuery, User } from "../../lib/generated/graphql-types";

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
    <AnimatedButton
      onClick={onClick}
      className="mx-2 whitespace-nowrap rounded-xl px-2 py-1 text-center md:mx-3"
    >
      <h4>{count}</h4>
      <h4 className="text-xs md:text-sm">{title}</h4>
    </AnimatedButton>
  );
};

type ModalContent =
  | "posts"
  | "followers"
  | "following"
  | "likedPosts"
  | "comments";

const getModalTitle = (content: ModalContent, userFirstName: string) => {
  switch (content) {
    case "posts":
      return `${capitalizeFirstLetter(userFirstName)}'s Posts`;
    case "followers":
      return `${capitalizeFirstLetter(userFirstName)}'s Followers`;
    case "following":
      return `${capitalizeFirstLetter(userFirstName)} Follows`;
    case "likedPosts":
      return `${capitalizeFirstLetter(userFirstName)}'s Liked Posts`;
    case "comments":
      return `${capitalizeFirstLetter(userFirstName)}'s Comments`;
  }
};

const UserPage = ({ user }: { user?: User }) => {
  const router = useRouter();

  // let's keep this dynamic as the current user can change the followers number
  const { data: followersData } = useGetFollowersQuery({
    variables: { username: user?.username },
  });

  // ---- modal open state
  const [modalOpen, setModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState<ModalContent>();

  const renderModalContent = (content: ModalContent) => {
    switch (content) {
      case "posts":
        return (
          <PostGridDataProvider limit={6} published={true} authorId={user.id} />
        );
      case "followers":
        return <FollowersUserList username={user.username} />;
      case "following":
        return <FollowingUserList username={user.username} />;
      case "likedPosts":
        return (
          <LikedPostGrid limit={6} published={true} likedByUserId={user.id} />
        );
      case "comments":
        return "comments";
    }
  };

  if (!user) return <h1 className="mt-44 text-center">User doesn't exist</h1>;

  return (
    <>
      {router.isFallback ? (
        <div className="flex h-full flex-col justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {/* Modal */}
          <AnimatePresence exitBeforeEnter>
            {modalOpen && (
              <Modal
                title={getModalTitle(modalContent, user.firstName)}
                setModalOpen={setModalOpen}
              >
                {renderModalContent(modalContent)}
              </Modal>
            )}
          </AnimatePresence>
          {/* User Card */}
          <UserCard linked={false} editable user={user} />
          {/* Profile stats */}
          <div className="mt-10 flex justify-center overflow-auto md:overflow-hidden">
            <ProfileStat
              onClick={() => {
                setModalContent("posts");
                setModalOpen(true);
              }}
              title="Posts"
              count={user.posts?.length}
            />
            <ProfileStat
              onClick={() => {
                setModalContent("followers");
                setModalOpen(true);
              }}
              title="Followers"
              count={
                followersData?.user.followers.length || user.followers.length
              }
            />
            <ProfileStat
              onClick={() => {
                setModalContent("following");
                setModalOpen(true);
              }}
              title="Following"
              count={user._count.following}
            />
            <ProfileStat
              onClick={() => {
                setModalContent("likedPosts");
                setModalOpen(true);
              }}
              title="Liked Posts"
              count={user._count.likedPosts}
            />
            {/* <ProfileStat
              onClick={() => {
                setModalContent("comments");
                setModalOpen(true);
              }}
              title="Comments"
              count={user._count.comments}
            /> */}
          </div>
          {/* Post list */}
          <hr className="my-10" />
          <ProfilePostList limit={3} published authorId={user.id} />
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

  const user = userResponse.data.user;

  return addApolloState(apolloClient, {
    props: {
      user,
    },
  });
};
