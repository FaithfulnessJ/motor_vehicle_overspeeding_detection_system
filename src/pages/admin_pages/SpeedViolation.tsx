import { Box } from "@chakra-ui/react";
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import BreadCrumb from "../../components/general/BreadCrumb";
import { FaSkullCrossbones } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import Wrapper from "../../components/general/Wrapper";
import CustomInput from "../../components/general/CustomInput";
import { ConfigProvider, Table } from "antd";
import { useViolation } from "../../hooks/useViolation";
import { fomartTime } from "../../utils/formatTime";

export const SpeedViolation = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");

  const { stateLoading, filteredViolations } = useViolation(searchValue);

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
      render: (text:any) => <div>{text} km/hr</div>
    },
    {
      title: "Time of violation",
      dataIndex: "dateTime",
      sorter: (a: any, b: any) => a?.dateTime - b?.dateTime,
      render: (text:any) => <div>{fomartTime(text)}</div>
    },
  ];

  return (
    <AdminLayout>
      <Box p={"3"} maxH={"91%"} overflowY={"scroll"} position={"relative"}>
        <BreadCrumb
          icon={<FaSkullCrossbones className="text-xl" />}
          title={"Speed violations"}
        />
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
      </Box>
    </AdminLayout>
  );
}