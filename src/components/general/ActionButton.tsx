import { Button } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type ActionButtonProps = {
  // look here 👇
  marginLeft?: string;
  marginRight?: string;
  variant: string;
  size?: string;
  handleClick?: () => void;
  width?: string;
  children?: ReactNode;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  type?: "button" | "submit" | "reset" | undefined; 
  isDisabled?:boolean;
};

const ActionButton = ({
  children,
  marginLeft,
  marginRight,
  variant,
  size,
  handleClick,
  width,
  rightIcon,
  leftIcon,
  type,
  isDisabled,
}: ActionButtonProps): JSX.Element => {
  return (
    <Button
      ml={marginLeft}
      mr={marginRight}
      colorScheme="#2F2A5E"
      variant={variant}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
      isDisabled={isDisabled}
      size={size}
      className={`hover:shadow-lg bg-[#2F2A5E] text-black border-none ${width}`}
      onClick={handleClick}
      type={type}
      h={"10"}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
