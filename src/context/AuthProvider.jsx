import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/users";

const initialState = {
  user: null,
  isLoading: true,
  error: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_USER":
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  // Set user on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const usersRef = await getDocs(q);
      const userRef = usersRef.docs[0].data();
      if (userRef) {
        const userData = usersRef.docs[0].data();
        dispatch({ type: "SET_USER", payload: userData });
      }
    });

    return unsubscribe;
  }, [auth]);

  // Register
  const createAccount = async (email, username, password) => {
    try {
      // Create the user
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add extra fields to the "users" collection
      const usersRef = collection(db, "users");
      const userData = {
        uid: user.uid,
        email,
        username,
        displayName: "",
        bio: "",
        avatar: "",
      };
      await addDoc(usersRef, userData);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
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
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update profile
  const updateProfile = async (data) => {
    try {
      const q = query(
        collection(db, "users"),
        where("uid", "==", state.user.uid)
      );
      const usersRef = await getDocs(q);
      const userRef = usersRef.docs[0].ref;

      // Remove empty fields
      Object.keys(data).forEach((key) => {
        if (data[key] === "" || data[key] == null) {
          delete data[key];
        }
      });
      const newProfileData = { ...state.user, ...data };

      await updateDoc(userRef, newProfileData);
      dispatch({ type: "SET_USER", payload: newProfileData });
      toast.success("Profile updated");
    } catch (error) {
      console.log(error);
    }
  };

  const stateObject = {
    auth: {
      user: state.user,
      isLoading: state.isLoading,
      error: state.error,
    },
    createAccount,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={stateObject}>{children}</AuthContext.Provider>
  );
};
