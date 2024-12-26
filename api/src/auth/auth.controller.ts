import { Body, Controller, HttpCode, HttpStatus, Post, Redirect, Res } from "@nestjs/common";
import LoginDto from "./dto/login.dto";
import { Response } from "express";
import AuthService from "./auth.service";
import RegisterDto from "./dto/register.dto";
import ForgotPasswordDto from "./dto/forgot.dto";

@Controller("auth/admin")
export class AdminAuthController {

    constructor(
        private readonly authService: AuthService
    ) { }
    //! admins auth routes


    @Post("login")
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() loginUserDto: LoginDto, @Res({passthrough:true}) res: Response) {
        return this.authService.loginUser(loginUserDto, 'admin', res);
    }

    @Post("register")
    registerClient(@Body() registerDto: RegisterDto) {
        return this.authService.registerUser(registerDto, 'admin');
    }

    @Post("forgot/send")
    sendForgotOtp(@Body() forgotPasswordDto:ForgotPasswordDto){
        return this.authService.sendForgotPasswordOtp(forgotPasswordDto, 'admin');
    }


}


@Controller("auth/client")
export class ClientAuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() loginUserDto: LoginDto, @Res({passthrough:true}) res: Response) {
        return this.authService.loginUser(loginUserDto, 'client', res);
    }

    @Post('register')

    registerUser(@Body() registerDto: RegisterDto) {
        return this.authService.registerUser(registerDto, 'client');
    }

    @Post("forgot/send")
    sendForgotOtp(@Body() forgotPasswordDto:ForgotPasswordDto){
        return this.authService.sendForgotPasswordOtp(forgotPasswordDto, 'client');
    }
}