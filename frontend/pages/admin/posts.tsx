import React, { useContext } from "react";
import { AuthContext } from "../../components/context/auth-provider";
import ExplorePostGrid from "../../components/post-grid/explore-post-grid";
import { Role } from "../../lib/types";

function Admin() {
  const { userData } = useContext(AuthContext);

  if (userData.role !== Role.ADMIN) {
    return (
      <>
        <h1>This page is for admins only</h1>
      </>
    );
  }

  return (
    <>
      <div className="bg-primary text-secondary mb-6 rounded-xl p-1 text-center font-bold lg:mt-6 lg:p-2 lg:px-56">
        <h3 className="uppercase">Unpublished Posts</h3>
      </div>

      <ExplorePostGrid published={false} startLoad category={"all"} limit={6} />
    </>
  );
}

export default Admin;
