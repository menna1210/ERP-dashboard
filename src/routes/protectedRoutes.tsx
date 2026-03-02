import { Navigate, Outlet} from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
export  function ProtectedRoute({ children }: Props) {
  const isAuthenticated = localStorage.getItem("userToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children ? <>{children}</> : <Outlet />;
}