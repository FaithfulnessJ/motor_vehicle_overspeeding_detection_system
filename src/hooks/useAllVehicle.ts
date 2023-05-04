import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VehicleServices from "../utils/services/VehicleServices";
import { toastProps } from "../utils/Helper";

export const useAllVehicle = () => {
  const toast = useToast();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [awaitingAssignmentVehicles, setAwaitingAssignmentVehicles] =
    useState<number>(0);
  const [assignedVehicles, setAssignedVehicles] = useState<number>(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      await VehicleServices.fetchAllVehicles()
        .then((response) => {
          setVehicles(response);
          setAwaitingAssignmentVehicles(
            response.reduce(
              (acc, obj) =>
                obj.hasOwnProperty("sensorId") === false ? (acc += 1) : acc,
              0
            )
          );
          setAssignedVehicles(
            response.reduce(
              (acc, obj) =>
                obj.hasOwnProperty("sensorId") === true ? (acc += 1) : acc,
              0
            )
          );
        })
        .catch((error: any) => {
          toast({
            ...toastProps,
            title: "Error!",
            description: error.message,
            status: "error",
          });
        });
    };
    fetchVehicles();
  }, []);

  return { vehicles, awaitingAssignmentVehicles, assignedVehicles };
};
