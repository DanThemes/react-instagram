import { createContext, useContext, useEffect, useReducer } from "react";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_USER", payload: user });
    });

    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    navigate("/");
  }, [state.user]);

  console.log(state.auth);

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
      };
      await addDoc(usersRef, userData);

      dispatch({ type: "SET_USER", payload: user });
      toast.success("Account created successfully");
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
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      dispatch({ type: "SET_USER", payload: user });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout
  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      dispatch({ type: "SET_USER", payload: null });
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
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
  };

  return (
    <AuthContext.Provider value={stateObject}>{children}</AuthContext.Provider>
  );
};
