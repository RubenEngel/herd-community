import React, { useContext } from "react";
import { AuthContext } from "../components/context/auth-provider";
import HeadingBar from "../components/heading-bar";
import PostGridDataProvider from "../components/post-grid/post-grid.data-provider";

const Drafts = () => {
  const { userData } = useContext(AuthContext);

  if (!userData.id) {
    return <h1>No Profile Data</h1>;
  }

  return (
    <div>
      <HeadingBar>Drafts</HeadingBar>
      <PostGridDataProvider
        limit={6}
        authorId={userData.id}
        published={false}
      />
    </div>
  );
};

export default Drafts;
