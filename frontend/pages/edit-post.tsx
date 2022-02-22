import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import SubmitIntro from "../components/submit-intro";
import { CHANGE_SUBMITTED } from "../lib/graphql/queries-and-mutations";
import { useMutation } from "@apollo/client";
import formatString from "../lib/format-string";
import formatSlug from "../lib/format-slug";
import PostBody from "../components/post-content/post-body";
import PostHeader from "../components/post-content/post-header";
import {
  CREATE_DRAFT,
  UPDATE_POST,
  CHANGE_PUBLISHED,
} from "../lib/graphql/queries-and-mutations";
import Tags from "../components/post-content/tags";
import { useRouter } from "next/router";
import { Post } from "../lib/generated/graphql-types";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "../components/animated-button";
import { AuthContext } from "../components/context/auth-provider";
import { authHeaders } from "../lib/supabase";
import InputBox, { InputBoxVariant } from "../components/input-box";
import { useApolloToast } from "../lib/hooks/use-apollo-toast";
import HeadingBar from "../components/heading-bar";
import {
  useGetCategoriesQuery,
  useGetPostQuery,
} from "../lib/generated/graphql-types";

// TODO: Check if user admin again

const Editor = dynamic(() => import("../components/ck-editor"), {
  ssr: false,
});

const SubmitHeading = ({ children }) => <h2 className="mb-2">{children}</h2>;

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
  const { data: existingPostData } = useGetPostQuery({
    variables: {
      slug: router.query?.slug as string,
    },
  });

  // Context
  const { userData } = useContext(AuthContext);
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
    if (userData?.id && userData.id === existingPostData?.post?.author?.id) {
      setIsEditable(true);
    } else if (String(userData?.role) === "ADMIN") {
      setIsEditable(true);
    }
  }, [userData]);

  // If existing post data is not loaded into initial state, update state data when data comes in
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
  }, [existingPostData]);

  // ---------- New draft create
  const [
    createDraft,
    {
      data: createDraftData,
      error: createDraftError,
      loading: createDraftLoading,
    },
  ] = useMutation(CREATE_DRAFT, {
    context: authHeaders(),
  });

  useApolloToast(createDraftData, createDraftLoading, createDraftError);

  const handleCreateDraft = () => {
    createDraft({
      variables: {
        ...postData,
        slug: formatSlug(postData.title),
      },
    });
  };

  useEffect(() => {
    if (createDraftData) {
      const slug = createDraftData?.createDraft?.slug;
      localStorage.setItem("postData", JSON.stringify(emptyPostData));
      router.push({ pathname: "/edit-post", query: `slug=${slug}` });
    }
  }, [createDraftData]);

  // ----------- Post editing
  const [editPost, { data: editData, error: editError, loading: editLoading }] =
    useMutation(UPDATE_POST, {
      context: authHeaders(),
    });

  useApolloToast(editData, editLoading, editError);

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

  useApolloToast(publishedData, publishedLoading, publishedError);

  const handleChangePublished = (status: boolean) => {
    changePublished({
      variables: {
        id: Number(editPostId),
        published: status,
      },
    });
  };

  // Handle change of submitted status
  const [
    changeSubmitted,
    { data: submittedData, loading: submittedLoading, error: submittedError },
  ] = useMutation(CHANGE_SUBMITTED, {
    context: authHeaders(),
  });

  useApolloToast(submittedData, submittedLoading, submittedError);

  const handleSubmit = () => {
    if (existingPostData) {
      changeSubmitted({
        variables: {
          id: Number(editPostId),
          submitted: true,
        },
      });
    } else {
      createDraft({
        variables: {
          ...postData,
          slug: formatSlug(postData.title),
          submitted: true,
        },
      });
    }
  };

  const handleUnsubmit = () => {
    changeSubmitted({
      variables: {
        id: Number(editPostId),
        submitted: false,
      },
    });
  };

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
  const { data: categoryData } = useGetCategoriesQuery();

  let allCategories: string[];

  if (categoryData) {
    allCategories = categoryData.categories?.map((category) => category.name);
  }

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
      <HeadingBar>Post Editor</HeadingBar>
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
                  onClick={() =>
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
              className="mb-8 w-full"
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
              {/* Preview */}
              <AnimatedButton
                disabled={!isEditable}
                variant="primary-outline"
                className="mx-2 my-2"
                onClick={() => setShowPreview(!showPreview)}
              >
                <h4>{showPreview ? "Hide preview" : "Show preview"}</h4>
              </AnimatedButton>
              {existingPostData ? (
                <AnimatedButton
                  disabled={!dataComplete || !isEditable}
                  variant="green-outline"
                  className="mx-2 my-2"
                  onClick={() => handleEdit()}
                >
                  <h4>Save Edits</h4>
                </AnimatedButton>
              ) : (
                <AnimatedButton
                  disabled={!dataComplete}
                  variant="green-outline"
                  className="mx-2 my-2"
                  onClick={() => handleCreateDraft()}
                >
                  <h4>Save Draft</h4>
                </AnimatedButton>
              )}
              {!existingPostData?.post.published &&
                (!existingPostData?.post.submitted ? (
                  <AnimatedButton
                    disabled={!dataComplete}
                    variant="green"
                    className="mx-2 my-2"
                    onClick={() => handleSubmit()}
                  >
                    <h4>Submit</h4>
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    disabled={!dataComplete}
                    variant="red"
                    className="mx-2 my-2"
                    onClick={() => handleUnsubmit()}
                  >
                    <h4>Unsubmit</h4>
                  </AnimatedButton>
                ))}
              {String(userData?.role) === "ADMIN" &&
              existingPostData?.post?.published ? (
                <AnimatedButton
                  variant="red"
                  className="mx-2 my-2"
                  onClick={() => handleChangePublished(false)}
                >
                  <h4>Unpublish</h4>
                </AnimatedButton>
              ) : (
                <AnimatedButton
                  disabled={!dataComplete}
                  variant="green"
                  className="mx-2 my-2"
                  onClick={() => {
                    handleChangePublished(true);
                  }}
                >
                  <h4>Publish</h4>
                </AnimatedButton>
              )}
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
