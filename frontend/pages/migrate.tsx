import { useMutation } from "@apollo/client";
import React from "react";
import { firestore } from "../lib/firebase";
// import { gql, useMutation } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient";
import { postsObject } from "../postData/postsObject";
import { UPDATE_POST } from "../lib/apolloQueries";

const postSlugs = Object.keys(postsObject);

const imagesObj: { [postSlug: string]: string } = {};

const getImages = () => {
  postSlugs.forEach((slug) => {
    imagesObj[slug] = postsObject[slug].featuredImage;
  });
  console.dir(imagesObj);
};

const Migrate = () => {
  const [updatePost, { data }] = useMutation(UPDATE_POST);

  const startMutation = () => {
    Object.keys(imagesObj).forEach((slug) => {
      updatePost({ variables: { slug: slug, featuredImage: imagesObj[slug] } });
      console.log(data);
    });
  };

  return (
    <div>
      <button onClick={() => getImages()}>Get Images</button>
      <button onClick={() => startMutation()}>Start Mutation</button>
    </div>
  );
};

export default Migrate;
