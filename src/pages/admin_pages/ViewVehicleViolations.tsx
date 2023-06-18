import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Box, Text, Select } from "@chakra-ui/react";
import BreadCrumb from "../../components/general/BreadCrumb";
import { FaSkullCrossbones } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useVehicleViolations } from "../../hooks/useViolation";
import { fomartTime } from "../../utils/formatTime";
import Wrapper from "../../components/general/Wrapper";
import { ConfigProvider, Table } from "antd";
import { PieChart } from "../../components/charts/PieChart";
import CustomInput from "../../components/general/CustomInput";
import ActionButton from "../../components/general/ActionButton";

export const ViewVehicleViolations = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<number>();

  const path = useLocation()?.pathname.split("/");

  let vehicleNumberPlate: string = path[path?.length - 1];

  let reFormatVehicleNumberPlate: string = vehicleNumberPlate.replace(
    "%20",
    " "
  );

  const { violations, violationsByRegion, stateLoading, handleSearch } =
    useVehicleViolations(reFormatVehicleNumberPlate, monthFilter);

  const searchViolation = async (searchValue: string) => {
    await handleSearch(searchValue);
  };

  const clearSearch = async () => {
    setSearchValue("");
    await handleSearch();
  };

  const columns = [
    {
      title: "Area of Violation",
      dataIndex: "area",
    },
    {
      title: "Vehicle Speed",
      dataIndex: "speed",
      render: (text: any) => <div>{text} km/hr</div>,
    },
    {
      title: "Time of violation",
      dataIndex: "dateTime",
      sorter: (a: any, b: any) => a?.dateTime - b?.dateTime,
      render: (text: any) => <div>{fomartTime(text)}</div>,
    },
  ];

  return (
    <AdminLayout>
      <Box p={"3"} maxH={"91%"} overflowY={"scroll"} position={"relative"}>
        <BreadCrumb
          icon={<FaSkullCrossbones className="text-xl" />}
          title={"Speed violations/"}
          subtitle={reFormatVehicleNumberPlate}
        />
        <Box className="flex gap-2">
          <Wrapper>
            <Box
              className="mt-10 mb-5"
              display={"flex"}
              justifyItems={"center"}
              gap={4}
            >
              <CustomInput
                icon={<HiOutlineSearch className="text-xl" />}
                placeholder={"Input your search..."}
                handleChange={(e) => setSearchValue(e.target.value)}
                name={"search"}
                value={searchValue}
                type={"text"}
                width={"60%"}
                handleEyeClick={function (arg0: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <ActionButton
                variant="solid"
                handleClick={() => searchViolation(searchValue)}
              >
                Search
              </ActionButton>
              <ActionButton
                variant="outline"
                isDisabled={!searchValue}
                handleClick={clearSearch}
              >
                Clear
              </ActionButton>
            </Box>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#000",
                  colorPrimaryTextActive: "#000",
                  colorPrimaryText: "#808080",
                  colorPrimaryBg: "#fff",
                },
              }}
            >
              <div>
                <Table
                  rowKey={(data) => data.id}
                  loading={stateLoading}
                  pagination={{
                    defaultPageSize: 15,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "15", "20", "30"],
                  }}
                  columns={columns}
                  dataSource={violations}
                />
              </div>
            </ConfigProvider>
          </Wrapper>
          <Box className="w-2/5">
            <Wrapper>
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Select
                  border={1.0}
                  borderStyle="solid"
                  borderColor="#2F2A5E"
                  borderRadius="md"
                  color="#2F2A5E"
                  focusBorderColor="#2F2A5E"
                  width={28}
                  h={6}
                  gap="md"
                  bg="white"
                  onChange={(e) => setMonthFilter(parseInt(e.target.value) + 1)}
                >
                  <option>All</option>
                  {monthsOptions.map((monthsOption, index) => (
                    <option key={index} value={index}>
                      {monthsOption}
                    </option>
                  ))}
                </Select>
              </Box>
              <div className="h-[380px]">
                <Box className="text-center mt-4">
                  <Text className="font-bold text-2xl">Violated regions</Text>
                </Box>
                <PieChart
                  options={violationsByRegion.options}
                  data={violationsByRegion.data}
                />
              </div>
            </Wrapper>
          </Box>
        </Box>
      </Box>
    </AdminLayout>
  );
};

const monthsOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
