import { Box, Center, Text } from "@chakra-ui/react";

const Footer = (): JSX.Element => {
    let datenow = new Date();
  return (
    <Box className="bg-[#2F2A5E] text-white py-8 w-full fixed bottom-0 left-0 z-[99]">
      <Center>
        <Text fontSize={"sm"}>&copy;{datenow.getFullYear()} Vehicle monitoring LTD. All right reserved</Text>
      </Center>
    </Box>
  );
};

export default Footer;
