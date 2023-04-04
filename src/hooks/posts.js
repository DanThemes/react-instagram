import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const usePosts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    });

    return unsubscribe;
  }, []);

  return posts;
};

export const useNewPost = async (data, user) => {
  const { photo, description } = data;
  const storageRef = ref(storage, `photos/${Date.now()}_${photo[0].name}`);

  try {
    // Upload photo to storage
    await uploadBytes(storageRef, photo[0]);

    // Get download URL for photo
    const photoUrl = await getDownloadURL(storageRef);

    // Add post to db
    await addDoc(collection(db, "posts"), {
      uid: user.uid, // undefined here
      photo: photoUrl,
      description,
      createdAt: Date.now(),
    });
    toast.success("Post added");
  } catch (error) {
    toast.error(error.message);
  }
};

export const useDeletePost = async (post) => {
  try {
    const postRef = doc(db, "posts", post.id);
    await deleteDoc(postRef);

    const photoRef = ref(storage, post.photo);
    await deleteObject(photoRef);

    toast.success("Post deleted");
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};
