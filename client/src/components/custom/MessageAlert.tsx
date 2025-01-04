import { Box, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
    icon:React.ReactNode,
    message:string,
    colorPallet:string
}

const MessageAlert:React.FC<Props> = ({colorPallet,icon,message})=>{
    return (
        <Box borderRadius={4} my={2} w={"100%"} p={2} display={'flex'} alignItems={'center'} gap={2} bg={`${colorPallet}.200`} >
            {icon}
            <Text color={`${colorPallet}.500`}>{message}</Text>
        </Box>
    )
}

export default MessageAlert