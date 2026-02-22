import { Navigate} from "react-router-dom";

export default function PublicRoutes({ children }) {
  const isAuthenticated = localStorage.getItem("userToken");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}