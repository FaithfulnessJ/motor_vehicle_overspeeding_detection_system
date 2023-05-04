import { Box, Center, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../assets/images/admin_avatar.png";
import ActionButton from "./ActionButton";
import { Link, To, useNavigate } from "react-router-dom";
import { IoCarSport } from "react-icons/io5";
import { IoMdUnlock } from "react-icons/io";
import { FaSkullCrossbones } from "react-icons/fa";
import { useUserStore } from "../../utils/zustand/Store";
import { toastProps } from "../../utils/Helper";
import AuthServices from "../../utils/services/AuthServices";

type SideNavProps = {
  show?: boolean;
};

const SideNav = ({ show }: SideNavProps): JSX.Element => {
  const navigate = useNavigate();
  const toast = useToast();

  const [current, setCurrent] = useState("");

  const handleCurrent = (selected: string, to: To) => {
    setCurrent(selected.toLowerCase());
    if (to !== "#") navigate(to);
  };

  const removeUser = useUserStore((state: any) => state.removeUser);

  const handleLogout = async () => {
    try {
      await AuthServices.logout().then(() => {
        toast({
          ...toastProps,
          title: "Success",
          description: `You have logged out successfully`,
          status: "success",
        });
      });
      removeUser();
      navigate("/");
    } catch (error: any) {
      toast({
        ...toastProps,
        title: "Error!",
        description: error?.message,
        status: "error",
      });
    }
  };
  return (
    <>
      <Box
        w={"200px"}
        className={`h-screen ${!show && "hidden"} ease-in-out bg-gray-100`}
        flexShrink={0}
      >
        {/* Logo */}
        <Center h={"80px"}>
          <Link to="/">
            <img
              src={logo}
              alt="Admin"
              width="50"
              height="50"
              className="rounded-full"
            />
          </Link>
        </Center>

        <VStack gap={"1"} p={"2"} h={"60%"}>
          {menu_list?.map((menu, index) => (
            <MenuItem
              key={index}
              icon={menu?.icon}
              title={menu?.name}
              isCurrent={menu?.name.toLowerCase() === current}
              handleClick={() => handleCurrent(menu?.name, menu?.to)}
            />
          ))}
        </VStack>

        <Box p={"3"}>
          <ActionButton
            variant={"solid"}
            rightIcon={<IoMdUnlock />}
            handleClick={handleLogout}
          >
            logout
          </ActionButton>
        </Box>
      </Box>
    </>
  );
};

type MenuItemProps = {
  icon?: JSX.Element;
  title?: string;
  isCurrent?: boolean;
  handleClick?: () => void;
};
const MenuItem = ({ icon, title, isCurrent, handleClick }: MenuItemProps) => (
  <Box w={"full"}>
    <Box
      cursor={"pointer"}
      borderRadius={"md"}
      bg={isCurrent ? "#d4d0f5" : "white"}
      className={`${isCurrent ? `text-black` : `text-zinc-400`} `}
      w={"full"}
      onClick={handleClick}
      _hover={{
        color: "black",
        bg: "#d4d0f5",
      }}
    >
      <HStack gap={"2"} py={2} px={2}>
        {/* icon */}
        <Center h={"5"} w={"5"} textColor={"text-zinc-400"} fontSize={"lg"}>
          {icon}
        </Center>

        {/* name */}
        <Text fontSize={"md"}>{title}</Text>
      </HStack>
    </Box>
  </Box>
);

export default SideNav;

const menu_list = [
  {
    name: "Vehicles",
    to: "/admin/vehicles",
    icon: <IoCarSport />,
  },
  {
    name: "Speed Violations",
    to: "/admin/speed-violations",
    icon: <FaSkullCrossbones />,
  },
];
