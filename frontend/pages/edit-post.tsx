import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import SubmitIntro from "../components/submit-intro";
import { GET_CATEGORIES, GET_POST } from "../lib/gql-queries";
import { useQuery, useMutation } from "@apollo/client";
import formatString from "../lib/format-string";
import formatSlug from "../lib/format-slug";
import toast from "react-hot-toast";
import PostBody from "../components/post-content/post-body";
import PostHeader from "../components/post-content/post-header";
import { ADD_POST, UPDATE_POST, CHANGE_PUBLISHED } from "../lib/gql-queries";
import Tags from "../components/post-content/tags";
import { useRouter } from "next/router";
import { Post } from "../lib/types";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "../components/animated-button";
import { AuthContext } from "../components/context/auth-provider";
import { authHeaders } from "../lib/supabase";
import InputBox, { InputBoxVariant } from "../components/input-box";

// TODO: Check if user admin again

const Editor = dynamic(() => import("../components/ck-editor"), {
  ssr: false,
});

const SubmitHeading = ({ children }) => <h2 className="mb-2">{children}</h2>;

// const InputBox = (props) => (
//   <input {...props} className="mb-8 border-2 border-gray-300 p-2 text-lg" />
// );

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
  const { loading: existingPostDataLoading, data: existingPostData } = useQuery(
    GET_POST,
    {
      variables: {
        slug: router.query?.slug,
      },
    }
  );

  // Context
  const { userAuth, userData } = useContext(AuthContext);
  // State
  const [ready, setReady] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tag, setTag] = useState<string>("");
  const [dataComplete, setDataComplete] = useState(false);
  const [editPostId, setEditPostId] = useState<number | undefined>(
    existingPostData?.post?.id
  );

  const [postData, setPostData] = useState<SubmitPostData>(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("postData") &&
      !router.query.slug
    ) {
      return JSON.parse(localStorage.getItem("postData"));
    } else if (router.query.slug && existingPostData) {
      const dbPostData: Post = existingPostData.post;
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
    if (
      userData?.email &&
      userData.email === existingPostData?.post?.author?.email
    ) {
      setIsEditable(true);
    } else if (String(userData?.role) === "ADMIN") {
      setIsEditable(true);
    }
  }, [userData]);

  // If exisitng post data is not loaded into initial state, update state data when data comes in
  useEffect(() => {
    if (existingPostData) {
      const dbPostData: Post = existingPostData.post;
      setPostData({
        title: dbPostData.title,
        content: dbPostData.content,
        featuredImage: dbPostData.featuredImage,
        categories: dbPostData.categories?.map((category) => category.name),
        tags: dbPostData.tags,
      });
      setEditPostId(dbPostData.id);
    }
  }, [existingPostDataLoading]);

  // ---------- Post submission
  const [
    submitPost,
    { data: submitData, error: submitError, loading: submitLoading },
  ] = useMutation(ADD_POST, {
    context: authHeaders(),
  });

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
  const [editPost, { data: editData, error: editError, loading: editLoading }] =
    useMutation(UPDATE_POST, {
      context: authHeaders(),
    });

  const handleEdit = () => {
    editPost({
      variables: {
        ...postData,
        id: Number(editPostId),
        slug: formatSlug(postData.title),
      },
    });
  };

  // Handle change of publication status
  const [
    changePublished,
    { data: publishedData, loading: publishedLoading, error: publishedError },
  ] = useMutation(CHANGE_PUBLISHED, {
    context: authHeaders(),
  });

  const handleChangePublished = (status: boolean) => {
    changePublished({
      variables: {
        id: Number(editPostId),
        published: status,
      },
    });
  };

  // Handle notifications on submit mutation status
  useEffect(() => {
    if (editError || submitError || publishedError) {
      toast.error("Error");
    }
    if (editData || submitData || publishedData) {
      toast.success("Success");
      localStorage.setItem("postData", JSON.stringify(emptyPostData));
      router.push(`/posts/${formatSlug(postData.title)}`);
    }
  }, [editLoading, submitLoading, publishedLoading]);

  // Store progress in local storage
  useEffect(() => {
    if (!existingPostData)
      localStorage.setItem("postData", JSON.stringify(postData));
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

  if (categoryData)
    allCategories = categoryData.categories?.map((category) => category.name);

  // Add / remove categories component
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
      <AnimatedButton
        className={`mr-4 mb-3 rounded-full px-3 py-1 font-serif ${
          postData.categories?.includes(categoryName)
            ? "bg-green-500 text-white"
            : "bg-gray-300 bg-opacity-40 text-gray-600"
        } `}
        onClick={handleChange}
      >
        {formatString(categoryName, "_")}
      </AnimatedButton>
    );
  };

  // Main component
  return (
    <div className="mx-auto max-w-screen-sm">
      <div className="bg-primary text-secondary mx-auto mb-10 flex w-full items-center justify-center rounded-xl p-1 font-bold lg:p-2">
        <h1 className="text-bold text-center text-lg uppercase">Post Editor</h1>
      </div>
      <AnimatePresence
        onExitComplete={() => window.scrollTo(0, 0)}
        exitBeforeEnter
      >
        {!ready && !existingPostData ? (
          <motion.div key="intro" exit={{ opacity: 0 }}>
            <SubmitIntro setReady={setReady} />
          </motion.div>
        ) : (
          <motion.div
            key={"post-editor"}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="flex flex-col"
          >
            {/* Title */}
            <SubmitHeading>Title</SubmitHeading>
            <InputBox
              variant={InputBoxVariant.shadow}
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              type="string"
              className="mb-8 w-full"
            />
            {/* Categories */}
            <SubmitHeading>Select Categories</SubmitHeading>
            <div className="mb-6 flex flex-wrap">
              {allCategories?.map((categoryName, index) => (
                <CategorySelect
                  key={categoryName + index}
                  categoryName={categoryName}
                />
              ))}
            </div>
            {/* Tags */}
            <SubmitHeading>Tags</SubmitHeading>
            {/*  Current Tags */}
            <div className="flex flex-row flex-wrap">
              {postData.tags?.map((tagName, index) => (
                <AnimatedButton
                  key={tagName + index}
                  onClick={(e) =>
                    setPostData({
                      ...postData,
                      tags: postData.tags.filter((tag) => tag !== tagName),
                    })
                  }
                  className="mr-2 mb-3 cursor-pointer rounded-full bg-green-500 py-1 px-3 font-serif text-white hover:bg-red-500 hover:text-gray-100"
                >
                  {tagName}
                </AnimatedButton>
              ))}
            </div>
            {/* Add Tags */}
            <div className="mb-8 mt-3 flex flex-row items-center">
              <InputBox
                variant={InputBoxVariant.shadow}
                type="string"
                className="w-full"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <AnimatedButton
                variant="green-outline"
                className="ml-4 h-full text-sm uppercase"
                onClick={() => {
                  if (tag) {
                    setPostData({
                      ...postData,
                      tags: [...postData.tags, formatString(tag, " ")],
                    });
                    setTag("");
                  }
                }}
              >
                Add tag
              </AnimatedButton>
            </div>
            {/* Image */}
            <SubmitHeading>Featured Image URL</SubmitHeading>
            <InputBox
              variant={InputBoxVariant.shadow}
              value={postData.featuredImage}
              onChange={(e) =>
                setPostData({ ...postData, featuredImage: e.target.value })
              }
              type="url"
              className="mb-8"
            />
            {postData.featuredImage && (
              <img
                className="mx-auto mb-10"
                height={300}
                width={300}
                src={postData.featuredImage}
              />
            )}
            <SubmitHeading>Main Content</SubmitHeading>
            <div className="mb-6">
              <Editor postData={postData} setPostData={setPostData} />
            </div>
            {/* Mutation and preview buttons */}
            <div className="mx-auto mb-6 flex flex-row flex-wrap justify-center">
              {existingPostData?.post?.published && (
                <AnimatedButton
                  disabled={!isEditable}
                  variant="red-outline"
                  className="mx-2 my-2"
                  onClick={() => handleChangePublished(false)}
                >
                  <h4>Unpublish</h4>
                </AnimatedButton>
              )}
              {String(userData?.role) === "ADMIN" &&
                existingPostData?.post.published === false && (
                  <AnimatedButton
                    disabled={!isEditable}
                    variant="green-outline"
                    className="mx-2 my-2"
                    onClick={() => {
                      handleChangePublished(true);
                    }}
                  >
                    <h4>Publish</h4>
                  </AnimatedButton>
                )}
              {/* Preview */}
              <AnimatedButton
                disabled={!isEditable}
                variant="primary-outline"
                className="mx-2 my-2"
                onClick={() => setShowPreview(!showPreview)}
              >
                <h4>{showPreview ? "Hide preview" : "Show preview"}</h4>
              </AnimatedButton>
              {/* <AnimatedButton>
                <h4>Save</h4>
              </AnimatedButton> */}
              <AnimatedButton
                onClick={() => {
                  if (router.query.slug) {
                    handleEdit();
                  } else {
                    handleSubmit();
                  }
                }}
                disabled={!dataComplete || !isEditable}
                variant="green"
                className="mx-2 my-2"
              >
                <h4>
                  {router.query.slug ? "Submit Edits" : "Submit Post"}
                  <p className="text-xs uppercase">
                    {!dataComplete && "(Incomplete Fields)"}
                  </p>
                </h4>
              </AnimatedButton>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditPost;
