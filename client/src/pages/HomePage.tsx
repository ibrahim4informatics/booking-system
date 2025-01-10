import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import AnonymosLayout from './layouts/AnonymosLayout'

const HomePage: React.FC = () => {
  return (

    <AnonymosLayout>
      <Box w={'100%'} h={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Text color={'GrayText'} textAlign={'center'} fontSize={22}>Hello World!</Text>
      </Box>
    </AnonymosLayout>

  )
}

export default HomePage