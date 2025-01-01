import React, { ChangeEvent, useState } from "react";
import { Box, Heading, Input, Link } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from '@/components/ui/button'
import LoginForm from "@/forms/LoginForm";
const LoginPage: React.FC = () => {
    const [credentials, setCredentials] = useState<{ email: string, password: string }>({ email: "", password: "" });

    const hundleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    return (

        <Box width={"100%"} h={"100dvh"} bg={"white"} display={'flex'} alignItems={'center'} justifyContent={"center"}>

            <LoginForm/>

        </Box>

    )
}

export default LoginPage;