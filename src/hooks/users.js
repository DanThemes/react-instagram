import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const useUser = (auth, id) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth || !id) return;

    // Run on auth state change
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      // Get user data from "users" collection
      const getUser = async () => {
        try {
          const docRef = query(collection(db, "users"), where("uid", "==", id));
          const docSnapshot = await getDocs(docRef);
          if (docSnapshot.docs.length === 1) {
            setUser({ ...docSnapshot.docs[0].data(), ...userData });
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
    });

    return unsubscribe;
  }, [auth, id]);

  return { user, isLoading, error };
};
