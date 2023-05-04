import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import ActionButton from "../../components/general/ActionButton";
import LoadingButton from "../../components/general/LoadingButton";
import { toastProps } from "../../utils/Helper";
import { Link, useNavigate } from "react-router-dom";
import UserLayout from "../../components/UserLayout";
import CustomInput from "../../components/general/CustomInput";
import VehicleServices from "../../utils/services/VehicleServices";
import { useUserStore } from "../../utils/zustand/Store";

export const VehicleRegistration = (): JSX.Element => {
  const toast = useToast();

  const navigate = useNavigate();

  const user = useUserStore((state: any) => state.user);

  const [state, setState] = useState({
    phoneNumber: "",
    numberPlate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    if (state?.phoneNumber === "") {
      toast({
        ...toastProps,
        title: "Error!",
        description: "Phone number is required",
        status: "error",
      });

      return false;
    } else if (state?.numberPlate === "") {
      toast({
        ...toastProps,
        title: "Error!",
        description: "Number plate is required",
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

    const data = {
      owner: user.displayName,
      vehicleNumberPlate: state.numberPlate,
      phoneNumber: state.phoneNumber,
      userId: user.uid,
    };

    try {
      await VehicleServices.addVehicle(data).then(() => {
        toast({
          ...toastProps,
          title: "Success",
          description: "Your vehicle has been added successfully",
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
    <UserLayout>
      <Center className="py-5">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-6 bg-white lg:w-5/12 md:w-8/12 xs:w-11/12 flex flex-col gap-6 items-center px-8 border-2 border-primary_color"
        >
          <Text
            textAlign={"center"}
            fontSize={"3xl"}
            fontWeight={"semibold"}
            className="text-primary_color"
          >
            Add a Vehicle
          </Text>

          <Box className="flex  flex-col gap-1 w-full">
            <FormControl my={1} isRequired>
              <FormLabel>Phone number</FormLabel>
              <CustomInput
                icon={<FaPhoneAlt className="text-xl text-gray-400" />}
                placeholder={"+2547******"}
                handleChange={handleChange}
                name={"phoneNumber"}
                type={"text"}
                handleEyeClick={function (arg0: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </FormControl>
          </Box>
          <Box className="flex  flex-col gap-1 w-full">
            <FormControl my={1} isRequired>
              <FormLabel>Vehile number plate</FormLabel>
              <CustomInput
                icon={<HiIdentification className="text-xl text-gray-400" />}
                placeholder={"KCY 429T"}
                handleChange={handleChange}
                name={"numberPlate"}
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
                Add
              </ActionButton>
            ) : (
              <LoadingButton />
            )}
          </Box>
        </form>
      </Center>
    </UserLayout>
  );
};
