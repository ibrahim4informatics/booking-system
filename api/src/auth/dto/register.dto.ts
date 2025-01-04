import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from "class-validator"

import { Roles } from "@prisma/client"

export default class RegisterDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(35)
    @MinLength(3)
    family_name: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(35)
    @MinLength(3)
    last_name: string

    @IsNotEmpty()
    @IsString()
    @Matches(/[1-2]\d\d\d-[0-1]\d-[0-3]\d/, { message: "date must be format yyyy-MM-dd" })
    date_of_birth: string
    @IsNotEmpty()
    @IsString()
    @MaxLength(12)
    @MinLength(12)
    phone_number: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 })
    password: string

    @IsOptional()
    @IsEnum(Roles)
    role: Roles
}





