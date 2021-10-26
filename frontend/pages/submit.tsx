import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import SubmitIntro from "../components/submit-intro";
import { GET_CATEGORIES } from "../lib/apolloQueries";
import { useQuery, useMutation } from "@apollo/client";
import formatString from "../lib/formatString";
import formatSlug from "../lib/formatSlug";
import toast from "react-hot-toast";
import PostBody from "../components/post-content/post-body";
import Container from "../components/container";
import PostHeader from "../components/post-content/post-header";
import { ADD_POST } from "../lib/apolloQueries";
import { UserContext } from "../lib/context";
import Tags from "../components/post-content/tags";

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
  featuredImage: string;
  categories: string[];
  tags: string[];
}

const Submit = () => {
  // Context
  const user = useContext(UserContext);
  // State
  const [ready, setReady] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tag, setTag] = useState<string>("");
  const [dataComplete, setDataComplete] = useState(false);
  const [postData, setPostData] = useState<SubmitPostData>(() => {
    if (typeof window !== "undefined" && localStorage.getItem("postData")) {
      return JSON.parse(localStorage.getItem("postData"));
    } else {
      return {
        title: "",
        content: "",
        featuredImage: "",
        categories: [],
        tags: [],
      };
    }
  });

  // GraphQL
  const { data: categoryData } = useQuery(GET_CATEGORIES);

  let allCategories: string[];

  const [
    submitPost,
    { data: mutationData, error: mutationError, loading: mutationLoading },
  ] = useMutation(ADD_POST);

  const handleSubmit = () => {
    console.log(postData);
    submitPost({
      variables: {
        ...postData,
        slug: formatSlug(postData.title),
        authorEmail: user.email,
      },
    });
  };

  useEffect(() => {
    if (mutationError) {
      toast.error("Error sending post", { position: "bottom-right" });
    }
    if (mutationData)
      toast.success("Post sent succesfully", { position: "bottom-right" });
  }, [mutationLoading]);

  useEffect(() => {
    localStorage.setItem("postData", JSON.stringify(postData));
    if (
      postData.title &&
      postData.featuredImage &&
      postData.content &&
      postData.categories.length > 0
    ) {
      setDataComplete(true);
    } else {
      setDataComplete(false);
    }
  }, [postData]);

  if (categoryData) {
    allCategories = categoryData.getCategories.map((category) =>
      formatString(category.name, "_")
    );
  }

  // Add /remove categories
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

  // Main component
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
                setPostData({
                  ...postData,
                  tags: [...postData.tags, formatString(tag, " ")],
                });
                setTag("");
              }}
            >
              Add tag
            </button>
          </div>
          {/* Image */}
          <SubmitHeading>Featured Image URL</SubmitHeading>
          <InputBox
            value={postData.featuredImage}
            onChange={(e) =>
              setPostData({ ...postData, featuredImage: e.target.value })
            }
            type="url"
          />
          {postData.featuredImage && (
            <img
              className="mb-10 mx-auto"
              height={300}
              width={300}
              src={postData.featuredImage}
              // onError={(e) => {
              //   e.target.src =
              //     "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640";
              // }}
            />
          )}
          <SubmitHeading>Main Content</SubmitHeading>
          <div className="mb-6">
            <Editor postData={postData} setPostData={setPostData} />
          </div>

          <div className="flex flex-row mb-6 mx-auto">
            {/* Preview */}
            <button
              className="bg-blue-400 hover:bg-blue-600 text-xl mx-2 text-white py-3 px-8 rounded-xl"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Hide preview" : "Show preview"}
            </button>
            <button
              onClick={() => {
                handleSubmit();
                // notify("Post submitted", "📬 ")
                // console.log(user.email)
              }}
              disabled={!dataComplete}
              className={`disabled:bg-gray-400 disabled:opacity-50  bg-green-400 ${dataComplete && 'hover:bg-green-600'} text-xl mx-2 text-white py-2 px-6 rounded-xl`}
            >
              Submit Article 
              <p className="text-xs">{!dataComplete && '(Incomplete fields)'}</p>
            </button>
          </div>

          {showPreview && (
            <>
              {/* -------- Preview --------- */}
              <PostHeader
                title={postData.title}
                coverImage={postData.featuredImage}
              />
              {postData.tags.length > 0 && <Tags tags={postData.tags} />}
              <Container>
                <PostBody content={postData.content} />
              </Container>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Submit;
