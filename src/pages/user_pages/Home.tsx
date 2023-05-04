import { useState, useCallback } from "react";
import ActionButton from "../../components/general/ActionButton";
import UserLayout from "../../components/UserLayout";
import { IoIosAdd } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Box, Center } from "@chakra-ui/react";
import Wrapper from "../../components/general/Wrapper";
import { useUserStore } from "../../utils/zustand/Store";
import { useUserVehicle } from "../../hooks/useUserVehicle";
import { useTable } from "../../hooks/useTable";
import Table from "../../components/general/table/Table";
import CustomInput from "../../components/general/CustomInput";
import { HiOutlineSearch } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import TablePagination from "../../components/general/table/TablePagination";
import { VehicleType } from "../../utils/services/VehicleServices";
import EditVehicleDetailsModal from "./modal/EditVehicleDetailsModal";

export const Home = (): JSX.Element => {
  const user = useUserStore((state: any) => state.user);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [editVehicleDetails, setEditVehicleDetails] = useState(false);
  const [current, setCurrent] = useState<VehicleType>({
    owner: "",
    vehicleNumberPlate: "",
    phoneNumber: "",
    userId: "",
  });

  // Hooks
  const { vehicles } = useUserVehicle(user?.uid);
  const { slice, count } = useTable(vehicles, page, perPage);

  const updatePerPage = (count: number) => {
    setPerPage(count);
    setPage(1);
  };

  const handleOpenEditVehicleDetails = useCallback(() => {
    setEditVehicleDetails(true);
  }, []);

  const handleCloseEditVehicleDetails = useCallback(() => {
    setEditVehicleDetails(false);
  }, []);

  return (
    <UserLayout>
      {user && (
        <Box className="flex justify-end mb-4">
          <ActionButton
            leftIcon={<IoIosAdd className="text-2xl" />}
            variant="solid"
          >
            <Link to="/add-vehicle">Add a Vehicle</Link>
          </ActionButton>
        </Box>
      )}

      <Wrapper>
        {user ? (
          vehicles.length > 0 ? (
            <Box>
              <Box className="mt-8 mb-5">
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
                  "Vehicle plate No",
                  "Phone number",
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
                          .includes(searchValue.toLowerCase())
                  )
                  ?.map((data, index) => {
                    const isEven = index % 2;
                    return (
                      <tr
                        className={`h-14 text-md ${
                          isEven ? "bg-white" : "bg-gray-100"
                        }`}
                        key={index}
                      >
                        <td className="uppercase font-bold py-3 px-4">
                          {data?.vehicleNumberPlate}
                        </td>

                        <td className="uppercase font-bold py-3 px-4">
                          {data?.phoneNumber}
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
                            <Link to={`/vehicle/${data?.id}`}>
                              <Box
                                as="button"
                                fontSize="xl"
                                p="1"
                                h=""
                                className="rounded-md text-primary_color border-2 border-primary_color"
                              >
                                <FaEye />
                              </Box>
                            </Link>
                            <Box
                              as="button"
                              fontSize="xl"
                              p="1"
                              h=""
                              className="rounded-md text-primary_color border-2 border-primary_color"
                              onClick={() => {
                                setCurrent(data);
                                handleOpenEditVehicleDetails();
                              }}
                            >
                              <AiFillEdit />
                            </Box>
                          </Box>
                        </td>
                      </tr>
                    );
                  })}
              </Table>
            </Box>
          ) : (
            <Center>
              <Box>
                <Center>
                  <IoCarSport className="text-[200px] text-gray-500" />
                </Center>

                <Box className="text-center">
                  <p className="mt-3 mb-8 mx-20 text-xl">
                    <span className="font-semibold">{user?.displayName}</span>,
                    I warmly welcome to manage your ride, please proceed to add
                    your vehile or vehicles. Just click{" "}
                    <Link
                      to="/add-vehicle"
                      className="text-[#1771EB] hover:underline"
                    >
                      here
                    </Link>{" "}
                    or click the Button above{" "}
                    <span className="font-semibold">Add a vehicle</span>.
                  </p>
                </Box>
              </Box>
            </Center>
          )
        ) : (
          <Center>
            <Box>
              <Center>
                <IoCarSport className="text-[200px] text-gray-500" />
              </Center>

              <Box className="text-center">
                <p className="mt-3 mb-8 mx-20 text-xl">
                  Welcome to manage your ride. To proceed, please create an
                  account with us{" "}
                  <Link
                    to="/register"
                    className="text-[#1771EB] hover:underline"
                  >
                    click here
                  </Link>{" "}
                  or login{" "}
                  <Link to="/login" className="text-[#1771EB] hover:underline">
                    click here
                  </Link>{" "}
                </p>
              </Box>
            </Box>
          </Center>
        )}
      </Wrapper>
      
      <EditVehicleDetailsModal
        isOpen={editVehicleDetails}
        onClose={handleCloseEditVehicleDetails}
        current={current}
      />
    </UserLayout>
  );
};
