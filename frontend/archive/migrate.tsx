import React from "react";
import { firestore } from "../lib/firebase";
// import { gql, useMutation } from "@apollo/client";
import { postsObject } from "../postData/postsObject";

const postSlugs = Object.keys(postsObject);

const imagesObj: { [postSlug: string]: string } = {};

const getImages = () =>
  postSlugs.forEach((slug) => {
    imagesObj[slug] = postsObject[slug].featuredImage;
  });

console.dir(imagesObj);

const Migrate = () => {
  return (
    <div>
      <button onClick={() => getImages()}>Get Images</button>
    </div>
  );
};

export default Migrate;
