import React from "react";
import { useForm } from "react-hook-form";
import Avatar from "../Avatar";
import { useAuthContext } from "../../context/AuthProvider";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextareaAutosize from "react-textarea-autosize";
import { useNewComment } from "../../hooks/comments";
import Loading from "../Loading";

const newCommentSchema = yup.object().shape({
  comment: yup.string().required("Required"),
});

const NewComment = ({ uid, pid }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newCommentSchema),
  });

  const {
    auth: { user, isLoading, error },
  } = useAuthContext();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return error.message;
  }

  const handleNewComment = async () => {
    const data = { ...getValues(), uid, pid };
    await useNewComment(data);
    reset();
  };

  const handleTextareaPress = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      handleNewComment();
    }
  };

  return (
    <div className="post-new-comment">
      <Avatar user={user} size="small" showUsername={false} />
      <form onSubmit={handleSubmit(handleNewComment)} className="comment-form">
        <TextareaAutosize
          maxRows="5"
          minRows="1"
          {...register("comment")}
          placeholder="Add a comment"
          onKeyDown={handleTextareaPress}
        />
        {errors.comment && (
          <div className="form-error-message">{errors.comment.message}</div>
        )}
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default NewComment;
