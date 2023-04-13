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
  writeBatch,
  onSnapshot,
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
        // !!!!!!!!!!!!!!!!
        // set up a onSnapshot listener here instead
        onSnapshot(docRef, (docSnapshot) => {
          setUser(docSnapshot.docs[0].data());
        });
        // const docSnapshot = await getDocs(docRef);
        // if (docSnapshot.docs.length === 1) {
        //   setUser(docSnapshot.docs[0].data());
        // } else {
        //   setError("User not found");
        // }
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

// Get a list of users
export const useUsers = (uids) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uids) return;

    // Get user data from "users" collection
    const getUsers = async () => {
      try {
        const docRef = query(collection(db, "users"), where("uid", "in", uids));
        const docSnapshot = await getDocs(docRef);

        const usersList = docSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log({ usersList });

        setUsers(usersList);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [uids]);

  return { users, isLoading, error };
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
        // const querySnapshot = await getDocs(q);
        onSnapshot(q, (querySnapshot) => {
          const resultData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(resultData);
        });
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
    const followerQuery = query(
      collection(db, "users"),
      where("uid", "==", followerUid)
    );
    const followerQueryResult = await getDocs(followerQuery);
    const followerUser = followerQueryResult.docs[0].data();
    const followerUserRef = followerQueryResult.docs[0].ref;

    const followedQuery = query(
      collection(db, "users"),
      where("uid", "==", followedUid)
    );
    const followedQueryResult = await getDocs(followedQuery);
    const followedUser = followedQueryResult.docs[0].data();
    const followedUserRef = followedQueryResult.docs[0].ref;

    // Batch update
    try {
      // Update the followers list of the followed person
      const followers = [...followedUser.followers, followerUid];

      // Update the following list of the following person
      const following = [...followerUser.following, followedUid];

      // Get a new write batch
      const batch = writeBatch(db);

      // Replace the bellow placeholder code with the correct code

      // Update docs
      batch.update(followerUserRef, {
        following,
      });
      batch.update(followedUserRef, {
        followers,
      });

      // Commit the batch
      await batch.commit();
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const useUnfollowUser = async (followerUid, followedUid) => {
  try {
    const followerQuery = query(
      collection(db, "users"),
      where("uid", "==", followerUid)
    );
    const followerQueryResult = await getDocs(followerQuery);
    const followerUser = followerQueryResult.docs[0].data();
    const followerUserRef = followerQueryResult.docs[0].ref;

    const followedQuery = query(
      collection(db, "users"),
      where("uid", "==", followedUid)
    );
    const followedQueryResult = await getDocs(followedQuery);
    const followedUser = followedQueryResult.docs[0].data();
    const followedUserRef = followedQueryResult.docs[0].ref;

    // Batch update
    try {
      // Update the followers list of the followed person
      const followers = followedUser.followers.filter(
        (uid) => uid !== followerUid
      );

      // Update the following list of the following person
      const following = followerUser.following.filter(
        (uid) => uid !== followedUid
      );

      // Get a new write batch
      const batch = writeBatch(db);

      // Replace the bellow placeholder code with the correct code

      // Update docs
      batch.update(followerUserRef, {
        following,
      });
      batch.update(followedUserRef, {
        followers,
      });

      // Commit the batch
      await batch.commit();
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};
