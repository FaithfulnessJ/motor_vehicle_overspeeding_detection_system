import { useEffect, useState } from "react";
import IoTCommunicationServices from "../utils/services/IoTCommunicationServices";
import { VehicleType } from "../utils/services/VehicleServices";

export const useConnection = (vehicleID: any, sensorId: any) => {
  const [userConnection, setUserConnection] = useState<VehicleType>({
    id: "",
    owner: "",
    vehicleNumberPlate: "",
    phoneNumber: "",
    userId: "",
    sensorId: "",
  });
  const [vehiclePositionData, setVehiclePositionData] = useState({});

  const [connection, setConnection] = useState({
    imei: "",
    latitude: "",
    longitude: "",
    speed: "",
    id: "",
    owner: "",
    vehicleNumberPlate: "",
    phoneNumber: "",
    userId: "",
    sensorId: "",
    datetime: "",
  });

  useEffect(() => {
    const fetchUserConnection = async () => {
      await IoTCommunicationServices.fetchAllConnections().then((response) => {
        setUserConnection(response?.find((con: any) => con?.id == vehicleID));
        setVehiclePositionData(response?.find((con: any) => con?.imei == sensorId));
      });
    };
    fetchUserConnection();
  }, []);

  useEffect(() => {
    const mergeData = (
      userConnection: VehicleType,
      vehiclePositionData: any
    ) => {
      setConnection({ ...userConnection, ...vehiclePositionData });
    };
    mergeData(userConnection, vehiclePositionData);
  }, [userConnection, vehiclePositionData]);

  return { connection };
};
