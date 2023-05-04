import { Navigate } from "react-router-dom";
import { useUserStore } from "../zustand/Store";

const AuthCheck = ({ children }: { children: JSX.Element }): JSX.Element => {
  const user = useUserStore((state: any) => state.user);

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthCheck;
