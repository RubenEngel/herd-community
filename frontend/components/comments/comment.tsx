import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  COMMENT_LIKED_BY,
  DELETE_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from "../../lib/gql-queries";
import { authHeaders } from "../../lib/supabase";
import { PrismaUser, Role } from "../../lib/types";
import AnimatedButton from "../animated-button";
import Avatar from "../avatar";
import { AuthContext } from "../context/auth-provider";
import Date from "../date";
import { Comment as IComment } from "../../lib/types";
import toast from "react-hot-toast";
import { BiLike } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import { useApolloToast } from "../../lib/hooks/use-apollo-toast";

const Comment = ({
  commentId,
  author,
  content,
  date,
  setComments,
  childComments,
  parentDepthIndex,
  handleReplyTo,
  refetchComments,
}: {
  refetchComments: (
    variables?: Partial<{
      postId: number;
    }>
  ) => Promise<ApolloQueryResult<any>>;
  commentId: number;
  childComments: IComment[];
  author: Pick<
    PrismaUser,
    "id" | "username" | "firstName" | "lastName" | "imageUrl"
  >;
  // parentCommentId: number;
  parentDepthIndex: number | null;
  content: string;
  date: string | Date;
  setComments: React.Dispatch<
    React.SetStateAction<
      Pick<IComment, "id" | "content" | "author" | "createdAt">[]
    >
  >;
  handleReplyTo: ({
    author,
    commentId,
  }: {
    author: Pick<
      PrismaUser,
      "id" | "username" | "firstName" | "lastName" | "imageUrl"
    >;
    commentId: number;
  }) => void;
}) => {
  const { userData, setShowSignIn } = useContext(AuthContext);

  // ---> DELETE COMMENTS
  const [
    deleteComment,
    {
      data: deleteCommentData,
      loading: deleteCommentLoading,
      error: deleteCommentError,
    },
  ] = useMutation(DELETE_COMMENT, {
    context: authHeaders(),
    variables: {
      deleteCommentId: commentId,
    },
  });

  useApolloToast(deleteCommentData, deleteCommentLoading, deleteCommentError, {
    success: "Deleted",
    position: "top-center",
  });

  const handleDeleteComment = async (commentId: number) => {
    try {
      const res = await deleteComment();
      if (res.data) {
        refetchComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ---> COMMENT LIKES
  // queries
  const { data: likedByData } = useQuery(COMMENT_LIKED_BY, {
    variables: {
      id: commentId,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });
  const [hasLiked, setHasLiked] = useState(false);
  const likedBy = useMemo(() => likedByData?.commentLikedBy, [likedByData]);
  useEffect(() => {
    if (likedByData) {
      setHasLiked(
        likedByData?.commentLikedBy?.some((user) => user.id === userData?.id)
      );
    }
  }, [likedByData]);

  // mutations
  const [likeComment, { loading: likeCommentLoading }] = useMutation(
    LIKE_COMMENT,
    {
      variables: {
        likeCommentId: commentId,
      },
      refetchQueries: () => [
        {
          query: COMMENT_LIKED_BY,
          variables: {
            id: commentId,
          },
        },
      ],
      context: authHeaders(),
    }
  );
  const [unlikeComment, { loading: unlikeCommentLoading }] = useMutation(
    UNLIKE_COMMENT,
    {
      variables: {
        unlikeCommentId: commentId,
      },
      refetchQueries: () => [
        {
          query: COMMENT_LIKED_BY,
          variables: {
            id: commentId,
          },
        },
      ],
      context: authHeaders(),
    }
  );

  const handleLikePress = async () => {
    if (!userData) {
      setShowSignIn(true);
      return;
    }
    if (!hasLiked) {
      try {
        await likeComment();
      } catch (error) {
        toast.error("Error");
      }
    } else {
      try {
        await unlikeComment();
      } catch (error) {
        toast.error("Error");
      }
    }
  };

  const depthIndex = useMemo(
    () => (parentDepthIndex !== null ? parentDepthIndex + 1 : 0),
    [parentDepthIndex]
  );

  return (
    <div>
      <div className="pt-5 pb-3 pl-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Avatar user={author} />
          {(userData?.role === Role.ADMIN || author.id === userData?.id) && (
            <AnimatedButton
              disabled={deleteCommentLoading}
              onClick={() => handleDeleteComment(commentId)}
            >
              <AiOutlineDelete className="text-2xl text-red-800" />
            </AnimatedButton>
          )}
        </div>
        {/* Content */}
        <div className="my-4">
          <p>{content}</p>
        </div>
        {/* Footer */}
        <div className="flex w-full justify-between">
          <div className="text-xs">
            <Date date={date} short />
          </div>
          <div className="flex items-center">
            {depthIndex < 2 && (
              <AnimatedButton
                onClick={() =>
                  handleReplyTo({
                    author,
                    commentId,
                  })
                }
              >
                <BsReply className="mr-3 text-2xl" />
              </AnimatedButton>
            )}
            <AnimatedButton
              disabled={likeCommentLoading || unlikeCommentLoading}
              onClick={() => handleLikePress()}
              className={`flex items-center ${
                hasLiked ? "text-green-700" : ""
              }`}
            >
              <BiLike className="mr-1 text-xl" />
              {likedBy?.length > 0 && (
                <span className="font-serif text-sm">{likedBy.length}</span>
              )}
            </AnimatedButton>
          </div>
        </div>
        {childComments?.length > 0 &&
          childComments.map((comment, index) => {
            const commentAuthor = comment.author;
            if (!commentAuthor) return null;
            return (
              <div className="relative" key={comment.id + index}>
                <div className="absolute top-1 left-3 h-8 w-4 rounded-bl-xl border-l-2 border-b-2" />
                <div className="ml-8">
                  <Comment
                    refetchComments={refetchComments}
                    handleReplyTo={handleReplyTo}
                    parentDepthIndex={depthIndex}
                    commentId={comment.id}
                    childComments={comment.childComments}
                    author={{
                      id: commentAuthor.id,
                      username: commentAuthor.username,
                      firstName: commentAuthor.firstName,
                      lastName: commentAuthor.lastName,
                      imageUrl: commentAuthor.imageUrl,
                    }}
                    content={comment.content}
                    date={comment.createdAt}
                    setComments={setComments}
                  />
                </div>
              </div>
            );
          })}
      </div>
      {depthIndex === 0 && <hr />}
    </div>
  );
};

export default Comment;
