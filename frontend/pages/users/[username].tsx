import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../../components/loading";
import { addApolloState, initializeApollo } from "../../lib/apollo-client";
import capitalizeFirstLetter from "../../lib/capitalize-first-letter";
import { GET_USER_BY_USERNAME } from "../../lib/gql-queries";
import { PrismaUser } from "../../lib/types";
import AnimatedButton from "../../components/animated-button";
import ProfilePostList from "../../components/profile-post-list";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/modal";
import PostGrid from "../../components/post-grid";
import LikedPostGrid from "../../components/liked-post-grid";
import UserCard from "../../components/user-card";
import UserGrid from "../../components/user-grid";

interface UserPageProps {
  user?: Omit<PrismaUser, "email"> & {
    followers: PrismaUser[];
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
    <AnimatedButton
      onClick={onClick}
      className="mx-2 px-2 py-1 text-center rounded-xl whitespace-nowrap"
    >
      <h4 className="">{title}</h4>
      <h4>{count}</h4>
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

const UserPage = ({ user }: UserPageProps) => {
  const router = useRouter();

  const [followedBy, setFollowedBy] = useState<{ id: number }[]>(
    user?.followers
  );

  // ---- modal open state
  const [modalOpen, setModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState<ModalContent>();

  const renderModalContent = (content: ModalContent) => {
    switch (content) {
      case "posts":
        return (
          <PostGrid
            animate={false}
            limit={6}
            published={true}
            authorId={user.id}
          />
        );
      case "followers":
        return <UserGrid type={"followers"} user={user} />;
      case "following":
        return <UserGrid type={"following"} user={user} />;
      case "likedPosts":
        return (
          <LikedPostGrid limit={6} published={true} likedByUserId={user.id} />
        );
      case "comments":
        return "comments";
    }
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
              <Modal
                title={getModalTitle(modalContent, user.firstName)}
                setModalOpen={setModalOpen}
              >
                {renderModalContent(modalContent)}
              </Modal>
            )}
          </AnimatePresence>

          {/* User Card */}
          <UserCard
            linked={false}
            editable
            user={user}
            setFollowedBy={setFollowedBy}
          />
          {/* Profile stats */}
          <div className="flex mt-10 md:justify-center overflow-auto md:overflow-hidden">
            <ProfileStat
              onClick={() => {
                setModalContent("posts");
                setModalOpen(true);
              }}
              title="Posts"
              count={user._count.posts}
            />
            <ProfileStat
              onClick={() => {
                setModalContent("followers");
                setModalOpen(true);
              }}
              title="Followers"
              count={followedBy.length}
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
