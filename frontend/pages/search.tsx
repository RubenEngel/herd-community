import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BsSearch } from "react-icons/bs";
import AnimatedButton from "../components/animated-button";
import Loading from "../components/loading";
import PostGrid from "../components/post-grid/post-grid";
import UserList from "../components/users/user-list";
import { GET_POSTS, SEARCH_USERS } from "../lib/gql-queries";
import { Post } from "../lib/types";

enum SearchFor {
  posts = "posts",
  users = "users",
}

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchFor, setSearchFor] = useState<SearchFor>(SearchFor.posts);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // --- USER SEARCH
  const [
    searchUsers,
    {
      data: userSearchData,
      loading: userSearchLoading,
      error: userSearchError,
    },
  ] = useLazyQuery(SEARCH_USERS);

  useEffect(() => {
    if (userSearchError) {
      toast.error(userSearchError.message);
    }
  }, [userSearchError]);

  // --- POST SEARCH
  const [
    searchPosts,
    {
      loading: postSearchLoading,
      error: postSearchError,
      data: postSearchData,
      fetchMore: fetchMorePosts,
    },
  ] = useLazyQuery(GET_POSTS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (postSearchError) {
      toast.error(postSearchError.message);
    }
  }, [postSearchError]);

  // --- HANDLE SEARCH
  const handleSearch = () => {
    if (inputValue.length < 3) {
      return toast("Search term too short");
    }
    setSearchAttempted(true);
    if (searchFor === SearchFor.users) {
      searchUsers({
        variables: {
          searchTerm: inputValue,
        },
      });
    } else if (searchFor === SearchFor.posts) {
      searchPosts({
        variables: {
          searchTerm: inputValue,
          published: true,
          limit: 6,
          startAfter: null,
        },
      });
    }
  };

  const handleChangeSearchFor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFor(e.target.value as SearchFor);
    setSearchAttempted(false);
  };

  const posts: Post[] | undefined = useMemo(
    () => postSearchData?.posts?.posts,
    [postSearchData]
  );

  const postCount: number | undefined = useMemo(
    () => postSearchData?.posts?._count,
    [postSearchData]
  );

  return (
    <div>
      <div className="mx-auto flex max-w-2xl items-center">
        <div className="z-10">
          <BsSearch className="ml-3 text-xl" />
        </div>
        <input
          type="text"
          className="-ml-9 mr-4 w-full rounded-lg border p-2 pl-11"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <AnimatedButton variant="primary-outline" onClick={handleSearch}>
          Search
        </AnimatedButton>
      </div>
      <div className="mb-8 mt-6  flex justify-center">
        <div className="mx-6">
          <input
            type="radio"
            id="searchPosts"
            name="searchFor"
            value={SearchFor.posts}
            onChange={handleChangeSearchFor}
            hidden
          />
          <label htmlFor="searchPosts" className="cursor-pointer">
            <h2
              className={`text-2xl md:text-3xl ${
                searchFor === SearchFor.posts ? "bold" : "opacity-50"
              }`}
            >
              Posts
            </h2>
          </label>
        </div>
        <div className="mx-6">
          <input
            type="radio"
            id="searchUsers"
            name="searchFor"
            value={SearchFor.users}
            onChange={handleChangeSearchFor}
            hidden
          />
          <label htmlFor="searchUsers" className="cursor-pointer">
            {" "}
            <h2
              className={`text-2xl md:text-3xl ${
                searchFor === SearchFor.users ? "bold" : "opacity-50"
              }`}
            >
              Users
            </h2>
          </label>
        </div>
      </div>
      {/* --- USER SEARCH RESULTS --- */}
      {searchFor === SearchFor.users && (
        <>
          {userSearchLoading && (
            <div className="h-50-screen flex flex-col items-center justify-center text-2xl">
              <Loading />
            </div>
          )}
          {userSearchError && <h2 className="text-center">Search Error</h2>}
          {userSearchData && (
            <>
              {userSearchData && searchFor === SearchFor.users && (
                <small className="ml-4 mb-4">
                  {userSearchData.searchUsers._count} results
                </small>
              )}
              <UserList users={userSearchData.searchUsers.users} />
            </>
          )}
        </>
      )}
      {/* --- POST SEARCH RESULTS --- */}
      {searchFor === SearchFor.posts && (
        <>
          {!postSearchData && postSearchLoading && (
            <div className="h-50-screen flex flex-col items-center justify-center text-2xl">
              <Loading />
            </div>
          )}
          {postSearchError && <h2 className="text-center">Search Error</h2>}
          {postSearchData && posts && (
            <>
              <small className="ml-4 mb-4">
                {postSearchData.posts._count} results
              </small>
              <PostGrid
                error={postSearchError}
                loading={postSearchLoading}
                posts={posts}
                startLoad={true}
                totalPostCount={postCount}
                animateY="50%"
                onWaypointEnter={() =>
                  fetchMorePosts({
                    variables: {
                      startAfter: posts[posts.length - 1].id,
                    },
                  })
                }
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
