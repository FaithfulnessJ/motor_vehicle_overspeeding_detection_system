import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MonitoredGeoLocationServices from "../utils/services/MonitoredGeoLocationServices";
import { toastProps } from "../utils/Helper";

export const useAllMonitoredGeoLocation = () => {
  const toast = useToast();
  const [monitoredGeoLocations, setMonitoredGeoLocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllMonitoredGeoLocations = async () => {
      await MonitoredGeoLocationServices.fetchAllMonitoredGeoLocations()
        .then((response) => {
          setMonitoredGeoLocations(response);
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

    fetchAllMonitoredGeoLocations();
  }, []);
  return { monitoredGeoLocations };
};
