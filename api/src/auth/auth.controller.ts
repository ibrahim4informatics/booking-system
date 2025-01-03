import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Res } from "@nestjs/common";
import LoginDto from "./dto/login.dto";
import { Request, Response } from "express";
import AuthService from "./auth.service";
import RegisterDto from "./dto/register.dto";
import ForgotPasswordDto from "./dto/forgot.dto";

@Controller("auth")
export class AdminAuthController {

    constructor(
        private readonly authService: AuthService
    ) { }
    //! admins auth routes


    @Post("login")
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() loginUserDto: LoginDto, @Res({passthrough:true}) res: Response) {
        return this.authService.loginUser(loginUserDto, res);
    }

    @Post("register")
    registerClient(@Body() registerDto: RegisterDto) {
        return this.authService.registerUser(registerDto);
    }

    @Post("forgot")
    @HttpCode(HttpStatus.OK)
    sendForgotOtp(@Body() forgotPasswordDto:ForgotPasswordDto, @Res({passthrough:true}) res:Response){
        return this.authService.sendForgotPasswordOtp(forgotPasswordDto,res);
    }


    @Get("forgot")
    verifyForgotPassword(@Req() req:Request){
        return this.authService.checkForgotPasswordOtp(req);
    }


}