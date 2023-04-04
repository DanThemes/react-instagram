import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";

export const useUser = (id) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const docRef = query(collection(db, "users"), where("uid", "==", id));
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
  }, [id]);

  return { user, isLoading, error };
};
