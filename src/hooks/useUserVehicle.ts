import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VehicleServices, {
  VehicleType,
} from "../utils/services/VehicleServices";
import { toastProps } from "../utils/Helper";

export const useUserVehicle = (userId: string) => {
  const toast = useToast();
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserVehicles = async () => {
      await VehicleServices.fetchUserVehicles(userId).then((response) => {
        setVehicles(response);
      });
      // .catch((error: any) => {
      //   toast({
      //     ...toastProps,
      //     title: "Error!",
      //     description: error.message,
      //     status: "error",
      //   });
      // });
    };
    fetchUserVehicles();
  }, []);

  return { vehicles };
};
