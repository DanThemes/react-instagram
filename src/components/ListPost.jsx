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
import { useEffect } from "react";
import { useRef } from "react";

const Post = ({ post }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isUpdatingPostText, setIsUpdatingPostText] = useState(false);
  const [updatedPostText, setUpdatedPostText] = useState(() => post.text);
  const { user, isLoading, error } = useUser(post.uid);
  const { auth } = useAuthContext();
  const isAuthor = post.uid === auth?.user?.uid;
  const postMenu = useRef();

  useEffect(() => {
    const closeMenuOnClickOutside = (e) => {
      if (
        postMenu.current &&
        toggleMenu &&
        !postMenu.current.contains(e.target)
      ) {
        // console.log(toggleMenu);
        // console.log(postMenu.current);
        // console.log(e.target);
        handleCloseMenuOnClickOutside();
      }
    };

    document.addEventListener("click", closeMenuOnClickOutside);

    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [postMenu, toggleMenu]);

  const handleCloseMenuOnClickOutside = () => {
    setToggleMenu(false);
  };

  const handleDelete = async () => {
    await useDeletePost(auth?.user?.uid, post.id);
    setToggleMenu(false);
  };

  const handleCancelUpdate = () => {
    setIsUpdatingPostText(false);
    setUpdatedPostText(post.text);
  };

  const handleEditButtonClick = () => {
    setIsUpdatingPostText(true);
    setToggleMenu(false);
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
          <Avatar user={user} size="small" />
        </div>
        <div className="post-header-right">
          {isAuthor && (
            <div
              className="post-menu"
              ref={postMenu}
              // doesn't work well
              // instead call a different function
              // which handles the toggling,
              // now every click inside this element will
              // set the menu to true, so it will not close
              // on child element click
              // onClick={e => handleOpenMenu(e)}
            >
              <EllipsisHorizontalIcon
                onClick={() => setToggleMenu((prev) => !prev)}
              />
              <ul className={toggleMenu ? "visible" : ""}>
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
            </div>
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
