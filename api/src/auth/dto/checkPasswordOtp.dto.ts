import { IsEmail, IsNotEmpty, IsNumber, IsString, Max } from "class-validator"

export default class CheckForgotPasswordOtpDto {
    @IsNotEmpty()
    @IsNumber()
    @Max(999999)
    otp:number
}