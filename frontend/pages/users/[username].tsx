import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/loading";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter";
import {
  // GET_USER_BY_EMAIL,
  GET_USER_BY_USERNAME,
} from "../../lib/apolloQueries";
import { User } from "../../lib/types";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../lib/context";
import UploadProfileImage from "../../components/upload-profile-image";

interface UserPageProps {
  user: Omit<User, "email">;
}

const UserPage = ({ user }: UserPageProps) => {
  const router = useRouter();

  const { userData } = useContext(UserContext);

  const [ownProfile, setOwnProfile] = useState(false);

  const [profileImage, setProfileImage] = useState(user.imageUrl);

  const cancelUpload = () => {
    setProfileImage(user.imageUrl);
  };

  useEffect(() => {
    if (userData.username === user.username) {
      setOwnProfile(true);
    }
  }, [userData]);

  return (
    <>
      {router.isFallback ? (
        <div className="h-full flex flex-col justify-center">
          <Loading />
        </div>
      ) : (
        <div className="text-center">
          {/* <div className="bg-primary -z-10 w-full -mb-16 text-right text-secondary flex flex-col justify-end p-2 rounded-lg"></div> */}
          <h1>
            {user.lastName
              ? `${capitalizeFirstLetter(
                  user.firstName
                )} ${capitalizeFirstLetter(user.lastName)}`
              : `${capitalizeFirstLetter(user.firstName)}`}
          </h1>
          <h4>@{user.username}</h4>
          <div className="text-8xl mx-auto flex justify-center my-6">
            {profileImage ? (
              <img
                className="w-32 h-32 rounded-full object-cover"
                src={profileImage}
              ></img>
            ) : (
              <FaUserCircle />
            )}
          </div>

          {ownProfile && (
            <>
              <UploadProfileImage
                cancelUpload={cancelUpload}
                setProfileImage={setProfileImage}
              />
            </>
          )}
        </div>
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
