import RegisterForm from "@/forms/RegisterForm";
import { Box } from "@chakra-ui/react";
import React from "react";

const RegisterPage: React.FC = () => {
    return (
        <Box w={"100%"} h={"100dvh"} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <RegisterForm />
        </Box>
    )
}

export default RegisterPage;