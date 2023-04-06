import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const ProtectedPage = ({ children }) => {
  const {
    auth: { user, isLoading, error },
  } = useAuthContext();

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return error;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedPage;
