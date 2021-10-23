import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SubmitIntro from "../components/submit-intro";
import { GET_CATEGORIES } from "../lib/apolloQueries";
import { useQuery } from "@apollo/client";
import formatString from "../lib/formatString";
import formatSlug from "../lib/formatSlug";
import CoverImage from '../components/post-content/cover-image';

const Editor = dynamic(() => import("../components/ck-editor"), {
  ssr: false,
  
});

const SubmitHeading = ({ children }) => <h2 className="mb-2">{children}</h2>;

const InputBox = (props) => (
  <input {...props} className="border-2 border-gray-300 mb-8" />
);

export interface SubmitPostData {
  title: string;
  content: string;
  imageUrl: string;
  categories: string[];
  tags: string[];
}

const Submit = () => {
  const [ready, setReady] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tag, setTag] = useState<string>("");
  const [postData, setPostData] = useState<SubmitPostData>(() => {
    if (typeof window !== "undefined" && localStorage.getItem("postData")) {
      return JSON.parse(localStorage.getItem("postData"));
    } else {
      return {
        title: "",
        content: "",
        imageUrl: "",
        categories: [],
        tags: [],
      };
    }
  });

  

  useEffect(() => {
    localStorage.setItem("postData", JSON.stringify(postData));
    console.log(formatSlug(postData.title))
  }, [postData]);

  const { data } = useQuery(GET_CATEGORIES);

  let allCategories: string[];

  if (data)
    allCategories = data.getCategories.map((cat) => formatString(cat.name, "_"));

  const CategorySelect = ({ categoryName }: { categoryName: string }) => {
    const handleChange = () => {
      if (postData.categories.includes(categoryName)) {
        setPostData({
          ...postData,
          categories: postData.categories.filter(
            (catName) => catName !== categoryName
          ),
        });
      } else {
        setPostData({
          ...postData,
          categories: [...postData.categories, categoryName],
        });
      }
    };
    return (
      <button
        className={`px-2 mr-2 mb-3 text-md rounded-full ${
          postData.categories.includes(categoryName)
            ? "bg-green-400 text-white"
            : "bg-gray-400 text-gray-600"
        } `}
        onClick={handleChange}
      >
        {categoryName}
      </button>
    );
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <h1 className="text-3xl text-center text-bold">Submit an Article</h1>
      {ready ? (
        <SubmitIntro setReady={setReady} />
      ) : (
        <div className="flex flex-col">
          {/* Title */}
          <SubmitHeading>Title</SubmitHeading>
          <InputBox
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            type="string"
          />
          {/* Categories */}
          <SubmitHeading>Select Categories</SubmitHeading>
          <div className="flex mb-6 flex-wrap">
            {allCategories?.map((categoryName) => (
              <CategorySelect categoryName={categoryName} />
            ))}
          </div>
          {/* Tags */}
          <SubmitHeading>Tags</SubmitHeading>
          {/*  Current Tags */}
          <div className="flex flex-row flex-wrap">
            {postData.tags?.map((tagName) => (
            <button
              id={tagName}
              onClick={(e) =>
                setPostData({
                  ...postData,
                  tags: postData.tags.filter((tag) => tag !== tagName),
                })
              }
              className="cursor-pointer px-2 mr-2 mb-3 text-md rounded-full  text-white bg-green-400 hover:bg-red-500 hover:text-gray-100"
            >
              {tagName}
            </button>
          ))}
          </div>
          {/* Add Tags */}
          <div className="flex flex-row items-center mb-8 mt-3">
            <input
            type="string"
            className="border-2 border-gray-300"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            className="ml-2 px-2 text-gray-100 bg-gray-400 rounded-lg"
            onClick={() => {
              setPostData({ ...postData, tags: [...postData.tags, formatString(tag, " ")] });
              setTag("");
            }}
          >
            Add tag
          </button>
          </div>
          {/* Image */}
          <SubmitHeading>Featured Image URL</SubmitHeading>
          <InputBox
            value={postData.imageUrl}
            onChange={(e) =>
              setPostData({ ...postData, imageUrl: e.target.value })
            }
            type="url"
          />
          {postData.imageUrl && (
            <img
              className="mb-10 mx-auto"
              height={300}
              width={300}
              src={postData.imageUrl}
              onError={(e) => {
                e.target.src =
                  "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640";
              }}
            />
          )}
          <SubmitHeading>Main Content</SubmitHeading>
          <div className="mb-10">
            <Editor postData={postData} setPostData={setPostData} />
          </div>
          <button onClick={() => console.log(postData)} className="bg-green-400 text-xl mx-auto text-white py-3 px-8 rounded-xl">Submit Article</button>
            {/* Preview */}
            <h3
              className="hover:text-green-400 cursor-pointer"
              onClick={() => setShowPreview(!showPreview)}
            >
              Click to show preview
            </h3>
            {showPreview && (
              <>
                <h1>{postData.title}</h1>
                <CoverImage title={postData.title} coverImage={postData.imageUrl}/>
                <div
                  className={"ck-content"}
                  dangerouslySetInnerHTML={{ __html: postData.content }}
                ></div>
              </>
            )}
          
        </div>
      )}
    </div>
  );
};

export default Submit;
