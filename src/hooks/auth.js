import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });

    return unsubscribe;
  }, []);

  const navigate = useNavigate();

  // Register
  const createAccount = async (email, username, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const usersRef = collection(db, "users");
      const userData = {
        uid: user.uid,
        email,
        username,
      };
      await addDoc(usersRef, userData);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Login
  const login = async (username, password) => {
    try {
      // Check if username exists
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const userSnapshot = await getDocs(q);
      userSnapshot.forEach((doc) => console.log(doc.data()));

      // If username doesn't exist, show an error notification
      if (userSnapshot.empty) {
        toast.error("User doesn't exist");
        return;
      }

      // Get the email address
      const email = userSnapshot.docs[0].data().email;

      // Try to login
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout
  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { user, createAccount, login, logout };
};
