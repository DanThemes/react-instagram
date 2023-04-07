import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

export const useNewComment = async (data) => {
  try {
    console.log("useNewComment");
    console.log(data);
    await addDoc(
      collection(db, "comments", {
        ...data,
        createdAt: Date.now(),
      })
    );
    toast.success("Comment added");
  } catch (error) {
    toast.error(error.message);
  }
};
