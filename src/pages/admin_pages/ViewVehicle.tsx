import { useEffect, useCallback, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import BreadCrumb from "../../components/general/BreadCrumb";
import { IoCarSport } from "react-icons/io5";
import { SiQuantconnect } from "react-icons/si";
import { Box, Center, Text, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllVehicle } from "../../hooks/useAllVehicle";
import { useConnection } from "../../hooks/useConnection";
import Wrapper from "../../components/general/Wrapper";
import { VehicleType } from "../../utils/services/VehicleServices";
import ActionButton from "../../components/general/ActionButton";
import IoTCommunicationServices from "../../utils/services/IoTCommunicationServices";
import { toastProps } from "../../utils/Helper";
import LoadingButton from "../../components/general/LoadingButton";
import MapModal from "../../components/general/MapModal";

export const ViewVehicle = (): JSX.Element => {
  const toast = useToast();
  const navigate = useNavigate();
  const path = useLocation()?.pathname.split("/");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setVehicle(
      vehicles?.find((vehicle: VehicleType) => vehicle?.id == vehicleID)
    );
  }, [vehicles, vehicleID]);

  const { connection } = useConnection(vehicleID, vehicle?.sensorId);

  const handleOpenViewMap = useCallback(() => {
    setOpenViewMap(true);
  }, []);

  const handleCloseViewMap = useCallback(() => {
    setOpenViewMap(false);
  }, []);

  const handleMakeConnection = async () => {
    setLoading(true);
    try {
      await IoTCommunicationServices.makeConnection(vehicle).then(() => {
        setLoading(false);
        toast({
          ...toastProps,
          title: "Success",
          description: "Connected",
          status: "success",
        });
      });
      setTimeout(() => {
        navigate("/admin/vehicles");
      }, 2000);
    } catch (error: any) {
      toast({
        ...toastProps,
        title: "Error!",
        description: error?.message,
        status: "error",
      });
    }
  };

  return (
    <AdminLayout>
      <Box p={"3"} maxH={"91%"} overflowY={"scroll"} position={"relative"}>
        <BreadCrumb
          icon={<IoCarSport className="text-xl" />}
          title={"Vehicles/"}
          subtitle={vehicle?.vehicleNumberPlate}
        />
        <Box className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
          <Box>
            <Wrapper>
              <Box className="flex justify-center items-center w-fit">
                <Box className="text-left text-md flex flex-col lg:gap-5 xs:gap-3">
                  <Text fontWeight={"normal"}>Owner</Text>
                  <Text fontWeight={"normal"}>Vehicle number plate</Text>
                  <Text fontWeight={"normal"}>Owner phone number</Text>
                  {vehicle?.hasOwnProperty("sensorId") && (
                    <Text fontWeight={"normal"}>Sensor ID</Text>
                  )}
                </Box>

                <Box className="text-left text-md flex flex-col lg:gap-5 xs:gap-3">
                  <Text>
                    <span className="pl-3 md:pl-2 md:pr-4 xs:pr-2">:</span>
                    <span className="font-semibold">{vehicle?.owner}</span>
                  </Text>
                  <Text>
                    <span className="pl-3 md:pl-2 md:pr-4 xs:pr-2">:</span>
                    <span className="font-semibold">
                      {vehicle?.vehicleNumberPlate}
                    </span>
                  </Text>
                  <Text>
                    <span className="pl-3 md:pl-2 md:pr-4 xs:pr-2">:</span>
                    <span className="font-semibold uppercase">
                      {vehicle?.phoneNumber}
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
            <Box display={"flex"} justifyContent={"center"} marginY={5}>
              {Object.keys(connection).length !== 0 ? (
                <ActionButton
                  variant={"solid"}
                  rightIcon={<SiQuantconnect className="text-xl" />}
                  handleClick={handleMakeConnection}
                  isDisabled={true}
                >
                  Connected
                </ActionButton>
              ) : vehicle?.hasOwnProperty("sensorId") ? (
                loading ? (
                  <LoadingButton />
                ) : (
                  <ActionButton
                    variant={"solid"}
                    rightIcon={<SiQuantconnect className="text-xl" />}
                    handleClick={handleMakeConnection}
                  >
                    Connect
                  </ActionButton>
                )
              ) : (
                <Text>
                  Please add{" "}
                  <Text as="span" fontWeight={"semibold"}>
                    sensor ID
                  </Text>{" "}
                  to connect
                </Text>
              )}
            </Box>
          </Box>
          <Box className="col-span-2">
            <Wrapper>
              {Object.keys(connection).length !== 0 ? (
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
                    Please do connect it to allow map viewing.
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
      </Box>
      {vehicle?.sensorId !== undefined && (
        <MapModal
          isOpen={openViewMap}
          onClose={handleCloseViewMap}
          vehicleId={vehicleID}
          sensorId={vehicle?.sensorId}
        />
      )}
    </AdminLayout>
  );
};