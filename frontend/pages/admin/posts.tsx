import React, { useContext } from "react";
import { AuthContext } from "../../components/context/auth-provider";
import HeadingBar from "../../components/heading-bar";
import PostGridDataProvider from "../../components/post-grid/post-grid.data-provider";
import { Role } from "../../lib/generated/graphql-types";

function AdminPosts() {
  const { userData } = useContext(AuthContext);

  if (userData.role !== Role.Admin) {
    return (
      <>
        <h1>This page is for admins only</h1>
      </>
    );
  }

  return (
    <>
      <HeadingBar>Submitted Posts</HeadingBar>
      <PostGridDataProvider
        published={false}
        submitted={true}
        startLoad
        category={"all"}
        limit={6}
      />
    </>
  );
}

export default AdminPosts;
