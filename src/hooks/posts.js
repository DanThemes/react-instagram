import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
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
import { useAuthContext } from "../context/AuthProvider";

export const usePosts = (uid, showOnlyPostsOfUsersFollowed) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuthContext();

  if (!auth) {
    return { posts, isLoading: false };
  }

  const usersFollowed = [...auth.user.following, auth.user.uid];

  // if (showOnlyPostsOfUsersFollowed == true) {
  //   return { posts, isLoading: false };
  // }

  useEffect(() => {
    let q;

    if (uid) {
      q = query(collection(db, "posts"), where("uid", "==", uid));
    } else if (showOnlyPostsOfUsersFollowed) {
      q = query(collection(db, "posts"), where("uid", "in", usersFollowed));
    } else {
      q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Order posts based on the 'createdAt' field
      // Firebase doesn't allow to use the 'orderBy' function
      // in the 'showOnlyPostsOfUsersFollowed' query
      const orderedPostsArray = postsArray.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      setPosts(orderedPostsArray);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [auth, showOnlyPostsOfUsersFollowed]);

  return { posts, isLoading };
};

export const useNewPost = async (data, user) => {
  const { photo, text } = data;
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
      text,
      createdAt: Date.now(),
    });
    toast.success("Post added");
  } catch (error) {
    toast.error(error.message);
  }
};

export const useDeletePost = async (uid, pid) => {
  try {
    const postRef = doc(db, "posts", pid);
    const post = await getDoc(postRef);

    const photoRef = ref(storage, post.data().photo);
    const postUid = post.data().uid;

    if (postUid !== uid) {
      toast.error("You're not allowed to delete this post");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    await deleteDoc(postRef);
    await deleteObject(photoRef);

    toast.success("Post deleted");
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const useEditPost = async (uid, post) => {
  try {
    if (post.uid !== uid) {
      toast.error("You're not allowed to edit this post");
      return;
    }

    const postRef = doc(db, "posts", post.id);

    await updateDoc(postRef, post);
    toast.success("Post updated");
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};
