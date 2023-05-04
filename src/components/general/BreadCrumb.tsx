import { Box, Center, HStack, Text } from '@chakra-ui/react';
import React from 'react';

type BreadCrumbProps = {
  title?: string;
  icon?: JSX.Element;
  subtitle?: String;
}

const BreadCrumb = ({ title, icon, subtitle }: BreadCrumbProps): JSX.Element => {
  return (
    <HStack gap={"1"} className='mb-4'>
      <Center p={"1"} className='bg-gray-200 rounded-full'>
        {icon}
      </Center>
      <Box className="flex items-end">
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          {title}
        </Text>
        &nbsp;
        {subtitle && (
          <Text className={'capitalize'} fontSize={"lg"}>
            {subtitle}
          </Text>
        )}
      </Box>
    </HStack>
  );
};

export default BreadCrumb;
