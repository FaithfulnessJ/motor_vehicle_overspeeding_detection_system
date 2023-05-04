import { Box } from "@chakra-ui/react";
import { useState, useLayoutEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import BreadCrumb from "../../components/general/BreadCrumb";
import { FaSkullCrossbones } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import Wrapper from "../../components/general/Wrapper";
import CustomInput from "../../components/general/CustomInput";
import Table from "../../components/general/table/Table";
import TablePagination from "../../components/general/table/TablePagination";
import { useTable } from "../../hooks/useTable";
import { useViolation } from "../../hooks/useViolation";
import { IoMdAdd } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import ActionButton from "../../components/general/ActionButton";
import { useScreenListener } from "../../hooks/useScreenListener";
import { fomartTime } from "../../utils/formatTime";

export const SpeedViolation = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [resizeFilter, setResizeFilter] = useState<boolean>(false);

  const { violations } = useViolation();
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
    <AdminLayout>
      <Box p={"3"} maxH={"91%"} overflowY={"scroll"} position={"relative"}>
        <BreadCrumb
          icon={<FaSkullCrossbones className="text-xl" />}
          title={"Speed violations"}
        />
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
              "Owner phone number",
              "Vehicle No. plate",
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
                  : violation.area
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    violation.vehicleNumberPlate
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    violation.phoneNumber
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
                    <td className="capitalize py-3 px-4">
                      {data?.phoneNumber}
                    </td>

                    <td className="py-3 px-4">{data?.vehicleNumberPlate}</td>

                    <td className="py-3 px-4">{data?.area}</td>

                    <td className="py-3 px-4">{data?.speed}</td>

                    <td className="py-3 px-4">{fomartTime(data?.dateTime)}</td>
                  </tr>
                );
              })}
          </Table>
        </Wrapper>
      </Box>
    </AdminLayout>
  );
};
