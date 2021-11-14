import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import SubmitIntro from "../components/submit-intro";
import { GET_CATEGORIES, GET_POST } from "../lib/apolloQueries";
import { useQuery, useMutation, gql } from "@apollo/client";
import formatString from "../lib/formatString";
import formatSlug from "../lib/formatSlug";
import toast from "react-hot-toast";
import PostBody from "../components/post-content/post-body";
import PostHeader from "../components/post-content/post-header";
import { ADD_POST, UPDATE_POST, CHANGE_PUBLISHED } from "../lib/apolloQueries";
import { UserContext } from "../lib/context";
import Tags from "../components/post-content/tags";
import { useRouter } from "next/router";
import { Post } from "../lib/types";
import { v4 as uuid } from 'uuid';

// TODO: Check if user admin again

const Editor = dynamic(() => import("../components/ck-editor"), {
  ssr: false,
});

const SubmitHeading = ({ children }) => <h2 className="mb-2">{children}</h2>;

const InputBox = (props) => (
  <input {...props} className="border-2 border-gray-300 mb-8 p-2 tex-lg" />
);

export interface SubmitPostData {
  title: string;
  content: string;
  featuredImage: string;
  categories: string[];
  tags: string[];
}

const emptyPostData = {
  title: "",
  content: "",
  featuredImage: "",
  categories: [],
  tags: [],
};

