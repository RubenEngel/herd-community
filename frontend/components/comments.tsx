import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
} from "../lib/gql-queries";
import { authHeaders } from "../lib/supabase";
import { Comment, User } from "../lib/types";
import AnimatedButton from "./animated-button";
import Avatar from "./avatar";
import { SignInContext, UserContext } from "./context/auth-provider";
import Date from "./date";
import Loading from "./loading";

const CommentComponent = ({
  commentId,
  user,
  content,
  date,
  handleDeleteComment,
  deleteCommentLoading,
}: {
  commentId: number;
  user: Pick<User, "id" | "username" | "firstName" | "lastName" | "imageUrl">;
  content: string;
  date: string | Date;
  handleDeleteComment: (commentId) => void;
  deleteCommentLoading: boolean;
}) => {
  const { userData } = useContext(UserContext);

  return (
    <>
      <div className="p-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Avatar user={user} />
          {user.id === userData?.id && (
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
        <div className="text-xs">
          <Date date={date} short />
        </div>
      </div>
      <hr />
    </>
  );
};

const Comments = ({ postId }: { postId: number }) => {
  const { userAuth } = useContext(UserContext);
  const setShowSignIn = useContext(SignInContext);

  const [comments, setComments] = useState<
    Pick<Comment, "author" | "content" | "createdAt" | "id">[]
  >([]);

  const [content, setContent] = useState("");

  // GET COMMENTS
  const {
    data: commentsData,
    loading: commentsLoading,
    // error: commentsError,
  } = useQuery(GET_COMMENTS, {
    variables: {
      postId: postId,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!commentsData) return;
    console.log(commentsData);
    setComments(commentsData.comments);
  }, [commentsData]);

  // CREATE COMMENTS
  const [createComment, { loading: createCommentLoading }] = useMutation(
    CREATE_COMMENT,
    { context: authHeaders() }
  );

  const handleSubmitComment = async () => {
    try {
      const res = await createComment({
        variables: { content: content, postId: postId },
      });
      console.log(res);
      const newComment: Pick<
        Comment,
        "author" | "content" | "createdAt" | "id"
      > = {
        id: res.data.createComment.id,
        author: res.data.createComment.author,
        content: res.data.createComment.content,
        createdAt: res.data.createComment.createdAt,
      };
      setComments([...comments, newComment]);
      setContent("");
      toast.success("Comment Posted", { position: "top-left" });
    } catch (error) {
      console.error(error);
      toast.error("Error", { position: "top-left" });
    }
  };

  // DELETE COMMENTS
  const [deleteComment, { loading: deleteCommentLoading }] = useMutation(
    DELETE_COMMENT,
    { context: authHeaders() }
  );

  const handleDeleteComment = async (commentId: number) => {
    try {
      const res = await deleteComment({
        variables: { deleteCommentId: commentId },
      });
      console.log(res.data.deleteComment);
      toast.success("Comment Deleted", { position: "top-left" });
      setComments([...comments.filter((comment) => comment.id !== commentId)]);
    } catch (error) {
      console.error(error);
      toast.error("Error", { position: "top-left" });
    }
  };

  return (
    <div className="relative h-modal-content">
      <div className="overflow-y-scroll h-full pb-20">
        {commentsLoading && <Loading />}
        {comments?.map((comment, index) => {
          const commentAuthor = comment.author;
          return (
            <CommentComponent
              key={comment.id + index}
              commentId={comment.id}
              user={{
                id: commentAuthor.id,
                username: commentAuthor.username,
                firstName: commentAuthor.firstName,
                lastName: commentAuthor.lastName,
                imageUrl: commentAuthor.imageUrl,
              }}
              content={comment.content}
              date={comment.createdAt}
              handleDeleteComment={handleDeleteComment}
              deleteCommentLoading={deleteCommentLoading}
            />
          );
        })}
      </div>
      <div
        className={`flex bg-secondary items-center absolute bottom-0 left-0 w-full py-4 pl-2 ${
          !userAuth && "opacity-30"
        }`}
      >
        {userAuth ? (
          <>
            <input
              type="text"
              className="rounded-full border-primary border-2 w-full px-4 py-1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <AnimatedButton
              disabled={!content || createCommentLoading}
              onClick={() => handleSubmitComment()}
              className="p-3"
            >
              <BiCommentDetail className="text-3xl" />
            </AnimatedButton>
          </>
        ) : (
          <AnimatedButton
            onClick={() => setShowSignIn(true)}
            className="mx-auto"
          >
            <h4>Login to Comment</h4>
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default Comments;
