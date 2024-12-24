import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import LoginDto from "./dto/login.dto";
import { Response } from "express";
import AuthService from "./auth.service";
import RegisterDto from "./dto/register.dto";

@Controller("auth/admin")
export  class AdminAuthController {
    
    constructor (
        private readonly authService:AuthService
    ){}
    //! admins auth routes


    @Post()
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() loginUserDto:LoginDto, @Res() res:Response){
        return this.authService.loginUser(loginUserDto,'admin', res);
    }

    
}


@Controller("auth/client")
export class ClientAuthController {

    constructor (
        private readonly authService:AuthService
    ){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() loginUserDto:LoginDto, @Res() res:Response){
        return this.authService.loginUser(loginUserDto,'client', res);
    }

    @Post('register')
    registerUser(@Body() registerDto:RegisterDto, @Res() res:Response){
        return this.authService.registerUser(registerDto,'admin');
    }
}