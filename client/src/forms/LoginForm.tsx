import MessageAlert from "@/components/custom/MessageAlert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Box, Heading, Input, Link, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoAlert } from "react-icons/go";
import * as y from 'yup';
import loginUser from "@/services/auth/login";
import { useNavigate } from "react-router-dom";

type formFields = {
    email: string,
    password: string
}
const passwordRules: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const schema = y.object({
    email: y.string().email("invalid email address").required("this field is required"),
    password: y.string().matches(passwordRules, { message: "password must contains at least 8 character including one uppercase,lowercase,digit and special character" }).required("this field is required")
})

const LoginForm: React.FC = () => {
    const { register, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm<formFields>({ resolver: yupResolver(schema) })
    const nav = useNavigate();
    const submitFnc: SubmitHandler<formFields> = async (data) => {
        const loginPromise = loginUser(data);
        const res = await loginPromise;

        if (res.status === 200) nav("/");
        else if (res.status === 400) setError('root', { message: "invalid email or password" });
        else {
            console.log(res);
            setError('root', { message: "something went wrong try again later" });
        }
        return loginPromise;
    }
    return (
        <Box as={'form'} w={"100%"} maxW={'450px'} borderRadius={4} p={8} onSubmit={handleSubmit(submitFnc)}>
            <Heading color={"black"} fontWeight={'bold'}>Welcome Back</Heading>
            <Text fontSize={"13px"} color={'GrayText'} ml={1}>Login to your account!</Text>
            {errors.root?.message && <MessageAlert colorPallet="red" icon={<GoAlert color="#EF4444" />} message={errors.root?.message} />
            }
            <Field invalid={errors.email?.message ? true : false} errorText={errors.email?.message} label="Email" color={"blue"} my={4}>
                <Input color={'black'} variant={'flushed'} colorPalette={"blue"} size={'lg'} placeholder="johnsmith@gmail.com" {...register("email")} />
            </Field>

            <Field invalid={errors.password?.message ? true : false} errorText={errors.password?.message} label="Password" color={"blue"} mt={4} mb={1}>
                <PasswordInput color={'black'} variant={'flushed'} colorPalette={"blue"} size={'lg'} type="password" {...register("password")} />
            </Field>

            <Link href="/forgot" color={'blue'} ml={1} mb={2}>forgot pasword?</Link>
            <Box w={'100%'} my={2} display={"flex"} alignItems={'center'} gap={2}>
                <Text color={"GrayText"}>don't you have an account?</Text>
                <Link href="/register" color={'blue'} fontWeight={'bold'}>Register here</Link>
            </Box>
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting} colorPalette={'blue'} variant={'solid'} size={'lg'} w={'full'} my={2}>Login</Button>
        </Box>
    );
}

export default LoginForm;