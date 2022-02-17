import { useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { GET_POSTS } from "../../lib/gql-queries";
import Loading from "../loading";
import PostGrid from "./post-grid";

const SearchPostGrid = ({
  searchTerm,
  searchAttempted,
}: {
  searchTerm: string;
  searchAttempted: boolean;
}) => {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      published: true,
      limit: 6,
      startAfter: null,
      searchTerm: searchTerm,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    skip: !searchTerm,
  });

  const posts = useMemo(() => data?.posts?.posts, [data]);

  return (
    <>
      {!data && loading && (
        <div className="h-50-screen flex flex-col items-center justify-center text-2xl">
          <Loading />
        </div>
      )}
      {!posts && !loading && searchAttempted && !error && (
        <h2 className="text-center">No Search Results</h2>
      )}
      {error && <h2 className="text-center">Search Error</h2>}
      {data && posts && (
        <>
          <small className="ml-4 mb-4">{data.posts._count} results</small>
          <PostGrid
            error={error}
            loading={loading}
            posts={posts}
            startLoad={true}
            totalPostCount={data?.posts?._count}
            animateY="50%"
            onWaypointEnter={() =>
              fetchMore({
                variables: {
                  startAfter: posts[posts?.length - 1].id,
                },
              })
            }
          />
        </>
      )}
    </>
  );
};

export default SearchPostGrid;
