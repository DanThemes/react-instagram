import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const useNewComment = async (data) => {
  try {
    await addDoc(collection(db, "comments"), {
      ...data,
      createdAt: Date.now(),
    });
    toast.success("Comment added");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const useComments = (pid) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
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
    });

    return unsubscribe;
  }, [pid]);

  return comments;
};
