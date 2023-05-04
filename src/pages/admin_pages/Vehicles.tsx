import { Box, Button } from "@chakra-ui/react";
import { useCallback, useState, useMemo, useLayoutEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import BreadCrumb from "../../components/general/BreadCrumb";
import { IoCarSport } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import Wrapper from "../../components/general/Wrapper";
import Table from "../../components/general/table/Table";
import CustomInput from "../../components/general/CustomInput";
import { AddSensorID } from "./modal/AddSensorID";
import { Link } from "react-router-dom";
import { useAllVehicle } from "../../hooks/useAllVehicle";
import { useTable } from "../../hooks/useTable";
import { VehicleType } from "../../utils/services/VehicleServices";
import VehicleCard from "../../components/vehicle/VehicleCard";
import TablePagination from "../../components/general/table/TablePagination";

export const Vehicles = (): JSX.Element => {
  const [openAddSensorID, setOpenAddSensorID] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [current, setCurrent] = useState<VehicleType>({
    id: "",
    owner: "",
    vehicleNumberPlate: "",
    phoneNumber: "",
    userId: "",
    sensorId: "",
  });
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

  const { vehicles, awaitingAssignmentVehicles, assignedVehicles } =
    useAllVehicle();
  const { slice, count } = useTable(vehicles, page, perPage);

  const updatePerPage = (count: number) => {
    setPerPage(count);
    setPage(1);
  };

  const handleOpenAddSensorID = useCallback(() => {
    setOpenAddSensorID(true);
  }, []);

  const handleCloseAddSensorID = useCallback(() => {
    setOpenAddSensorID(false);
  }, []);

  const cards_data = useMemo(
    () => [
      {
        text: "Awaiting Assignment",
        number: awaitingAssignmentVehicles,
        bg: "bg-primary_yellow_light",
        textColor: "text-primary_yellow",
      },
      {
        text: "Assigned",
        number: assignedVehicles,
        bg: "bg-primary_green_light",
        textColor: "text-primary_green",
      },
    ],
    [awaitingAssignmentVehicles, assignedVehicles]
  );

  return (
    <AdminLayout>
      <Box p={"3"} maxH={"91%"} overflowY={"scroll"} position={"relative"}>
        <BreadCrumb
          icon={<IoCarSport className="text-xl" />}
          title={"Vehicles"}
        />
        <Box display={"flex"} alignItems={"center"} gap={3} marginY={3}>
          {cards_data?.map((item, index) => (
            <VehicleCard
              key={index}
              text={item?.text}
              no={item?.number}
              textColor={item?.textColor}
              bg={item?.bg}
            />
          ))}
        </Box>
        <Wrapper>
          <Box className="mt-10 mb-5">
            <CustomInput
              icon={<HiOutlineSearch className="text-xl" />}
              placeholder={"Input your search..."}
              handleChange={(e) => setSearchValue(e.target.value)}
              name={"search"}
              type={"text"}
              width={"60%"}
              handleEyeClick={function (arg0: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Box>
          <Table
            headers={[
              "Owner",
              "Vehicle plate No",
              "Sensor ID",
              "Sensor Assignment",
              "Actions",
            ]}
            footer={
              <TablePagination
                count={count}
                setPage={setPage}
                updatePerPage={updatePerPage}
                page={page}
                options={[5, 10, 15, 20]}
              />
            }
          >
            {slice
              ?.filter((vehicle) =>
                vehicle === null
                  ? vehicle
                  : vehicle.vehicleNumberPlate
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    vehicle.owner
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
              )
              ?.map((data, index) => {
                const isEven = index % 2;
                return (
                  <tr
                    className={`h-14 ${isEven ? "bg-white" : "bg-gray-100"}`}
                    key={index}
                  >
                    <td className="capitalize py-3 px-4">{data?.owner}</td>

                    <td className="py-3 px-4">{data?.vehicleNumberPlate}</td>

                    <td className="py-3 px-4">
                      {data?.hasOwnProperty("sensorId") ? data.sensorId : "---"}
                    </td>

                    <td className="py-3 px-4">
                      {data?.hasOwnProperty("sensorId") ? (
                        <div className="rounded-lg px-2 py-2 text-center bg-primary_green w-fit">
                          Assigned
                        </div>
                      ) : (
                        <div className="rounded-lg px-2 py-2 text-center bg-primary_yellow w-fit">
                          Awaiting
                        </div>
                      )}
                    </td>

                    {/* actions table */}
                    <td className={` text-white py-3 px-4 w-32`}>
                      <Box className="flex gap-6 justify-between">
                        {data?.hasOwnProperty("sensorId") ? (
                          <Box></Box>
                        ) : (
                          <Button
                            fontSize="xl"
                            p="2"
                            h=""
                            className="rounded-md text-primary_color border-2 border-primary_color"
                            onClick={() => {
                              setCurrent(data);
                              handleOpenAddSensorID();
                            }}
                          >
                            <IoMdAddCircleOutline />
                          </Button>
                        )}
                        <Link to={`/admin/vehicles/${data?.id}`}>
                          <Button
                            fontSize="xl"
                            p="2"
                            h=""
                            className="rounded-md text-primary_color border-2 border-primary_color"
                          >
                            <FaEye />
                          </Button>
                        </Link>
                      </Box>
                    </td>
                  </tr>
                );
              })}
          </Table>
        </Wrapper>
      </Box>
      <AddSensorID
        isOpen={openAddSensorID}
        onClose={handleCloseAddSensorID}
        current={current}
      />
    </AdminLayout>
  );
};
