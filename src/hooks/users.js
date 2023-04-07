import { collection, getDocs, query, where } from "firebase/firestore";
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
