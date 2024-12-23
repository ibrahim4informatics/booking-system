import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class ForgotDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
}