import { useMutation } from "@apollo/client";
import React, { useContext, useMemo, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  COMMENT_LIKED_BY,
  GET_COMMENTS_FOR_POST,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from "../../lib/graphql/queries-and-mutations";
import { authHeaders } from "../../lib/supabase";
import {
  User,
  Role,
  useDeleteCommentMutation,
  Comment as IComment,
} from "../../lib/generated/graphql-types";
import AnimatedButton from "../animated-button";
import Avatar from "../avatar";
import { AuthContext } from "../context/auth-provider";
import Date from "../date";
import toast from "react-hot-toast";
import { BiLike } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import { useApolloToast } from "../../lib/hooks/use-apollo-toast";
import { useCommentLikedByQuery } from "../../lib/generated/graphql-types";

const Comment = ({
  commentId,
  author,
  content,
  date,
  childComments,
  parentDepthIndex,
  handleReplyTo,
  postId,
}: {
  postId: number;
  commentId: number;
  childComments: IComment[];
  author: Pick<User, "id" | "username" | "firstName" | "lastName" | "imageUrl">;
  parentDepthIndex: number | null;
  content: string;
  date: string | Date;
  handleReplyTo: ({
    author,
    commentId,
  }: {
    author: Pick<
      User,
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
  ] = useDeleteCommentMutation({
    context: authHeaders(),
    variables: {
      deleteCommentId: commentId,
    },
    refetchQueries: () => [
      {
        query: GET_COMMENTS_FOR_POST,
        variables: {
          postId: postId,
        },
      },
    ],
  });

  useApolloToast(deleteCommentData, deleteCommentLoading, deleteCommentError, {
    success: "Deleted",
    position: "top-center",
  });

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment();
    } catch (error) {
      console.error(error);
    }
  };

  // ---> COMMENT LIKES
  // queries
  const { data: likedByData } = useCommentLikedByQuery({
    variables: {
      id: commentId,
    },
  });

  const [hasLiked, setHasLiked] = useState(false);

  const likedByArr = useMemo(() => {
    const likedByArr = likedByData?.commentLikedBy;
    if (likedByArr) {
      setHasLiked(likedByArr.some((user) => user.id === userData?.id));
    }
    return likedByArr;
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
          <Avatar user={author} showUsername />
          {(userData?.role === Role.Admin || author.id === userData?.id) && (
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
              {likedByArr?.length > 0 && (
                <span className="font-serif text-sm">{likedByArr.length}</span>
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
                    postId={postId}
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
                    // setComments={setComments}
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
