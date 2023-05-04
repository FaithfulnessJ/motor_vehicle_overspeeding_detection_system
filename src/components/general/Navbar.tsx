import { Box, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ActionButton from "./ActionButton";
import { HiUserGroup } from "react-icons/hi";
import { BiMenuAltRight } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useUserStore } from "../../utils/zustand/Store";
import AuthServices from "../../utils/services/AuthServices";
import { toastProps } from "../../utils/Helper";

const Navbar = (): JSX.Element => {
  const [openNav, setOpenNav] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const toast = useToast();

  const user = useUserStore((state: any) => state.user);
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
    } catch (error: any) {
      toast({
        ...toastProps,
        title: "Error!",
        description: error?.message,
        status: "error",
      });
    }
  };

  const userNavList = user ? (
    <Box position={"relative"}>
      <Box display={"flex"} gap={0.1} alignItems="center">
        <Box>{user?.displayName}</Box>
        <Box onClick={() => setShowDropDown(!showDropDown)} cursor="pointer">
          <RiArrowDropDownLine className="text-3xl" />
        </Box>
      </Box>
      {showDropDown && (
        <Box
          position={"absolute"}
          className="bg-gray-200 right-2 w-36"
          style={{
            transform: "translateX(-0%)",
            transition: "transform 0.10s ease",
          }}
        >
          {(user?.email === "kigene7@gmail.com" ||
            user?.email === "test@example.com" ||
            user?.email === "faithfulnessj1@gmail.com") && (
            <Box className="my-1 py-1 pl-2 hover:bg-gray-100">
              <Link to="/admin/vehicles">Admin dashboard</Link>
            </Box>
          )}
          
          <Link to="/my-violations">
            <Box
              cursor="pointer"
              className="my-1 py-1 pl-2 hover:bg-gray-100"
            >
              My violations
            </Box>
          </Link>
          <Box
            cursor="pointer"
            onClick={handleLogout}
            className="my-1 py-1 pl-2 hover:bg-gray-100"
          >
            Logout
          </Box>
        </Box>
      )}
    </Box>
  ) : (
    <Box className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <Link
        className="text-primary_color hover:underline font-semibold"
        to="/login"
      >
        Login
      </Link>
      <ActionButton rightIcon={<HiUserGroup />} variant="outline">
        <Link to="/register">Register</Link>
      </ActionButton>
    </Box>
  );

  return (
    <Box className="fixed w-full top-0 left-0 z-[99] bg-white border-2 border-b-primary_color">
      <Box mx="4" my="4">
        <Box className="mx-auto flex items-center justify-between">
          <Link to="/">
            <Text className="text-2xl xs:text-xl text-primary_color font-bold">
              Motor vehicle overspeeding detection system
            </Text>
          </Link>
          <Box className="hidden lg:block">{userNavList}</Box>
          <button
            className="focus:outline-none ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <RxCross2 className="text-3xl" />
            ) : (
              <BiMenuAltRight className="text-3xl" />
            )}
          </button>
        </Box>
        {openNav && (
          <Box
            className="fixed top-15 right-0 w-[180px] px-5 bg-white z-[99]"
            style={{
              transform: "translateX(-0%)",
              transition: "transform 0.10s ease",
            }}
          >
            {userNavList}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
