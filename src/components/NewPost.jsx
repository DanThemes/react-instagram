import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { db, storage } from "../firebase/firebase";
import { useAuth } from "../hooks/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

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
    const { photo, description } = data;

    // Move this to a custom post hook
    try {
      // Upload photo to storage
      const storageRef = ref(storage, `photos/${Date.now()}_${photo[0].name}`);
      await uploadBytes(storageRef, photo);

      // Get download URL for photo
      const photoUrl = await getDownloadURL(storageRef);

      // Add post to db
      await addDoc(collection(db, "posts"), {
        uid: user.uid, // undefined here
        photo: photoUrl,
        description,
      });
      toast.success("Post added");
      reset();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
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

      <ToastContainer />
    </div>
  );
};

export default NewPost;
