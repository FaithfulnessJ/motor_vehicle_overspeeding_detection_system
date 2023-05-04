import React from "react";
import Page403 from "../../pages/Page403";
import { useUserStore } from "../zustand/Store";

const AdminCheck = ({ children }: { children: JSX.Element }): JSX.Element => {
  const user = useUserStore((state: any) => state.user);

  return user?.email === "kigene7@gmail.com" ||
    user?.email === "test@example.com" ||
    user?.email === "faithfulnessj1@gmail.com" ? (
    <>{children}</>
  ) : (
    <Page403 />
  );
};

export default AdminCheck;
