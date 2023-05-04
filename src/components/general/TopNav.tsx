import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import Avatar from './Avatar';

type TopNavProps = {
    toggleSideBar: () => void;
}

const TopNav = ({ toggleSideBar }: TopNavProps): JSX.Element => {
    return (
        <>
            <HStack h={"60px"} justifyContent={"space-between"} className='bg-gray-100'>
                <button
                    className={"hover:bg-zinc-100 p-1 rounded-md focus:outline-none"}
                    onClick={toggleSideBar}
                >
                    <BiMenuAltLeft className="text-3xl" />
                </button>

                {/* nav items */}
                <HStack px={"3"} gap={"1"}>
                    <HStack gap={"1"}>
                        <Avatar text={"A"} />

                        <Text fontSize={'lg'} fontWeight={"bold"}>
                            Admin
                        </Text>
                    </HStack>
                </HStack>
            </HStack>
        </>
    );
};

export default TopNav;

const Badge = () => (
    <Box
        bg={"primary_red"}
        borderRadius={"full"}
        position={"absolute"}
        top={"1"}
        right={"2"}
        h={"3.5"}
        w={"3.5"}
        borderWidth={"2px"}
        borderColor={"white"}
    />
);