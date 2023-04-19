import React from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthProvider";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

const profileSchema = yup.object().shape({
  avatar: yup
    .mixed()
    .test(
      "fileFormat",
      "Image type should be JPG or PNG",
      (files) =>
        !files.length ||
        Array.from(files).every(
          (file) => files.length && SUPPORTED_FORMATS.includes(file.type)
        )
    )
    .test(
      "fileSize",
      "File is too large",
      (files) =>
        !files.length ||
        Array.from(files).every(
          (file) => files.length && file.size <= 2_000_000
        )
    ),
  displayName: yup.string(),
  bio: yup.string(),
});

const ProfileUpdate = () => {
  const {
    auth: { user },
    updateProfile,
  } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const handleUpdateProfile = async (data) => {
    await updateProfile(data);
    reset();
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit(handleUpdateProfile)} className="auth-form">
        <label htmlFor="avatar">Avatar:</label>
        <input type="file" {...register("avatar")} />
        {errors.avatar && (
          <div className="form-error-message">{errors.avatar.message}</div>
        )}

        <label htmlFor="displayName">Display name:</label>
        <input
          type="text"
          {...register("displayName")}
          placeholder={user.displayName}
        />
        {errors.displayName && (
          <div className="form-error-message">{errors.displayName.message}</div>
        )}

        <label htmlFor="bio">Bio:</label>
        <input type="text" {...register("bio")} placeholder={user.bio} />
        {errors.bio && (
          <div className="form-error-message">{errors.bio.message}</div>
        )}

        <button type="submit">Update profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
