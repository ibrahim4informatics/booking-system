import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export default class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({minLength:8,minLowercase:1, minNumbers:1,minSymbols:1,minUppercase:1})
    password:string
}