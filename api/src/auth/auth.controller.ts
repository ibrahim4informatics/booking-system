import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Res } from "@nestjs/common";
import LoginDto from "./dto/login.dto";
import { Request, Response } from "express";
import AuthService from "./auth.service";
import RegisterDto from "./dto/register.dto";
import ForgotPasswordDto from "./dto/forgot.dto";
import UpdateForgotPasswordOtpDto from "./dto/updatePasswordOtp.dto";

@Controller("auth/admin")
export class AdminAuthController {

    constructor(
        private readonly authService: AuthService
    ) { }
    //! admins auth routes


    @Post("login")
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() loginUserDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.loginUser(loginUserDto, 'admin', res);
    }

    @Post("register")
    registerClient(@Body() registerDto: RegisterDto) {
        return this.authService.registerUser(registerDto, 'admin');
    }

    @Post("forgot")
    @HttpCode(HttpStatus.OK)
    sendForgotOtp(@Body() forgotPasswordDto: ForgotPasswordDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.sendForgotPasswordOtp(forgotPasswordDto, 'admin', res);
    }

    @Get("forgot")
    verifyForgotPassword(@Req() req: Request) {
        return this.authService.checkForgotPasswordOtp(req);
    }

    @Patch("forgot")
    resetPassword(@Body() updateForgotPasswordOtpDto: UpdateForgotPasswordOtpDto, @Req() req: Request) {
        return this.authService.updatePassword(updateForgotPasswordOtpDto, req, 'admin');
    }



}


@Controller("auth/client")
export class ClientAuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() loginUserDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.loginUser(loginUserDto, 'client', res);
    }

    @Post('register')

    registerUser(@Body() registerDto: RegisterDto) {
        return this.authService.registerUser(registerDto, 'client');
    }

    //? send verification code to user email
    @Post("forgot")
    @HttpCode(HttpStatus.OK)
    sendForgotOtp(@Body() forgotPasswordDto: ForgotPasswordDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.sendForgotPasswordOtp(forgotPasswordDto, 'client', res);
    }

    //? cehck the frogot request validity
    @Get("forgot")
    verifyForgotPassword(@Req() req: Request) {
        return this.authService.checkForgotPasswordOtp(req);
    }

    //? change password for valid forgot request
    @Patch("forgot")
    resetPassword(@Body() updateForgotPasswordOtpDto: UpdateForgotPasswordOtpDto, @Req() req: Request) {
        return this.authService.updatePassword(updateForgotPasswordOtpDto, req, 'client')
    }
}