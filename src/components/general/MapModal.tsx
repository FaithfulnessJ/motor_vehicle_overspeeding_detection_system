import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useConnection } from "../../hooks/useConnection";
import Loader from "./Loader";
import Map from "./Map";
import { useAllMonitoredGeoLocation } from "../../hooks/useAllMonitoredGeoLocation";
import { useViolation } from "../../hooks/useViolation";
import IoTCommunicationServices from "../../utils/services/IoTCommunicationServices";
import { toastProps } from "../../utils/Helper";
import SpeedVoilationServices from "../../utils/services/SpeedVoilationServices";
import { fomartTime } from "../../utils/formatTime";

type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: JSX.Element;
  vehicleId?: string;
  sensorId?: string;
};

const MapModal = ({
  isOpen,
  onClose,
  vehicleId,
  sensorId,
}: MapModalProps): JSX.Element => {
  const toast = useToast();
  const { connection } = useConnection(vehicleId, sensorId);
  const { monitoredGeoLocations } = useAllMonitoredGeoLocation();
  const { filteredViolations } = useViolation();

  // Formart time
  const now: number = Date.now();
  const isoTimeStr =
    connection?.datetime?.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1") + "Z";
  const date: Date = new Date(isoTimeStr);

  const diffInTime: number = now - Math.floor(date.getTime());

  const currentTime: number = Math.floor(date.getTime()) + diffInTime;

  const vehicleData = {
    id: connection?.id,
    owner: connection?.owner,
    vehicleNumberPlate: connection?.vehicleNumberPlate,
    phoneNumber: connection?.phoneNumber,
    userId: connection?.userId,
    sensorId: connection?.sensorId,
  };

  const recordViolation = async (area: string) => {
    const data = {
      user: connection?.userId,
      phoneNumber: connection?.phoneNumber,
      vehicleNumberPlate: connection?.vehicleNumberPlate,
      speed: connection?.speed,
      area: area,
      dateTime: currentTime,
    };

    try {
      // Delay the execution of the function by 11 seconds
      await new Promise((resolve) => setTimeout(resolve, 11000));

      await SpeedVoilationServices.addSpeedViolation(data);
    } catch (error: any) {
      toast({
        ...toastProps,
        title: "Error!",
        description: error?.message,
        status: "error",
      });
    }
  };

  // Check if user is within any of the geofences
  const geofence = monitoredGeoLocations.find((geofence: any) => {
    const distance = getDistanceFromLatLonInMeters(
      parseFloat(connection?.latitude),
      parseFloat(connection?.longitude),
      geofence.location._lat,
      geofence.location._long
    );
    return distance <= 600;
  });

  if (geofence) {
    if (parseFloat(connection?.speed) > parseFloat(geofence.speed_limit)) {
      const newVehicleData = { ...vehicleData, notification: 1 };
      if (filteredViolations?.length === 0) {
        recordViolation(geofence.area);
      } else {
        for (const violation of filteredViolations) {
          if (
            fomartTime(violation?.dateTime) !== connection?.datetime ||
            violation?.area !== geofence.area ||
            violation?.vehicleNumberPlate !== connection?.vehicleNumberPlate
          ) {
            recordViolation(geofence.area);
          }
        }
      }
      try {
        IoTCommunicationServices.updateSpeedViolation(newVehicleData);
      } catch (error: any) {
        toast({
          ...toastProps,
          title: "Error!",
          description: error?.message,
          status: "error",
        });
      }
      console.log(
        `You have violated the speed limit of ${geofence.speed_limit} km/hr at ${geofence.area}`
      );
    } else {
      const newVehicleData = { ...vehicleData, notification: 0 };
      try {
        IoTCommunicationServices.updateSpeedViolation(newVehicleData);
      } catch (error: any) {
        toast({
          ...toastProps,
          title: "Error!",
          description: error?.message,
          status: "error",
        });
      }
      console.log(
        `Thank you for abiding the speed limit at ${geofence.area} of ${geofence.speed_limit} km/hr`
      );
    }
  } else {
    console.log("You are not within any geofences");
  }

  // Helper function to calculate the distance between two coordinates in meters
  function getDistanceFromLatLonInMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const earthRadius = 6371000; // meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  }

  // Helper function to convert degrees to radians
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Map view</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6}>
            {sensorId === undefined ? (
              <Loader />
            ) : connection?.longitude !== undefined &&
              connection?.latitude !== undefined &&
              connection?.longitude !== "" &&
              connection?.latitude !== "" ? (
              <Map
                lat={parseFloat(connection?.latitude)}
                lng={parseFloat(connection?.longitude)}
                width={"100%"}
                height={"500px"}
              />
            ) : (
              <Box>
                <Text lineHeight={1} letterSpacing={2} fontSize={"lg"}>
                  It seems you haven't been assigned a sensor Id or your vehicle
                  hasn't been connected to a monitoring device. Please wait as
                  ensure we connect you to get the best experience in monitoring
                  your ride.
                </Text>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MapModal;
