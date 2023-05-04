import { FormControl, FormLabel, useToast } from "@chakra-ui/react";
import  { useState } from "react";
import CustomInput from "../../../components/general/CustomInput";
import CustomModal from "../../../components/general/CustomModal";
import { toastProps } from "../../../utils/Helper";
import VehicleServices from "../../../utils/services/VehicleServices";
import { VehicleType } from "../../../utils/services/VehicleServices";

type AddSensorIDProps = {
  isOpen: boolean;
  onClose: () => void;
  current: VehicleType;
};

export const AddSensorID = ({
  isOpen,
  onClose,
  current,
}: AddSensorIDProps): JSX.Element => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    sensorId: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    if (state?.sensorId === "") {
      toast({
        ...toastProps,
        title: "Error!",
        description: "Sensor ID is required!",
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

    const data = {
      owner: current?.owner,
      vehicleNumberPlate: current?.vehicleNumberPlate,
      phoneNumber: current?.phoneNumber,
      userId: current?.userId,
      sensorId: state?.sensorId,
    };

    try {
      await VehicleServices.addSensorId(current?.id!, data).then(() => {
        toast({
          ...toastProps,
          title: "Success",
          description: `Sensor ID has been assigned successfully to ${current?.vehicleNumberPlate}`,
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
      title="Add Sensor ID"
      loading={loading}
    >
      <FormControl my={2} isRequired>
        <FormLabel>Sensor ID</FormLabel>
        <CustomInput
          placeholder={"Sensor iD"}
          handleChange={handleChange}
          name={"sensorId"}
          type={"text"}
          handleEyeClick={function (arg0: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </FormControl>
    </CustomModal>
  );
};
