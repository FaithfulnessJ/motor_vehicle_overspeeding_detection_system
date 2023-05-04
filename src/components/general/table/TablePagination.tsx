import { Box, HStack, Select, Text } from "@chakra-ui/react";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";

type TablePaginationType = {
  count: number;
  setPage: (arg: number) => void;
  updatePerPage: (arg: number) => void;
  page: number;
  options: [number, number, number, number];
};

const TablePagination = ({
  count,
  setPage,
  updatePerPage,
  page,
  options,
}: TablePaginationType): JSX.Element => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="full"
      color=""
      px={0}
      gap={1.5}
    >
      <HStack spacing={5}>
        <Text fontWeight="normal" line-height="short">
          Show rows per page
        </Text>
        <Select
          border={1.0}
          borderStyle="solid"
          borderColor="#2F2A5E"
          borderRadius="md"
          color="#2F2A5E"
          width={20}
          h={7}
          gap="xs"
          bg="white"
          onChange={(e) => updatePerPage(parseInt(e.target.value))}
        >
          {options.map((pageOption, i) => (
            <option key={i} value={pageOption}>
              {pageOption}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack spacing={5}>
        <Text color="black">
          {count} of {page}
        </Text>
        <HStack spacing={3}>
          {page <= 1 ? (
            <Box
              fontSize="2xl"
              color="gray.300"
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <RxDoubleArrowLeft />
            </Box>
          ) : (
            <Box
              as="button"
              fontSize="2xl"
              color="#2F2A5E"
              _active={{
                transform: "scale(0.98)",
              }}
              onClick={() => setPage(page - 1)}
            >
              <RxDoubleArrowLeft />
            </Box>
          )}

          {page >= count ? (
            <Box
              fontSize="2xl"
              color="gray.300"
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <RxDoubleArrowRight />
            </Box>
          ) : (
            <Box
              as="button"
              fontSize="2xl"
              color="#2F2A5E"
              _active={{
                transform: "scale(0.98)",
              }}
              onClick={() => setPage(page + 1)}
            >
              <RxDoubleArrowRight />
            </Box>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};

export default TablePagination;
