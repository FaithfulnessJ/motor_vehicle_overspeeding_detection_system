import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import ActionButton from "../components/general/ActionButton";
import LoadingButton from "../components/general/LoadingButton";
import { toastProps } from "../utils/Helper";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/general/CustomInput";
import AuthServices from "../utils/services/AuthServices";
import { useUserStore } from "../utils/zustand/Store";

const Register = (): JSX.Element => {
  const toast = useToast();
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmationType, setPasswordConfirmationType] =
    useState("password");

  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const setUser = useUserStore((state: any) => state.setUser);
  const user = useUserStore((state: any) => state.user);

  useEffect(() => {
    // Checking logged in status
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const mailformat = /^w+([.-]?w+)*(.w{2,3})+$@gmail.com/;

  const handleValidation = () => {
    if (state?.firstname === "") {
      toast({
        ...toastProps,
        title: "Error!",
        description: "First name is required",
        status: "error",
      });

      return false;
    } else if (state?.lastname === "") {
      toast({
        ...toastProps,
        title: "Error!",
        description: "Last name is required",
        status: "error",
      });

      return false;
    } else if (state?.email === "") {
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
    } else if (state?.password === "") {
      toast({
        ...toastProps,
        title: "Error!",
        description: "Password is required",
        status: "error",
      });

      return false;
    } else if (state?.passwordConfirmation === "") {
      toast({
        ...toastProps,
        title: "Error!",
        description: "Please confirm your password",
        status: "error",
      });

      return false;
    } else if (state?.password !== state?.passwordConfirmation) {
      toast({
        ...toastProps,
        title: "Error!",
        description: "please confirm again your password!",
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

    const username = state.firstname + " " + state.lastname;

    try {
      await AuthServices.register(username, state.email, state.password).then(
        (response) => {
          setUser(response.user);
          toast({
            ...toastProps,
            title: "Success",
            description: `${username} your account has been created successfully, please check your email to verify you account`,
            status: "success",
          });
        }
      );
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      toast({
        ...toastProps,
        title: "Error!",
        description: error.message,
        status: "error",
      });
      setLoading(false);
    }
  };
  return (
    <Box className="mini-h-screen bg-gradient-to-br from-primary_color to-slate-100">
      <Box className="fixed w-full top-0 left-0 z-[99] bg-white border-b-primary_color">
        <Box mx="4" my="4">
          <Box className="mx-auto flex items-center justify-between">
            <Link to="/">
              <Text className="lg:text-2xl xs:text-xl text-primary_color font-bold">
                Motor vehicle overspeeding detection system
              </Text>
            </Link>
            <Box className="flex items-center gap-4">
              <Text className="hidden lg:block">Already have an account?</Text>
              <Link
                to="/login"
                className="text-secondary_color hover:underline"
              >
                Sign In
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Center className=" pt-24 pb-5">
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
            REGISTER
          </Text>

          <Box className="flex  flex-col gap-1 w-full">
            <FormControl my={1} isRequired>
              <FormLabel>First name</FormLabel>
              <CustomInput
                icon={<FaUserCircle className="text-xl text-gray-400" />}
                width="full"
                placeholder={"First name"}
                handleChange={handleChange}
                name={"firstname"}
                type={"text"}
                handleEyeClick={function (arg0: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </FormControl>
          </Box>

          <Box className="flex  flex-col gap-1 w-full">
            <FormControl my={1} isRequired>
              <FormLabel>Last name</FormLabel>
              <CustomInput
                icon={<FaUserCircle className="text-xl text-gray-400" />}
                width="full"
                placeholder={"last name"}
                handleChange={handleChange}
                name={"lastname"}
                type={"text"}
                handleEyeClick={function (arg0: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </FormControl>
          </Box>

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

          <Box className="flex  flex-col gap-1 w-full">
            <FormControl my={1} isRequired>
              <FormLabel>Password</FormLabel>
              <CustomInput
                width="full"
                placeholder={"Password"}
                handleChange={handleChange}
                name={"password"}
                type={passwordType}
                handleEyeClick={(type) => setPasswordType(type)}
              />
            </FormControl>
          </Box>

          <Box className="flex  flex-col gap-1 w-full">
            <FormControl my={1} isRequired>
              <FormLabel>Password Confirmation</FormLabel>
              <CustomInput
                width="full"
                placeholder={"Confirm your password"}
                handleChange={handleChange}
                name={"passwordConfirmation"}
                type={passwordConfirmationType}
                handleEyeClick={(type) => setPasswordConfirmationType(type)}
              />
            </FormControl>
          </Box>

          <Box className="py-2 w-full flex justify-center">
            {!loading ? (
              <ActionButton type={"submit"} variant="solid" width={"w-full"}>
                Register
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

export default Register;
