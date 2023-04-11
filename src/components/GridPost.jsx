import React, { useState } from "react";
import { useDeletePost } from "../hooks/posts";
import { useUser } from "../hooks/users";
import { formatDistance } from "date-fns";
import Avatar from "./Avatar";
import ListPost from "./ListPost";
import { useAuthContext } from "../context/AuthProvider";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const GridPost = ({ post }) => {
  const [show, setShow] = useState(false);
  const { user, isLoading, error } = useUser(post.uid);
  const { auth } = useAuthContext();
  const isAuthor = post.uid === auth?.user?.uid;

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return error.message;
  }

  return (
    <>
      <Popup
        trigger={
          <div className="post">
            <div
              className="post-image"
              onClick={() => setShow((prev) => !prev)}
            >
              <img src={post.photo} alt={post.description} />
            </div>
          </div>
        }
        position="right center"
        modal
      >
        <ListPost post={post} />
      </Popup>
    </>
  );
};

export default GridPost;