const EditPost = () => {
  const router = useRouter();

  // Get exisitng post data to edit
  const { loading: existingPostDataLoading, data: existingPostData } = useQuery(GET_POST, {
    variables: {
      slug: router.query?.slug,
    },
  });

  // Context
  const { userAuth, userData } = useContext(UserContext);
  // State
  const [ready, setReady] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tag, setTag] = useState<string>("");
  const [dataComplete, setDataComplete] = useState(false);
  const [editPostId, setEditPostId] = useState<string | undefined>(existingPostData?.getPost?.id)

  const [postData, setPostData] = useState<SubmitPostData>(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("postData") &&
      !router.query.slug
    ) {
      return JSON.parse(localStorage.getItem("postData"));
    } else if (router.query.slug && existingPostData) {
      const dbPostData: Post = existingPostData.getPost;
      return {
        title: dbPostData.title,
        content: dbPostData.content,
        featuredImage: dbPostData.featuredImage,
        categories: dbPostData.categories?.map((category) => category.name),
        tags: dbPostData.tags,
      };
    } else {
      return emptyPostData;
    }
  });

    const [isEditable, setIsEditable] = useState(false);
    useEffect(() => {
      if (userData?.email && (userData.email === existingPostData?.getPost?.author?.email)) {
        setIsEditable(true);
      } else if (String(userData?.role) === "ADMIN") {
        setIsEditable(true);
      }
    }, [userData]);


  // If exisitng post data is not loaded into initial state, update state data when data comes in
  useEffect(() => {
    if (existingPostData) {
      const dbPostData: Post = existingPostData.getPost;
      setPostData({
        title: dbPostData.title,
        content: dbPostData.content,
        featuredImage: dbPostData.featuredImage,
        categories: dbPostData.categories?.map((category) => category.name),
        tags: dbPostData.tags,
      });
      setEditPostId(dbPostData.id)
    }
  }, [existingPostDataLoading]);

  // ---------- Post submission
  const [
    submitPost,
    { data: submitData, error: submitError, loading: submitLoading },
  ] = useMutation(ADD_POST);

  // When submit is pressed, use mutation
  const handleSubmit = () => {
    submitPost({
      variables: {
        ...postData,
        slug: formatSlug(postData.title),
        authorEmail: userAuth.email,
      },
    });
  };

  // ----------- Post editing
  const [
    editPost,
    { data: editData, error: editError, loading: editLoading },
  ] = useMutation(UPDATE_POST);

  const handleEdit = () => {
    editPost({
      variables: {
        ...postData,
        id: Number(editPostId),
        slug: formatSlug(postData.title)
      }
    })
  }

  // Handle change of publication status
  const [changePublished, {data: publishedData, loading: publishedLoading, error: publishedError }] = useMutation(CHANGE_PUBLISHED)

  const handleChangePublished = (status: boolean) => {
    changePublished({
      variables: {
        id: Number(editPostId),
        published: status
      }
    })
  }

  // Handle notifications on submit mutation status
  useEffect(() => {
    if (editError || submitError || publishedError) {
      toast.error("Error", { position: "bottom-right" });
    }
    if (editData || submitData || publishedData) {
      toast.success("Success", { position: "bottom-right" });
      localStorage.setItem("postData", JSON.stringify(emptyPostData));
      router.push("/");
    }
  }, [editLoading, submitLoading, publishedLoading]);
 

  // Store progress in local storage
  useEffect(() => {
    if (!existingPostData) localStorage.setItem("postData", JSON.stringify(postData));
    if (
      postData.title &&
      postData.featuredImage &&
      postData.content &&
      postData.categories?.length > 0
    ) {
      setDataComplete(true);
    } else {
      setDataComplete(false);
    }
  }, [postData]);

  // Get all categories that exist
  const { data: categoryData } = useQuery(GET_CATEGORIES);

  let allCategories: string[];

  if (categoryData) allCategories = categoryData.getCategories?.map((category) =>
    category.name
  );

  // Add / remove categories component
  const CategorySelect = ({ categoryName }: { categoryName: string }) => {
    const handleChange = () => {
      if (postData.categories.includes((categoryName))) {
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
        className={`px-3 py-1 mr-4 mb-3 text-md rounded-full uppercase ${
          postData.categories?.includes(categoryName)
            ? "bg-green-500 text-white"
            : "bg-gray-400 text-gray-600"
        } `}
        onClick={handleChange}
      >
        {formatString(categoryName, "_")}
      </button>
    );
  };

  // Main component
  return (
    <div className="max-w-screen-sm mx-auto">
      <h1 className="text-3xl text-center mb-6 text-bold uppercase">Post Editor</h1>
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
              <CategorySelect key={uuid()} categoryName={categoryName} />
            ))}
          </div>
          {/* Tags */}
          <SubmitHeading>Tags</SubmitHeading>
          {/*  Current Tags */}
          <div className="flex flex-row flex-wrap">
            {postData.tags?.map((tagName) => (
              <button
                key={uuid()}
                id={tagName}
                onClick={(e) =>
                  setPostData({
                    ...postData,
                    tags: postData.tags.filter((tag) => tag !== tagName),
                  })
                }
                className="cursor-pointer px-2 py-1 px-3 mr-2 mb-3 text-md rounded-full text-white bg-green-500 hover:bg-red-500 hover:text-gray-100"
              >
                {tagName}
              </button>
            ))}
          </div>
          {/* Add Tags */}
          <div className="flex flex-row items-center mb-8 mt-3">
            <input
              type="string"
              className="border-2 border-gray-300 p-1 text-lg"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button
              className="ml-2 px-3 py-1 text-white bg-green-500 rounded-lg uppercase text-sm"
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
            />
          )}
          <SubmitHeading>Main Content</SubmitHeading>
          <div className="mb-6">
            <Editor postData={postData} setPostData={setPostData} />
          </div>

          <div className="flex flex-row mb-6 mx-auto">
            {existingPostData?.getPost?.published && (
                <button
                  disabled={!isEditable}
                  className={"bg-blue-500 hover:bg-blue-600 text-md py-1 px-4 mx-2 text-white rounded-xl uppercase"}
                  onClick={() => handleChangePublished(false)}>
                  <h4>Unpublish</h4>
                </button>
            )}
            {
              String(userData?.role) === "ADMIN" && existingPostData?.getPost.published === false && (
                <button
                  disabled={!isEditable}
                  className={"bg-blue-500 hover:bg-blue-600 text-md py-1 px-4 mx-2 text-white rounded-xl uppercase"}
                  onClick={() => {
                    handleChangePublished(true);
                    
                  }}>
                  <h4>Publish</h4>
                </button>
              )
            }
            {/* Preview */}
            <button
              disabled={!isEditable}
              className="bg-blue-500 hover:bg-blue-600 text-md px-4 mx-2 text-white rounded-xl uppercase"
              onClick={() => setShowPreview(!showPreview)}
            >
              <h4>{showPreview ? "Hide preview" : "Show preview"}</h4>
            </button>
            <button
              onClick={() => {
                if (router.query.slug) {
                  handleEdit()
                } else {
                  handleSubmit();
                }
              }}
              disabled={!dataComplete || !isEditable}
              className={`disabled:bg-gray-400 disabled:opacity-50 bg-green-500 ${
                dataComplete && "hover:bg-green-700"
              } text-md py-1 px-4 mx-2 text-white  rounded-xl uppercase`}
            >
              <h4>
              {router.query.slug ? "Submit Edits" : "Submit Post"}
              <p className="text-xs">
                {!dataComplete && "(Incomplete fields)"}
              </p>
              </h4>
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
              <PostBody content={postData.content} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EditPost;
