import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class ForgotPasswordDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
}