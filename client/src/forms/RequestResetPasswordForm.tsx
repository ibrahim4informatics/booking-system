import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Box, Input, Text } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { AiOutlineSend } from 'react-icons/ai'
import { CiCircleCheck } from 'react-icons/ci'
import { InputGroup } from '@/components/ui/input-group';
type formFileds = {
    email: string
}
type Props = {
    setIsCodeSent: React.Dispatch<React.SetStateAction<boolean>>
    isCodesent: boolean
}
const schema = y.object({
    email: y.string().required("this field is required").email("email is not valid")
})

const RequestResetPasswordForm: React.FC<Props> = ({ setIsCodeSent, isCodesent }) => {

    const [time, setTime] = useState(0);

    useEffect(() => {
        if (time === 0) {
            return;
        };
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [time]);

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({ resolver: yupResolver(schema) });
    const submitFnc: SubmitHandler<formFileds> = async (data) => {
        return new Promise((res, rej) => {
            console.log("sending email");

            setInterval(() => {
                console.log("email sent");
                res(1);
            }, 5000)
            setIsCodeSent(true);
            setTime(65)
        })
    }
    return (
        <Box as={'form'} onSubmit={handleSubmit(submitFnc)} w={'100%'} maxW={450}>
            <Box>
                <Field disabled={isCodesent || isSubmitting} my={4} label="Email" required invalid={(errors.email?.message) ? true : false}>
                    <InputGroup
                        w={'100%'}
                        endElement={
                            <Button type='submit' variant={'plain'} loading={isSubmitting} colorPalette={isCodesent ? 'green' : 'blue'}>{!isCodesent ? <AiOutlineSend /> : <CiCircleCheck />}</Button>
                        }
                    >
                        <Input variant={'flushed'} placeholder='ex:saraggh@gmail.com' type='email' colorPalette={'blue'} {...register('email')} />

                    </InputGroup>
                </Field>

                {isCodesent && <Box w={'100%'} maxW={450} my={2} display={'flex'} alignItems={'center'}>
                    <Text color={'GrayText'} flex={1}>{time > 0 ? `resend after ${time}` : `if the verification code make a resend`}</Text>
                    <Button disabled={time > 0} colorPalette={'blue'} variant={'plain'}>resend</Button>
                </Box>}

            </Box>
        </Box >
    )
}

export default RequestResetPasswordForm