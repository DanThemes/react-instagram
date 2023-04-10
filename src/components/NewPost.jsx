import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNewPost } from "../hooks/posts";
import { useAuthContext } from "../context/AuthProvider";
import TextareaAutosize from "react-textarea-autosize";

const newPostSchema = yup.object().shape({
  photo: yup
    .mixed()
    .nullable()
    .notRequired()
    .test("required", "Required", (file) => {
      if (file.length > 0) {
        return true;
      }
      return false;
    })
    .test(
      "fileSize",
      "Image must be 2MB or smaller.",
      (files) =>
        !files || // Check if `files` is defined
        files.length === 0 || // Check if `files` is not an empty list
        Array.from(files).every((file) => file.size <= 2_000_000)
    ),
  text: yup.string().required("Required"),
});

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(newPostSchema),
  });

  const {
    auth: { user },
  } = useAuthContext();

  const handleNewPost = async (data) => {
    await useNewPost(data, user);
    reset();
  };

  return (
    <div className="new-post">
      <form onSubmit={handleSubmit(handleNewPost)} className="auth-form">
        <label htmlFor="photo">Upload photo:</label>
        <input type="file" {...register("photo")} />
        {errors.photo && (
          <div className="form-error-message">{errors.photo.message}</div>
        )}

        <label htmlFor="text">Text</label>
        <TextareaAutosize
          maxRows="10"
          minRows="3"
          {...register("text")}
          placeholder="Add a post"
        />
        {errors.text && (
          <div className="form-error-message">{errors.text.message}</div>
        )}

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default NewPost;
