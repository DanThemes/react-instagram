import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { db, storage } from "../firebase/firebase";
import { useAuth } from "../hooks/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import Posts from "./Posts";
import { useNewPost } from "../hooks/posts";

const newPostSchema = yup.object().shape({
  photo: yup
    .mixed()
    .test("required", "Required", (file) => {
      if (file.length > 0) {
        return true;
      }
      return false;
    })
    .test(
      "fileSize",
      "Only documents up to 2MB are permitted.",
      (files) =>
        !files || // Check if `files` is defined
        files.length === 0 || // Check if `files` is not an empty list
        Array.from(files).every((file) => file.size <= 2_000_000)
    ),
  description: yup.string().required("Required"),
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

  const { user } = useAuth();

  const handleNewPost = async (data) => {
    await useNewPost(data, user);
    reset();
  };

  return (
    <div className="new-post">
      <form onSubmit={handleSubmit(handleNewPost)} className="form-auth">
        <label htmlFor="photo">Upload photo:</label>
        <input type="file" {...register("photo")} />
        {errors.photo && (
          <div className="form-error-message">{errors.photo.message}</div>
        )}

        <label htmlFor="description">Description</label>
        <textarea cols="30" rows="3" {...register("description")}></textarea>
        {errors.description && (
          <div className="form-error-message">{errors.description.message}</div>
        )}

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default NewPost;
