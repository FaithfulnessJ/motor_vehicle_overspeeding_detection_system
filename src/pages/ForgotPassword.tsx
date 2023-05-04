import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import  { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import ActionButton from "../components/general/ActionButton";
import LoadingButton from "../components/general/LoadingButton";
import { toastProps } from "../utils/Helper";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/general/CustomInput";

const ForgotPassword = (): JSX.Element => {
  const toast = useToast();

  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const mailformat = /^w+([.-]?w+)*(.w{2,3})+$@gmail.com/;

  const handleValidation = () => {
    if (state?.email === "") {
      toast({
        ...toastProps,
        title: "Error!",
        description: "Email is required",
        status: "error",
      });

      return false;
    } else if (state?.email.match(mailformat)) {
      toast({
        ...toastProps,
        title: "Error!",
        description:
          "You have entered an invalid email address! We only accept gmail",
        status: "error",
      });

      return false;
    }

    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValid = handleValidation();

    if (!isValid) return;

    setLoading(true);
  };
  return (
    <Box className="h-screen bg-gradient-to-br from-primary_color to-slate-100">
      <Box className="fixed w-full top-0 left-0 z-[99] bg-white border-b-primary_color">
        <Box mx="4" my="4">
          <Box className="mx-auto flex items-center justify-between">
            <Link to="/">
              <Text className="lg:text-2xl xs:text-xl text-primary_color font-bold">
                Motor vehicle overspeeding detection system
              </Text>
            </Link>
            <Box className="flex items-center gap-4">
              <Text className="hidden lg:block">Don't have an account?</Text>
              <Link
                to="/register"
                className="text-secondary_color hover:underline"
              >
                Sign up
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Center className=" pt-40 pb-5">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-6 bg-white lg:w-4/12 md:w-8/12 xs:w-11/12 flex flex-col gap-6 items-center px-8"
        >
          <Text
            textAlign={"center"}
            fontSize={"3xl"}
            fontWeight={"semibold"}
            className="text-primary_color"
          >
            Forgot Password?
          </Text>

          <Box className="flex  flex-col gap-1 w-full">
            <FormControl my={1} isRequired>
              <FormLabel>Email</FormLabel>
              <CustomInput
                icon={<AiOutlineMail className="text-xl text-gray-400" />}
                width="full"
                placeholder={"Email"}
                handleChange={handleChange}
                name={"email"}
                type={"text"}
                handleEyeClick={function (arg0: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </FormControl>
          </Box>

          <Box className="py-2 w-full flex justify-center">
            {!loading ? (
              <ActionButton type={"submit"} variant="solid" width={"w-full"}>
                Request Password Reset
              </ActionButton>
            ) : (
              <LoadingButton />
            )}
          </Box>
        </form>
      </Center>
    </Box>
  );
};

export default ForgotPassword;
