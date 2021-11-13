import React from "react";
import PostList from "../components/post-list";
import { ExploreContext } from "../lib/context";

export default function Explore() {
  const { category } = React.useContext(ExploreContext);

  return <PostList published={true} startLoad={true} limit={5} category={category} />;
}
