import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Box, Button, Input } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm, SubmitHandler, Control } from "react-hook-form";
import * as y from 'yup';

const passwordRules: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const schema = y.object({
    otp: y.number().required('this field is required'),
    newPassword: y.string().required("this field is required").matches(passwordRules, { message: "password must contains at least 8 character including one uppercase,lowercase,digit and special character" })
})

type formFields = {
    otp: number,
    newPassword: string
}

type Props = {
    setIsCodeSent: React.Dispatch<React.SetStateAction<boolean>>
}

const ResetPasswordForm: React.FC<Props> = ({ setIsCodeSent }) => {
    const { register, formState: { errors }, setError } = useForm<formFields>({ resolver: yupResolver(schema) });
    const submitFnc: SubmitHandler<formFields> = () => { }
    return (
        <Box w={'100%'} maxW={450}>

            <Field my={4} label="Otp" required invalid={errors.otp?.message ? true : false} errorText={errors.otp?.message}>
                <Input variant={'flushed'} colorPalette={'blue'} {...register("otp")} />
            </Field>

            <Field my={4} label="New password" required invalid={errors.otp?.message ? true : false} errorText={errors.otp?.message}>
                <PasswordInput colorPalette={'blue'} variant={'flushed'} type='password' {...register("newPassword")} />
            </Field>

            <Box w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Button onClick={() => setIsCodeSent(false)} type='submit' colorPalette={'gray'} size={'lg'}>Change Email</Button>
                <Button type='submit' colorPalette={'blue'} size={'lg'}>Reset</Button>
            </Box>

        </Box>
    )
}

export default ResetPasswordForm