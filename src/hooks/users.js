import { collection, getDocs, query, where, and, or } from "firebase/firestore";
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
  const [result, setResult] = useState([]);

  useEffect(() => {
    const searchUsers = async () => {
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
        setResult(resultData);
      } catch (error) {
        console.log(error.message);
      }
    };
    searchUsers();
  }, [keyword]);

  return result;
};
