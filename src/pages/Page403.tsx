import { Box, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ActionButton from '../components/general/ActionButton';

const Page403 = (): JSX.Element => {
    return (
        <>
            <Box className='bg-gradient-to-b from-primary_color to-white h-screen flex justify-center items-center'>
                <Box className='bg-gray-100 p-20'>
                    <Box className='text-center'>
                        <Heading as='h1' size='4xl' className='mb-2'>403</Heading>
                        <Heading as='h3' size='xl' className='uppercase mb-4'>Opps! Access forbidden</Heading>
                        <Text>You do not have permission to access this page</Text>
                    </Box>
                    <Box className='flex justify-center items-center mt-5'>
                        <ActionButton variant={'solid'}> 
                            <Link to='/' className='uppercase'>
                                Return to home
                            </Link>
                        </ActionButton>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Page403