import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { CREATE_COMMENT, GET_COMMENTS_FOR_POST } from "../../lib/gql-queries";
import { authHeaders } from "../../lib/supabase";
import AnimatedButton from "../animated-button";
import { AuthContext } from "../context/auth-provider";
import Loading from "../loading";
import Comment from "./comment";
import { Comment as IComment, PrismaUser } from "../../lib/types";
import { AiFillCloseCircle } from "react-icons/ai";
import { useApolloToast } from "../../lib/hooks/use-apollo-toast";

const Comments = ({ postId }: { postId: number }) => {
  const { userAuth, setShowSignIn } = useContext(AuthContext);

  const [comments, setComments] = useState<IComment[]>([]);

  const [content, setContent] = useState("");

  // GET COMMENTS
  const {
    data: commentsData,
    loading: commentsLoading,
    // error: commentsError,
    refetch: refetchComments,
  } = useQuery(GET_COMMENTS_FOR_POST, {
    variables: {
      postId: postId,
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData.comments);
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
  ] = useMutation(CREATE_COMMENT, { context: authHeaders() });

  useApolloToast(createCommentData, createCommentLoading, createCommentError);

  const [replyingTo, setReplyingTo] = useState<{
    commentId: number;
    author: Pick<
      PrismaUser,
      "id" | "username" | "firstName" | "lastName" | "imageUrl"
    >;
  } | null>(null);

  const handleSubmitComment = async () => {
    try {
      const res = await createComment({
        variables: {
          content: content,
          postId: postId,
          parentCommentId: replyingTo?.commentId,
        },
      });
      // const newComment: CommentType = res.data.createComment;
      // setComments([...comments, newComment]);
      if (res.data) refetchComments();
      setContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = React.useCallback(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const handleReplyTo = ({
    author,
    commentId,
  }: {
    author: Pick<
      PrismaUser,
      "id" | "username" | "firstName" | "lastName" | "imageUrl"
    >;
    commentId: number;
  }) => {
    setReplyingTo({ author, commentId });
    focusInput();
  };

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-scroll pb-32">
        {commentsLoading && (
          <div className="flex h-full flex-col justify-center">
            <Loading />
          </div>
        )}
        {comments?.map((comment, index) => {
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
                setComments={setComments}
                refetchComments={refetchComments}
              />
            </div>
          );
        })}
      </div>
      <div
        className={` absolute bottom-0 left-0 w-full items-center bg-white pt-4 pb-10 pl-2`}
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
          <div className="flex">
            <input
              ref={inputRef}
              type="text"
              className="w-full rounded-xl border px-4 py-2 shadow-inner"
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
            className="mx-auto mb-6"
          >
            <h2>Login to Comment</h2>
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default Comments;
