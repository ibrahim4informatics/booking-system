import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Max } from "class-validator"

export default class UpdateForgotPasswordOtpDto {
    @IsNotEmpty()
    @IsNumber()
    @Max(999999)
    otp: number

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 })
    newPassword: string
}