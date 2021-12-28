import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Loading from "../../components/loading";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter";
import {
  // GET_USER_BY_EMAIL,
  GET_USER_BY_USERNAME,
} from "../../lib/apolloQueries";
import { User } from "../../lib/types";
import { FaUserCircle } from "react-icons/fa";

interface UserPageProps {
  user: Omit<User, "email">;
}

const UserPage = ({ user }: UserPageProps) => {
  const router = useRouter();

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
          <div className="text-8xl mx-auto flex justify-center my-6">
            {user.imageUrl ? (
              <img className="w-32 h-32 rounded-full" src={user.imageUrl}></img>
            ) : (
              <FaUserCircle />
            )}
          </div>
          <h4>@{user.username}</h4>
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
