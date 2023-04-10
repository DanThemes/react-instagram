import React from "react";
import { useDeletePost, useEditPost } from "../hooks/posts";
import { useUser } from "../hooks/users";
import { formatDistance } from "date-fns";
import Avatar from "./Avatar";
import { useAuthContext } from "../context/AuthProvider";
import NewComment from "./comments/NewComment";
import Comments from "./comments/Comments";
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast } from "react-toastify";

const Post = ({ post }) => {
  const [isUpdatingPostText, setIsUpdatingPostText] = useState(false);
  const [updatedPostText, setUpdatedPostText] = useState(() => post.text);
  const { user, isLoading, error } = useUser(post.uid);
  const { auth } = useAuthContext();
  const isAuthor = post.uid === auth?.user?.uid;

  // console.log(post);
  const handleDelete = async () => {
    await useDeletePost(auth?.user?.uid, post.id);
  };

  const handleCancelUpdate = () => {
    setIsUpdatingPostText(false);
    setUpdatedPostText(post.text);
  };

  const handleEditButtonClick = () => {
    setIsUpdatingPostText(true);
    setUpdatedPostText(post.text);
  };

  const handleEdit = async () => {
    const newPost = { ...post, text: updatedPostText };
    try {
      await useEditPost(auth?.user?.uid, newPost);
      setIsUpdatingPostText(false);
    } catch (error) {
      console.log(error.message);
      toast.error("Couldn't update the post");
    }
  };

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return error.message;
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-left">
          <Avatar uid={post.uid} size="small" />
        </div>
        <div className="post-header-right">
          {isAuthor && (
            <>
              <EllipsisHorizontalIcon />
              <ul>
                <li onClick={handleEditButtonClick}>
                  <span>
                    <PencilIcon />
                    Edit
                  </span>
                </li>

                <li className="delete-button" onClick={handleDelete}>
                  <span>
                    <TrashIcon />
                    Delete
                  </span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="post-image">
        <img src={post.photo} alt={post.text} />
      </div>

      <div className="post-footer">
        <div className="post-content">
          <div className="post-text">
            <span className="post-author">
              <strong>{user.username}</strong>:
            </span>
            {isUpdatingPostText ? (
              <>
                {console.log(updatedPostText)}
                <textarea
                  value={updatedPostText}
                  onChange={(e) => setUpdatedPostText(e.target.value)}
                />
                <div className="post-update-buttons">
                  <button onClick={handleEdit}>Update post</button>
                  <button onClick={handleCancelUpdate}>Cancel</button>
                </div>
              </>
            ) : (
              post.text
            )}
          </div>
          <p className="post-date">
            {formatDistance(post.createdAt, Date.now())} ago
          </p>
        </div>

        {auth.user && <NewComment uid={auth?.user?.uid} pid={post.id} />}

        <Comments pid={post.id} />
      </div>
    </div>
  );
};

export default Post;
