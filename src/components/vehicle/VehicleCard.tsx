import { Box, Text } from "@chakra-ui/react";
import { IoCarSport } from "react-icons/io5";

type VehicleProps = {
  text: string;
  no: number;
  textColor: string;
  bg: string;
};

const VehicleCard = ({ text, no, textColor, bg }: VehicleProps): JSX.Element => {
  return (
    <Box
      className={bg}
      display={"flex"}
      justifyContent={"space-between"}
      borderRadius={"xl"}
      paddingX={3}
      paddingY={5}
      width={200}
    >
      <Box>
        <Text fontSize={"sm"} color={"gray.500"}>
          {text}
        </Text>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          {no}
        </Text>
      </Box>
      <Box>
        <IoCarSport className={`text-4xl p-1 ${textColor} rounded-sm`} />
      </Box>
    </Box>
  );
};

export default VehicleCard;
