import { useMutation } from "@apollo/client";
import React, { useContext, useMemo, useRef, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import {
  CREATE_COMMENT,
  GET_COMMENTS_FOR_POST,
} from "../../lib/graphql/queries-and-mutations";
import { authHeaders } from "../../lib/supabase";
import AnimatedButton from "../animated-button";
import { AuthContext } from "../context/auth-provider";
import Loading from "../loading";
import Comment from "./comment";
import { Comment as IComment, User } from "../../lib/generated/graphql-types";
import { AiFillCloseCircle } from "react-icons/ai";
import { useApolloToast } from "../../lib/hooks/use-apollo-toast";
import { useGetCommentsForPostQuery } from "../../lib/generated/graphql-types";

const Comments = ({ postId }: { postId: number }) => {
  const { userAuth, setShowSignIn, userData } = useContext(AuthContext);

  const [content, setContent] = useState("");

  // GET COMMENTS
  const {
    data: commentsData,
    loading: commentsLoading,
    error: commentsError,
  } = useGetCommentsForPostQuery({
    variables: {
      postId: postId,
    },
  });

  const commentsArr: IComment[] = useMemo<IComment[]>(() => {
    if (commentsData) {
      return commentsData.comments;
    }
  }, [commentsData]);

  // CREATE COMMENTS
  const [
    createComment,
    {
      data: createCommentData,
      loading: createCommentLoading,
      error: createCommentError,
    },
  ] = useMutation(CREATE_COMMENT, {
    refetchQueries: () => [
      {
        query: GET_COMMENTS_FOR_POST,
        variables: {
          postId: postId,
        },
      },
    ],
    context: authHeaders(),
  });

  useApolloToast(createCommentData, createCommentLoading, createCommentError, {
    success: "Posted",
    position: "top-center",
  });

  const [replyingTo, setReplyingTo] = useState<{
    commentId: number;
    author: Pick<
      User,
      "id" | "username" | "firstName" | "lastName" | "imageUrl"
    >;
  } | null>(null);

  const handleSubmitComment = async () => {
    try {
      await createComment({
        variables: {
          content: content,
          postId: postId,
          parentCommentId: replyingTo?.commentId,
        },
      });
      setContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = React.useCallback(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  const handleReplyTo = ({
    author,
    commentId,
  }: {
    author: Pick<
      User,
      "id" | "username" | "firstName" | "lastName" | "imageUrl"
    >;
    commentId: number;
  }) => {
    if (userData) {
      setReplyingTo({ author, commentId });
      focusInput();
    } else {
      setShowSignIn(true);
    }
  };

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-scroll pb-32">
        {commentsLoading && (
          <div className="flex h-full flex-col justify-center">
            <Loading />
          </div>
        )}
        {commentsError && (
          <div className="flex h-full flex-col items-center justify-center">
            <h3>Error loading comments</h3>
          </div>
        )}
        {commentsArr?.map((comment, index) => {
          const commentAuthor = comment.author;

          return (
            <div key={comment.id + index}>
              <Comment
                handleReplyTo={handleReplyTo}
                commentId={comment.id}
                childComments={comment.childComments}
                parentDepthIndex={null}
                author={{
                  id: commentAuthor.id,
                  username: commentAuthor.username,
                  firstName: commentAuthor.firstName,
                  lastName: commentAuthor.lastName,
                  imageUrl: commentAuthor.imageUrl,
                }}
                content={comment.content}
                date={comment.createdAt}
                postId={postId}
              />
            </div>
          );
        })}
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full items-center bg-white pt-2 pb-10 pl-2`}
      >
        {replyingTo && (
          <small className="mb-2 -mt-2 flex items-center">
            Replying to {replyingTo?.author.username}
            <AnimatedButton
              onClick={() => {
                setReplyingTo(null);
              }}
              hoverScale={1.1}
              tapScale={0.9}
              className="p-2"
            >
              <AiFillCloseCircle className="text-red-600" />
            </AnimatedButton>
          </small>
        )}
        {userAuth ? (
          <div className="flex h-12">
            <input
              ref={inputRef}
              type="text"
              className="w-full rounded-xl border px-4 shadow-inner"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key.toLowerCase() === "enter") {
                  handleSubmitComment();
                }
              }}
            />
            <AnimatedButton
              disabled={!content || createCommentLoading}
              onClick={() => handleSubmitComment()}
              className="p-3"
            >
              <BiCommentDetail className="text-4xl" />
            </AnimatedButton>
          </div>
        ) : (
          <AnimatedButton
            onClick={() => setShowSignIn(true)}
            className="mx-auto mb-6 w-full"
          >
            <h1 className="text-2xl">Login to Comment</h1>
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default Comments;
