import { Navigate} from "react-router-dom";
import { ReactNode } from "react";
interface PublicRoutesProps {
  children: ReactNode;
}
export  function PublicRoutes({ children }: PublicRoutesProps) {
  const isAuthenticated = localStorage.getItem("userToken");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}