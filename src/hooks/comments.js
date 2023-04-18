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
  console.log(data);
  return;

  // if it's a reply to a comment
  if ("cid" in data) {
    // const docRef = doc(db, "comments", data.pid);
    const docRef = doc(db, `comments/${data.pid}`);
    ref = collection(docRef, "replies");
  }
  // if it's a comment
  else {
    ref = collection(db, "comments");
  }

  try {
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

export const useComments = (pid = null, cid = null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    let q;

    // doesn't work well
    // allow only 1 nested level of comments
    // or allow the default 3 levels Firebase offers?
    // possible solution https://firebase.google.com/docs/firestore/query-data/queries#collection-group-query
    if (pid) {
      q = query(
        collection(db, "comments"),
        where("pid", "==", pid),
        orderBy("createdAt", "asc")
      );
    } else if (cid) {
      const commentRef = doc(db, "comments", cid);
      q = query(collection(commentRef, "replies"), orderBy("createdAt", "asc"));
    }

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

export const useToggleLikeComment = async (uid, comment) => {
  try {
    let q;

    // if it's a reply to a comment
    if ("cid" in comment) {
      q = query(
        collection(db, `comments/${comment.cid}/replies`),
        where(documentId(), "==", comment.id)
      );
    }
    // if it's a comment
    else {
      q = query(
        collection(db, "comments"),
        where(documentId(), "==", comment.id)
      );
    }
    const comments = await getDocs(q);
    const commentsData = comments.docs.map((c) => ({ ...c.data(), id: c.id }));
    console.log(commentsData, comment);
    const c = comments.docs[0];

    const commentRef = c.ref;
    let likes = c.data().likes;

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
