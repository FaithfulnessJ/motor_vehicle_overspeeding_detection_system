import { Box, Center, Text } from "@chakra-ui/react";
import { useState, useLayoutEffect } from "react";
import UserLayout from "../../components/UserLayout";
import Wrapper from "../../components/general/Wrapper";
import CustomInput from "../../components/general/CustomInput";
import Table from "../../components/general/table/Table";
import TablePagination from "../../components/general/table/TablePagination";
import { useTable } from "../../hooks/useTable";
import { useMyViolation } from "../../hooks/useViolation";
import { HiOutlineSearch } from "react-icons/hi";
import { useUserStore } from "../../utils/zustand/Store";
import { Congrats } from "../../assets/icons/Congrats";
import { IoMdAdd } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import ActionButton from "../../components/general/ActionButton";
import { useScreenListener } from "../../hooks/useScreenListener";
import { fomartTime } from "../../utils/formatTime";

export const ViewYourViolations = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [resizeFilter, setResizeFilter] = useState<boolean>(false);

  const user = useUserStore((state: any) => state.user);
  const { violations } = useMyViolation(user?.uid);
  const {
    slice,
    count,
    sortByDateCreatedAscending,
    sortByDateCreatedDescending,
  } = useTable(violations, page, perPage);
  const screenSize = useScreenListener();

  useLayoutEffect(() => {
    if (screenSize <= 992) {
      setResizeFilter(true);
    } else {
      setResizeFilter(false);
    }
  }, [screenSize]);

  const updatePerPage = (count: number) => {
    setPerPage(count);
    setPage(1);
  };

  return (
    <UserLayout>
      {violations.length === 0 ? (
        <Center>
          <Wrapper>
            <Box className="p-10 md:p-24">
              <Center>
                <Congrats width="300" height="100" />
              </Center>
              <Box textAlign={"center"} marginTop={4}>
                <Text
                  lineHeight={1.5}
                  letterSpacing={2}
                  className="text-lg md:text-2xl"
                >
                  Congrats, you have not violated any speed limit in our
                  monitoring zones. We wish you safe travels as you cruiz to
                  your destination.
                </Text>
              </Box>
            </Box>
          </Wrapper>
        </Center>
      ) : (
        <Wrapper>
          <Box className="mt-10 mb-5 flex items-center justify-between">
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
            <Box
              className="relative"
              onMouseEnter={() => setShowFilter(true)}
              onMouseLeave={() => setShowFilter(false)}
            >
              {resizeFilter ? (
                <Box
                  padding={3}
                  border={"1px"}
                  borderRadius={"lg"}
                  borderColor={"#2F2A5E"}
                  as="button"
                >
                  <FaFilter className="text-[#2F2A5E]" />
                </Box>
              ) : (
                <ActionButton leftIcon={<IoMdAdd />} variant={"outline"}>
                  Add Filter
                </ActionButton>
              )}

              {showFilter && (
                <Box className="absolute right-0 top-11 bg-white w-40 rounded-md p-2 flex flex-col gap-0.5">
                  <Box
                    className="pl-1 py-1 cursor-pointer hover:bg-gray-200 hover:rounded-md"
                    onClick={() => sortByDateCreatedDescending(violations)}
                  >
                    Latest violations
                  </Box>
                  <Box
                    className="pl-1 py-1 cursor-pointer hover:bg-gray-200 hover:rounded-md"
                    onClick={() => sortByDateCreatedAscending(violations)}
                  >
                    Old violations
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Table
            headers={[
              "Vehicle Number plate",
              "Area of violation",
              "Vehicle Speed",
              "Time of violation",
            ]}
            footer={
              <TablePagination
                count={count}
                setPage={setPage}
                updatePerPage={updatePerPage}
                page={page}
                options={[25, 50, 100, 150]}
              />
            }
          >
            {slice
              ?.filter((violation) =>
                violation === null
                  ? violation
                  : violation.vehicleNumberPlate
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    violation.area
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
                    <td className="py-3 px-4">{data?.vehicleNumberPlate}</td>

                    <td className="py-3 px-4">{data?.area}</td>

                    <td className="py-3 px-4">{data?.speed}</td>

                    <td className="py-3 px-4">{fomartTime(data?.dateTime)}</td>
                  </tr>
                );
              })}
          </Table>
        </Wrapper>
      )}
    </UserLayout>
  );
};
