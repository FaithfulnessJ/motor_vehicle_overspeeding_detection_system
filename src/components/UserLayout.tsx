import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "./general/Footer";
import Navbar from "./general/Navbar";

type UserLayoutProps = {
  children: ReactNode;
};

const UserLayout = ({ children }: UserLayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <Box className="my-24 lg:mx-20 mx-5">{children}</Box>
      <Footer />
    </>
  );
};

export default UserLayout;
