import { Box } from "@chakra-ui/react";
import { useState, useLayoutEffect, ReactNode } from "react";
import SideNav from "./general/SideNav";
import TopNav from "./general/TopNav";
import { useScreenListener } from "../hooks/useScreenListener";

type AdminLayoutProps = {
  children: ReactNode;
};
const AdminLayout = ({ children }: AdminLayoutProps): JSX.Element => {
  const [showSideBar, setShowSideBar] = useState(true);

  const screenSize = useScreenListener();

  useLayoutEffect(() => {
    if (screenSize <= 992) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, [screenSize]);

  const handleToggle = () => {
    setShowSideBar((prev) => !prev);
  };
  return (
    <>
      <Box className="h-screen flex flex-row">
        <SideNav show={showSideBar} />

        <Box minH={"full"} w={"100%"} ml={0}>
          <TopNav toggleSideBar={handleToggle} />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
