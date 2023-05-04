import { Box, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CustomInput from "../../../components/general/CustomInput";
import CustomModal from "../../../components/general/CustomModal";
import { toastProps } from "../../../utils/Helper";
import VehicleServices from "../../../utils/services/VehicleServices";
import { VehicleType } from "../../../utils/services/VehicleServices";
import { FaPhoneAlt } from "react-icons/fa";

type EditVehicleDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  current: VehicleType;
};

const EditVehicleDetailsModal = ({
  isOpen,
  onClose,
  current,
}: EditVehicleDetailsProps): JSX.Element => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    phoneNumber: "",
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      phoneNumber: current?.phoneNumber,
    }));
  }, [current]);

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
    } 

    return true;
  };

  const handleSubmit = async () => {
    const isValid = handleValidation();

    if (!isValid) return;

    setLoading(true);

    let data: any = {};

    current?.hasOwnProperty("sensorId")
      ? (data = {
          owner: current?.owner,
          vehicleNumberPlate: current?.vehicleNumberPlate,
          phoneNumber: state?.phoneNumber,
          userId: current?.userId,
          sensorId: current?.sensorId,
        })
      : (data = {
          owner: current?.owner,
          vehicleNumberPlate: current?.vehicleNumberPlate,
          phoneNumber: state?.phoneNumber,
          userId: current?.userId,
        });

    try {
      await VehicleServices.editVehicle(current?.id!, data).then(() => {
        toast({
          ...toastProps,
          title: "Success",
          description: `Vehicle details has been updated successfully`,
          status: "success",
        });
      });
      setLoading(false);
      onClose();
      setTimeout(() => {
        location.reload();
      }, 2000);
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
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      handleSave={handleSubmit}
      title={`Edit your Vehicle: ${current?.vehicleNumberPlate}`}
      loading={loading}
    >
      <Box width={"full"}>
        <Box className="flex  flex-col gap-1 w-full">
          <FormControl my={1} isRequired>
            <FormLabel>Phone number</FormLabel>
            <CustomInput
              icon={<FaPhoneAlt className="text-xl text-gray-400" />}
              placeholder={"+2547******"}
              handleChange={handleChange}
              name={"phoneNumber"}
              type={"text"}
              value={state?.phoneNumber}
              handleEyeClick={function (arg0: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </FormControl>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default EditVehicleDetailsModal;
