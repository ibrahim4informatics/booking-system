import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import LoginDto from "./dto/login.dto";
import PrismaService from "src/prisma/prisma.service";
import ArgonService from "src/argon/argon,service";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { Response, Request } from "express";
import { User } from "@prisma/client";
import RegisterDto from "./dto/register.dto";
import ForgotPasswordDto from "./dto/forgot.dto";
import NodemailerService from "src/nodemailer/nodemailer.service";
import UpdateForgotPasswordOtpDto from "./dto/updatePasswordOtp.dto";

@Injectable()
export default class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly argonService: ArgonService,
        private readonly jwtService: JwtService,
        private readonly nodemailer: NodemailerService,
    ) { }


    otpEmailGenerator(otpCode: number): string {
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Forgot Password Verification Code</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f9;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header img {
                        max-width: 150px;
                    }
                    .header h1 {
                        font-size: 24px;
                        color: #007BFF;
                    }
                    .content {
                        text-align: center;
                    }
                    .content p {
                        font-size: 16px;
                        line-height: 1.6;
                        margin: 15px 0;
                    }
                    .code {
                        display: inline-block;
                        font-size: 20px;
                        color: #007BFF;
                        background-color: #f4f8ff;
                        padding: 10px 20px;
                        border: 1px solid #007BFF;
                        border-radius: 4px;
                        letter-spacing: 2px;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-size: 12px;
                        color: #888;
                    }
                    .footer a {
                        color: #007BFF;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <img src="https://via.placeholder.com/150" alt="Booking System Logo">
                        <h1>Reset Your Password</h1>
                    </div>
                    <div class="content">
                        <p>Hello,</p>
                        <p>We received a request to reset your password for your Booking System account. Use the verification code below to complete the process:</p>
                        <div class="code">123456</div>
                        <p>If you did not request a password reset, please ignore this email or contact our support team if you have concerns.</p>
                        <p>Thank you,<br>The Booking System Team</p>
                    </div>
                    <div class="footer">
                        <p>This email was sent by IBDEV Booking System. If you have any questions, vi<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Forgot Password Verification Code</title>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f4f4f9;
                                        margin: 0;
                                        padding: 0;
                                        color: #333;
                                    }
                                    .email-container {
                                        max-width: 600px;
                                        margin: 20px auto;
                                        background-color: #ffffff;
                                        padding: 20px;
                                        border-radius: 8px;
                                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    }
                                    .header {
                                        text-align: center;
                                        margin-bottom: 20px;
                                    }
                                    .header img {
                                        max-width: 150px;
                                    }
                                    .header h1 {
                                        font-size: 24px;
                                        color: #007BFF;
                                    }
                                    .content {
                                        text-align: center;
                                    }
                                    .content p {
                                        font-size: 16px;
                                        line-height: 1.6;
                                        margin: 15px 0;
                                    }
                                    .code {
                                        display: inline-block;
                                        font-size: 20px;
                                        color: #007BFF;
                                        background-color: #f4f8ff;
                                        padding: 10px 20px;
                                        border: 1px solid #007BFF;
                                        border-radius: 4px;
                                        letter-spacing: 2px;
                                        margin: 20px 0;
                                    }
                                    .footer {
                                        text-align: center;
                                        margin-top: 20px;
                                        font-size: 12px;
                                        color: #888;
                                    }
                                    .footer a {
                                        color: #007BFF;
                                        text-decoration: none;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="header">
                                        <img src="https://via.placeholder.com/150" alt="Booking System Logo">
                                        <h1>Reset Your Password</h1>
                                    </div>
                                    <div class="content">
                                        <p>Hello,</p>
                                        <p>We received a request to reset your password for your Booking System account. Use the verification code below to complete the process:</p>
                                        <div class="code">${otpCode}</div>
                                        <p>If you did not request a password reset, please ignore this email or contact our support team if you have concerns.</p>
                                        <p>Thank you,<br>The Booking System Team</p>
                                    </div>
                                    <div class="footer">
                                        <p>This email was sent by Booking System. If you have any questions, visit our <a href="#">Support Center</a>.</p>
                                        <p>&copy; 2024 Booking System. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                            </html>sit our <a href="#">Support Center</a>.</p>
                        <p>&copy; 2024 Booking System. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>
        `
    }

    userCodeGenerator(phone: string, email: string) {
        const [username, emailProvider] = email.split('@');
        return `${username}-${phone}`;

    }
    async generateToken(payload: {}, secret: string, options?: JwtSignOptions): Promise<string | null> {
        try {
            const token = await this.jwtService.signAsync(payload, { secret, ...options });
            return token;
        }

        catch (err) {
            console.log(`error is ${err}`);
            return null;
        }
    }

    async verifyToken(token: string, secret: string): Promise<{ email: string } | false> {

        try {

            const payload = await this.jwtService.verifyAsync(token, { secret });
            return payload as { email: string };

        }
        catch (err) {
            console.log(`Error while verifying token: ${new Error(err)}`)
            return false;

        }
    }
    async loginUser(loginUserDto: LoginDto, res: Response) {
        const { email, password } = loginUserDto;


        const user: User | null = await this.prismaService.user.findUnique({ where: { email } });
        //?: check user existence
        if (!user) throw new UnauthorizedException("invalid email or password");

        //?: check password validity
        const isCorrectPassword: boolean = await this.argonService.compare(user?.password, password);
        if (!isCorrectPassword) throw new UnauthorizedException("invalid email or password");

        //?: generate tokens for admin users
        let accessToken: string, refreshToken: string;
        const payload: Record<string, string> = {
            id: user.id,
            role: user.role
        }

        if (user.role === 'admin') {
            accessToken = await this.generateToken(payload, process.env.AATS, { expiresIn: '5m' });
            refreshToken = await this.generateToken(payload, process.env.ARTS, { expiresIn: "3d" });
        }

        //?: generate tokens for client users
        else {
            accessToken = await this.generateToken(payload, process.env.CATS, { expiresIn: '15m' });
            refreshToken = await this.generateToken(payload, process.env.CRTS, { expiresIn: "7d" });
        }

        //?: assign them to http only cookies
        res.cookie("access", accessToken, { httpOnly: true, secure: process.env.MODE === "production", sameSite: 'strict' });
        res.cookie("refresh", refreshToken, { httpOnly: true, secure: process.env.MODE === "production", sameSite: 'strict' });
        return {
            msg: "user login success"
        }
    }
    async registerUser(registerUserDto: RegisterDto) {

        const { email, password, family_name, last_name, age, phone_number, role } = registerUserDto

        const user = await this.prismaService.user.findUnique({ where: { email } });

        if (user) throw new BadRequestException("the email is used by another account");




        try {
            await this.prismaService.user.create({
                data: {
                    email, family_name, last_name, age, phone_number,
                    password: await this.argonService.hashValue(password),
                    code: this.userCodeGenerator(phone_number, email),
                    role
                }
            });
        }
        catch (err) {
            console.log(`error is ${new Error(err)}`);
            throw new InternalServerErrorException("Can not register user now!")
        }



        return {
            msg: "user creation success"
        }
    }


    //todo: forgot password
    async sendForgotPasswordOtp(
        forgotPasswordDto: ForgotPasswordDto, res: Response
    ) {

        const { email } = forgotPasswordDto;
        const user: User | null = await this.prismaService.user.findUnique({ where: { email } });


        if (!user) throw new BadRequestException("email is not valid");
        const otp: number = Math.ceil(Math.random() * 1000000);
        await this.prismaService.user.update({ where: { email }, data: { otp } });


        const emailSent: boolean = await this.nodemailer.sendMail({
            from: `IBDEV Booking System<${process.env.USER}>`,
            to: email,
            html: this.otpEmailGenerator(otp),
            subject: "Password Reset Verification"
        })

        if (!emailSent) throw new InternalServerErrorException("can not send verification email!");
        const token = await this.generateToken({ email }, process.env.FPOTS, { expiresIn: '15m' });
        res.cookie("forgot", token, { httpOnly: true, sameSite: "strict", secure: process.env.MODE === 'production', maxAge: 1000 * 3600 * 15 });
        return {
            msg: "verification code sent to your email!",
        }

    }

    async checkForgotPasswordOtp(req: Request) {
        const { forgot } = req.cookies

        if (!forgot) throw new ForbiddenException("invalid reset password request");
        const verifyToken = await this.verifyToken(forgot, process.env.FPOTS);
        if (!verifyToken) throw new ForbiddenException("invalid reset password request");
        return { msg: "reset password valid" };

    }

    async updatePassword(updatePasswordDto: UpdateForgotPasswordOtpDto, req: Request,) {
        const { forgot } = req.cookies;
        const { otp, email, newPassword } = updatePasswordDto

        if (!forgot) throw new ForbiddenException("invalid request");
        const payload = await this.verifyToken(forgot, process.env.FPOTS);
        if (!payload) throw new ForbiddenException("invalid request for resetting password");
        if (payload.email !== email) {
            await this.prismaService.user.update({ where: { email }, data: { otp: null } });
            throw new ForbiddenException("reset request missmatch send another verification code!");
        }
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException("invalid informations");
        if (user.otp !== otp) throw new ForbiddenException("incorrect or expired verification code");
        await this.prismaService.user.update({ where: { email }, data: { otp: null, password: await this.argonService.hashValue(newPassword) } })

        return {
            msg: "password reset success!"
        }
    }
}