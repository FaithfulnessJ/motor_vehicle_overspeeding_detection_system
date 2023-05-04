import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return <Box className="rounded-md w-full bg-gray-200 p-2">{children}</Box>;
};

export default Wrapper;
