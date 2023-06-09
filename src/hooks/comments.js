import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const useNewComment = async (data) => {
  let ref;
  // console.log(data);
  // return;

  try {
    ref = collection(db, "comments");
    await addDoc(ref, {
      ...data,
      likes: [],
      createdAt: Date.now(),
    });
    toast.success("Comment added");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const useComments = (pid) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const q = query(
      collection(db, "comments"),
      where("pid", "==", pid),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsArray);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [pid]);

  return { comments, isLoading };
};

export const useDeleteComment = async (uid, id) => {
  try {
    const commentRef = doc(db, "comments", id);
    const comment = await getDoc(commentRef);

    if (comment.data().uid !== uid) {
      toast.error("You're not allowed to delete this post");
      return;
    }
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    await deleteDoc(commentRef);
    toast.success("Comment deleted");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const useToggleLikeComment = async (uid, id) => {
  try {
    const commentRef = doc(db, "comments", id);
    const comment = await getDoc(commentRef);
    let likes = comment.data().likes;

    if (likes.includes(uid)) {
      // If the comment is liked, remove the like
      likes = likes.filter((like) => like !== uid);
    } else {
      // Otherwise, add the like
      likes.push(uid);
    }

    // Update the comment
    await updateDoc(commentRef, {
      likes,
    });
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};
