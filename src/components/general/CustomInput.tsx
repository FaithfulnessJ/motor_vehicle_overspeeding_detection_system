import { Box, Center, Select } from "@chakra-ui/react";
import React, { ChangeEvent, ReactNode } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type CustomInputProps = {
  icon?: JSX.Element;
  placeholder?: string | "search";
  type: string;
  width?: string;
  value?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  handleEyeClick: (arg0: string) => void;
};

const CustomInput = ({
  icon,
  placeholder,
  type,
  width,
  value,
  handleChange,
  name,
  handleEyeClick,
}: CustomInputProps): JSX.Element => {
  return (
    <Box
      display={"flex"}
      gap={"3"}
      alignItems={"center"}
      px={"2"}
      bg={"white"}
      borderWidth={"1px"}
      overflow={"hidden"}
      borderRadius={"xl"}
      borderColor={"#2F2A5E"}
      width={width}
    >
      {icon}

      <input
        placeholder={placeholder}
        className="border-0 outline-none focus:outline-none  h-10 flex-grow"
        type={type}
        value={value}
        onChange={handleChange}
        name={name}
      />
      {(name === "passwordConfirmation" || name === "password") && (
        <Center
          className="cursor-pointer"
          w={"10"}
          h={"full"}
          onClick={() => {
            if (type === "password") {
              handleEyeClick("text");
            } else {
              handleEyeClick("password");
            }
          }}
        >
          {type === "password" ? (
            <AiFillEye className="text-2xl" />
          ) : (
            <AiFillEyeInvisible className="text-2xl" />
          )}
        </Center>
      )}
    </Box>
  );
};

type CSelectProps = {
  placeholder: "search";
  value: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  children: ReactNode;
};

export const CSelect = ({
  placeholder,
  value,
  handleChange,
  name,
  children,
}: CSelectProps) => (
  <Box
    display={"flex"}
    gap={"3"}
    alignItems={"center"}
    w={3 / 4}
    // px={"2"}
    borderWidth={"1px"}
    overflow={"hidden"}
    borderRadius={"md"}
    borderColor={"#2F2A5E"}
  >
    <Select
      variant="outline"
      placeholder={placeholder}
      borderWidth={0}
      w={"full"}
      m={"0"}
      onChange={handleChange}
      value={value}
      name={name}
    >
      {children}
    </Select>
  </Box>
);

export default CustomInput;
