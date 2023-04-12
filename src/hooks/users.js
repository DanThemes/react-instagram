import {
  collection,
  getDocs,
  query,
  where,
  and,
  or,
  updateDoc,
  doc,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";

export const useUser = (idOrUsername) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idOrUsername) return;

    // Usernames can only be 25 characters long
    let field;
    if (idOrUsername.length > 25) {
      field = "uid";
    } else {
      field = "username";
    }

    // Get user data from "users" collection
    const getUser = async () => {
      try {
        const docRef = query(
          collection(db, "users"),
          where(field, "==", idOrUsername)
        );
        const docSnapshot = await getDocs(docRef);
        if (docSnapshot.docs.length === 1) {
          setUser(docSnapshot.docs[0].data());
        } else {
          setError("User not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [idOrUsername]);

  return { user, isLoading, error };
};

export const useSearchUsers = (keyword) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      setIsLoading(true);

      try {
        if (!keyword) return;

        const q = query(
          collection(db, "users"),
          or(
            // query as-is:
            and(
              where("username", ">=", keyword),
              where("username", "<=", keyword + "\uf8ff")
            ),
            // capitalize first letter:
            and(
              where(
                "username",
                ">=",
                keyword.charAt(0).toUpperCase() + keyword.slice(1)
              ),
              where(
                "username",
                "<=",
                keyword.charAt(0).toUpperCase() + keyword.slice(1) + "\uf8ff"
              )
            ),
            // lowercase:
            and(
              where("username", ">=", keyword.toLowerCase()),
              where("username", "<=", keyword.toLowerCase() + "\uf8ff")
            )
          )
        );
        const querySnapshot = await getDocs(q);
        const resultData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(resultData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    searchUsers();
  }, [keyword]);

  return { users, isLoading };
};

export const useFollowUser = async (followerUid, followedUid) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", followedUid));
    const results = await getDocs(q);
    const followedUser = results.docs[0].data();
    const followedUserRef = results.docs[0].ref;

    const followers = [...followedUser.followers, followerUid];

    await updateDoc(followedUserRef, {
      followers,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const useUnfollowUser = async (followerUid, followedUid) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", followedUid));
    const results = await getDocs(q);
    const followedUser = results.docs[0].data();
    const followedUserRef = results.docs[0].ref;

    const followers = followedUser
      .data()
      .followers.filter((uid) => uid !== followerUid);

    await updateDoc(followedUserRef, {
      followers,
    });

    // Get a new write batch
    const batch = writeBatch(db);

    // Replace the bellow placeholder code with the correct code

    // Update docs
    const sfRef = doc(db, "cities", "SF");
    batch.update(sfRef, { population: 1000000 });

    // Commit the batch
    await batch.commit();
  } catch (error) {
    console.log(error.message);
  }
};
