import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import ActionButton from "../components/general/ActionButton";
import LoadingButton from "../components/general/LoadingButton";
import { toastProps } from "../utils/Helper";
import { Link } from "react-router-dom";
import CustomInput from "../components/general/CustomInput";
import AuthServices from "../utils/services/AuthServices";
import { useUserStore } from "../utils/zustand/Store";

const Login = (): JSX.Element => {
  const toast = useToast();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");

  const [loading, setLoading] = useState(false);

  const setUser = useUserStore((state: any) => state.setUser);
  const user = useUserStore((state: any) => state.user);

  useEffect(() => {
    // Checking logged in status
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e: {
    target: { name: string; value: string };
    preventDefault: () => void;
  }) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    if (state?.email === "") {
      toast({
        ...toastProps,
        title: "Error!",
        description: "Email is required",
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
    }

    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValid = handleValidation();

    if (!isValid) return;

    setLoading(true);

    try {
      await AuthServices.login(state.email, state.password).then((response) => {
        setUser(response.user);
        toast({
          ...toastProps,
          title: "Success",
          description: `${response.user.displayName}, you have logged in success`,
          status: "success",
        });
      });
      setLoading(false);
      navigate("/");
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
      <Box className="grid md:grid-cols-2 xs:grid-cols-1">
        <Box>
          <Center className="h-screen bg-slate-100">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl p-6 bg-white lg:w-8/12 md:w-8/12 xs:w-11/12 flex flex-col gap-6 items-center px-8"
            >
              <Text
                textAlign={"center"}
                fontSize={"3xl"}
                fontWeight={"semibold"}
                className="text-primary_color"
              >
                LOGIN
              </Text>

              <Box className="flex  flex-col gap-1 w-full">
                <FormControl my={2} isRequired>
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
                <FormControl my={2} isRequired>
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

              <Box className="py-1 w-full flex justify-center">
                {!loading ? (
                  <ActionButton
                    type={"submit"}
                    variant="solid"
                    width={"w-full"}
                  >
                    Log In
                  </ActionButton>
                ) : (
                  <LoadingButton />
                )}
              </Box>

              <Link
                to="/forgot-password"
                className="text-[#1771EB] hover:underline"
              >
                Forgot Password?
              </Link>
            </form>
          </Center>
        </Box>
        <Box className="bg-gradient-to-br from-primary_color to-slate-100"></Box>
      </Box>
    </Box>
  );
};

export default Login;
