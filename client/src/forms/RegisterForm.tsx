import React from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as y from "yup";
import { Box, Heading, Input, Link, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { GoAlert } from "react-icons/go";
import registerFnc from "@/services/auth/register";
import MessageAlert from "@/components/custom/MessageAlert";
import { useNavigate } from "react-router-dom";


type formFields = {
    email: string,
    password: string,
    phone_number: string,
    last_name: string,
    family_name: string,
    date_of_birth: Date

}
const passwordRules: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const schema = y.object({
    email: y.string().email("invalid email provided").required("this field is required"),
    password: y.string().matches(passwordRules, { message: "password must contains at least 8 character including one uppercase,lowercase,digit and special character" }).required("this field is required"),
    phone_number: y.string().length(12, "phone number has 12 digit length").required(),
    last_name: y.string().required("this field is required"),
    family_name: y.string().required("this field is required"),
    date_of_birth: y.date().required("this field is required")
})
const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const { register, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm<formFields>({ resolver: yupResolver(schema) })
    const submitFnc: SubmitHandler<formFields> = async (data: formFields) => {
        const registerPromise = registerFnc(data);
        const response = await registerPromise;
        if (response.status === 400) {
            const errorMessage = response.response.data.message;

            switch (errorMessage) {
                case "the email is used by another account":
                    setError('email', { message: errorMessage })
                    break;
                case "the phone is used by another account":
                    setError('phone_number', { message: errorMessage });
                    break;
                default:
                    setError("root", { message: "please check all your fields there is something wrong!" })
            }
        }

        else if (response.status === 500) {
            setError('root', { message: "something went wrong please try again later!" });
        }

        else if (response.status === 201) navigate("/login")
        return registerPromise;
    }

    return (
        <Box as={"form"} w={"100%"} maxW={"450px"} onSubmit={handleSubmit(submitFnc)} mt={4} p={4}>
            <Heading fontSize={22}>Hello There!</Heading>
            {
                (errors.root?.message) ? (<MessageAlert icon={<GoAlert color="#EF4444" size={20} />} message={errors.root.message} colorPallet="red" />
                ) : (<Text color={"GrayText"} fontSize={14}>welcome to the best booking plateform,create an acount and start browsing</Text>
                )
            }

            <Box w={'full'} display={'flex'} alignItems={'center'} gap={2}>
                <Field errorText={errors.family_name?.message} my={4} label="Family Name:" required invalid={errors.family_name?.message ? true : false} >
                    <Input placeholder="ex:Smith." type="text" variant={'flushed'} colorPalette={'blue'} {...register("family_name")} />
                </Field>

                <Field errorText={errors.last_name?.message} my={4} label="Last Name:" required invalid={errors.last_name?.message ? true : false} >
                    <Input placeholder="ex:Sara." type="text" variant={'flushed'} colorPalette={'blue'} {...register("last_name")} />
                </Field>
            </Box>

            <Box w={'full'} display={'flex'} alignItems={'center'} gap={2}>
                <Field errorText={errors.phone_number?.message} flex={1} my={4} label="Phone:" required invalid={errors.phone_number?.message ? true : false} >
                    <Input placeholder="ex:213655445435" type="text" variant={'flushed'} colorPalette={'blue'} {...register("phone_number")} />
                </Field>

                <Field errorText={errors.date_of_birth?.message} w={120} my={4} label="Date of birth:" required invalid={errors.date_of_birth?.message ? true : false} >
                    <Input placeholder="ex:Sara." type="date" variant={'flushed'} colorPalette={'blue'} {...register("date_of_birth")} />
                </Field>
            </Box>

            <Field my={4} label="Email:" required invalid={errors.email?.message ? true : false} errorText={errors.email?.message}>
                <Input placeholder="ex:sarasmith@gmail.com" type="email" variant={'flushed'} colorPalette={'blue'} {...register("email")} />
            </Field>

            <Field my={4} label="Password:" required invalid={errors.password?.message ? true : false} errorText={errors.password?.message} >
                <PasswordInput type="text" variant={'flushed'} colorPalette={'blue'} {...register("password")} />
            </Field>
            <Box w={"full"} display={'flex'} alignItems={'center'} gap={2}>
                <Text color={'GrayText'}>already have an acount?</Text>
                <Link color={'blue'} fontWeight={'bold'} my={2} href="/login">Login here</Link>
            </Box>
            <Button type="submit" loading={isSubmitting} colorPalette={'blue'} size={'lg'} w={'full'} >Create</Button>
        </Box>
    )
}

export default RegisterForm;