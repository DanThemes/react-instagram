import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { db } from "../firebase/firebase";

const profileSchema = yup.object().shape({
  bio: yup.string().required("Required"),
});

const Profile = () => {
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
      <h1>Profile</h1>
      Bio: {user.bio}
      <hr />
      {console.log(user)}
      <form onSubmit={handleSubmit(handleUpdateProfile)} className="form-auth">
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

export default Profile;
