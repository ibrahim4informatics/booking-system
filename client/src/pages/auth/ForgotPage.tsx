import { Button } from "@/components/ui/button";
import RequestResetPasswordForm from "@/forms/RequestResetPasswordForm";
import ResetPasswordForm from "@/forms/ResetPasswordForm";
import { Box, Heading, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const ForgotPasswordPage: React.FC = () => {
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);


    return (
        <Box px={4} w={'100%'} h={'100vh'} gap={4} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
            <Box w={'100%'} maxW={450}>
                <Heading fontSize={24}>Forgot your password?</Heading>
                <Text fontSize={14} color={'GrayText'}>here you can reset the password</Text>
            </Box>
            <RequestResetPasswordForm setIsCodeSent={setIsCodeSent} isCodesent={isCodeSent} />
            {isCodeSent && <ResetPasswordForm setIsCodeSent={setIsCodeSent} />}



        </Box>
    )
}

export default ForgotPasswordPage