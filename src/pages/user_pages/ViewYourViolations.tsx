import { Box, Center, Text } from "@chakra-ui/react";
import { useState } from "react";
import UserLayout from "../../components/UserLayout";
import Wrapper from "../../components/general/Wrapper";
import { ConfigProvider, Table } from "antd";
import CustomInput from "../../components/general/CustomInput";
import { useMyViolation } from "../../hooks/useViolation";
import { HiOutlineSearch } from "react-icons/hi";
import { useUserStore } from "../../utils/zustand/Store";
import { Congrats } from "../../assets/icons/Congrats";
import { fomartTime } from "../../utils/formatTime";

export const ViewYourViolations = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");

  const user = useUserStore((state: any) => state.user);

  const { stateLoading, filteredViolations } = useMyViolation(
    user.uid,
    searchValue
  );

  const columns = [
    {
      title: "Vehicle Number plate",
      dataIndex: "vehicleNumberPlate",
    },
    {
      title: "Area of violation",
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
      render: (text: any) => (
        <div>{fomartTime(text)}</div>
      ),
    },
  ];

  return (
    <UserLayout>
      {filteredViolations.length === 0 ? (
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
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#000",
                colorPrimaryTextActive: "#000",
                colorPrimaryText: "#808080",
                // colorBgBase: "#19411D",
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
                // rowSelection={{
                //   type: "checkbox",
                //   ...rowSelection,
                // }}
                columns={columns}
                dataSource={filteredViolations}
              />
            </div>
          </ConfigProvider>
        </Wrapper>
      )}
    </UserLayout>
  );
};
