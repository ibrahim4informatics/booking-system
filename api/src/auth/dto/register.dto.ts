import { IsEmail, IsInt, IsNotEmpty, IsPositive, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export   default class RegisterDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(35)
    @MinLength(3)
    family_name:string
    @IsNotEmpty()
    @IsString()
    @MaxLength(35)
    @MinLength(3)
    last_name:string
    
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    age: number

    @IsNotEmpty()
    @IsString()
    @MaxLength(12)
    @MinLength(12)
    phone_number:string
    
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({minLength:8, minLowercase:1,minNumbers:1,minSymbols:1, minUppercase:1})
    password:string
    
}





