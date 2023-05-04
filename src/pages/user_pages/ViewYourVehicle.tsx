import { useEffect, useState, useCallback } from "react";
import UserLayout from "../../components/UserLayout";
import { Box, Center, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useAllVehicle } from "../../hooks/useAllVehicle";
import { useConnection } from "../../hooks/useConnection";
import { VehicleType } from "../../utils/services/VehicleServices";
import Map from "../../components/general/Map";
import Wrapper from "../../components/general/Wrapper";
import Loader from "../../components/general/Loader";
import MapModal from "../../components/general/MapModal";
import ActionButton from "../../components/general/ActionButton";

export const ViewYourVehicle = (): JSX.Element => {
  const path = useLocation()?.pathname.split("/");
  const [vehicle, setVehicle] = useState<VehicleType>({
    id: "",
    owner: "",
    vehicleNumberPlate: "",
    phoneNumber: "",
    userId: "",
    sensorId: "",
  });
  const [openViewMap, setOpenViewMap] = useState<boolean>(false);

  const { vehicles } = useAllVehicle();

  let vehicleID: string = path[path?.length - 1];

  const handleOpenViewMap = useCallback(() => {
    setOpenViewMap(true);
  }, []);

  const handleCloseViewMap = useCallback(() => {
    setOpenViewMap(false);
  }, []);

  useEffect(() => {
    setVehicle(
      vehicles?.find((vehicle: VehicleType) => vehicle?.id == vehicleID)
    );
  }, [vehicles, vehicleID]);

  const { connection } = useConnection(vehicleID, vehicle?.sensorId);

  return (
    <UserLayout>
      <Box className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
        <Box>
          <Wrapper>
            <Box className="flex justify-center items-center w-fit">
              <Box className="text-left text-md flex flex-col lg:gap-5 xs:gap-3">
                <Text fontWeight={"normal"}>Vehicle number plate</Text>
                {vehicle?.hasOwnProperty("sensorId") && (
                  <Text fontWeight={"normal"}>Sensor ID</Text>
                )}
              </Box>

              <Box className="text-left text-md flex flex-col lg:gap-5 xs:gap-3">
                <Text>
                  <span className="pl-3 md:pl-2 md:pr-4 xs:pr-2">:</span>
                  <span className="font-semibold">
                    {vehicle?.vehicleNumberPlate}
                  </span>
                </Text>

                {vehicle?.hasOwnProperty("sensorId") && (
                  <Text>
                    <span className="pl-3 md:pl-2 md:pr-4 xs:pr-2">:</span>
                    <span className="font-semibold uppercase">
                      {vehicle?.sensorId}
                    </span>
                  </Text>
                )}
              </Box>
            </Box>
          </Wrapper>
        </Box>
        <Box className="col-span-2">
          <Wrapper>
            {vehicle?.hasOwnProperty("sensorId") ? (
              Object.keys(connection).length !== 0 ? (
                <Center>
                  <ActionButton
                    variant={"solid"}
                    handleClick={handleOpenViewMap}
                  >
                    View map
                  </ActionButton>
                </Center>
              ) : (
                <Box>
                  <Text lineHeight={1} letterSpacing={2} fontSize={"lg"}>
                    This vehicle hasn't been connected to a monitoring device.
                    Please wait as the team connect your vehicle to the system.
                  </Text>
                </Box>
              )
            ) : (
              <Box>
                <Text lineHeight={1} letterSpacing={2} fontSize={"lg"}>
                  You haven't been assigned a sensor Id please wait as the team 
                  assigns you
                </Text>
              </Box>
            )}

            {/* {vehicle?.sensorId === "" ? (
                <Loader />
              ) : connection?.longitude !== undefined &&
                connection?.latitude !== undefined &&
                connection.longitude !== "" &&
                connection.latitude !== "" ? (
                <Map
                  lat={parseInt(connection?.latitude)}
                  lng={parseInt(connection?.longitude)}
                  width={"100%"}
                  height={"500px"}
                />
              ) : (
                <Box>
                  <Text lineHeight={1} letterSpacing={2} fontSize={"lg"}>
                    It you haven't assigned a sensor Id or this vehicle hasn't
                    been connected to a monitoring device. Please add a sensor
                    Id or connect it to monitoring device.
                  </Text>
                </Box>
              )} */}
          </Wrapper>
        </Box>
      </Box>
      {vehicle?.sensorId !== undefined && (
        <MapModal
          isOpen={openViewMap}
          onClose={handleCloseViewMap}
          vehicleId={vehicleID}
          sensorId={vehicle?.sensorId}
        />
      )}
    </UserLayout>
  );
};
