import { Button } from "@chakra-ui/react";
import React from "react";

const LoadingButton = (): JSX.Element => {
  return (
    <Button
      isLoading
      loadingText="Loading"
      borderColor={"#2F2A5E"}
      textColor={"#2F2A5E"}
      variant={"outline"}
      spinnerPlacement="end"
      fontSize={"20px"}
      w={"100%"}
      h={"10"}
    >
      loading
    </Button>
  );
};

export default LoadingButton;
