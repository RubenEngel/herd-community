import React from "react";
import PostGrid from "../../components/post-grid/post-grid";

function Admin() {
  return (
    <>
      <div className="bg-primary text-secondary mb-6 rounded-xl p-1 text-center font-bold lg:mt-6 lg:p-2 lg:px-56">
        <h3 className="uppercase">Unpublished Posts</h3>
      </div>

      <PostGrid
        animate={false}
        published={false}
        startLoad
        category={"all"}
        limit={6}
      />
    </>
  );
}

export default Admin;
