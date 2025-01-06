import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useRouteError } from "react-router-dom"

const ErrorPage: React.FC = () => {
    const errors:any = useRouteError();
    return (
        <Box w={'100%'} h={'100vh'} display={'flex'} flexDir={'column'} alignItems={"center"} justifyContent={"center"}>
            <Heading color={'red.500'} fontSize={45} my={2}>Oops!</Heading>
            <Text my={4} textAlign={'center'} color={'GrayText'}>{errors.status} |{errors.statusText}</Text>
        </Box>
    )
}

export default ErrorPage