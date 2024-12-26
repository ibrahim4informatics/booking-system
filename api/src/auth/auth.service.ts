import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import LoginDto from "./dto/login.dto";
import PrismaService from "src/prisma/prisma.service";
import ArgonService from "src/argon/argon,service";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { Response } from "express";
import { Admin, User } from "@prisma/client";
import RegisterDto from "./dto/register.dto";

@Injectable()
export default class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly argonService: ArgonService,
        private readonly jwtService: JwtService
    ) { }

    userCodeGenerator(phone: string, email: string) {
        const [username, emailProvider] = email.split('@');
        return `${username}-${phone}`;

    }

    async generateToken(payload: {}, secret: string, options?: JwtSignOptions): Promise<string | null> {
        try {
            const token = await this.jwtService.signAsync(payload, { secret });
            return token;
        }

        catch (err) {
            console.log(`error is ${err}`);
            return null;
        }
    }

    async loginUser(loginUserDto: LoginDto, userType: 'client' | 'admin', res: Response) {
        const { email, password } = loginUserDto;

        let user: User | Admin;
        let role: string;

        if (userType === 'admin') {
            user = await this.prismaService.admin.findUnique({ where: { email } });
            role = 'admin';
        } else {
            user = await this.prismaService.user.findUnique({ where: { email } });
            role = 'client';
        }

        if (!user) {
            throw new UnauthorizedException("invalid email or password");
        }

        if (!(this.argonService.compare(user.password, password))) {
            throw new UnauthorizedException("invalid email or password");
        }

        const accessToken = await this.generateToken({ uid: user.id, role }, userType === 'admin' ? process.env.AATS : process.env.CATS, { expiresIn: "15m" });
        const refreshToken = await this.generateToken({ uid: user.id, role },userType === 'admin' ? process.env.ARTS : process.env.CRTS, { expiresIn: "7d" });

        if (!accessToken || !refreshToken) {
            throw new InternalServerErrorException("Error while trying to login user");
        }

        res.cookie('access', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.cookie('refresh', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return {
            msg: "user login success"
        };
    }  


    async registerUser(registerUserDto: RegisterDto, userType: 'admin' | 'client') {
        
        const { email, password, family_name, last_name, age, phone_number } = registerUserDto

        const admin = await this.prismaService.admin.findUnique({where:{email}});
        const client = await this.prismaService.user.findUnique({where:{email}});

        if (client || admin) throw new BadRequestException("the email is used by another account");
        if (userType === 'admin') {
            try {
                await this.prismaService.admin.create({
                    data: {
                        email, family_name, last_name, age, phone_number,
                        password: await this.argonService.hashValue(password),
                        code: this.userCodeGenerator(phone_number, email)
                    }
                });
            }
            catch (err) {
                console.log(`error is ${new Error(err)}`);
                throw new InternalServerErrorException("Can not register user now!")
            }
        }


        else {

            try {
                await this.prismaService.user.create({
                    data: {
                        email, family_name, last_name, age, phone_number,
                        password: await this.argonService.hashValue(password),
                        code: this.userCodeGenerator(phone_number, email)
                    }
                });
            }
            catch (err) {
                console.log(`error is ${new Error(err)}`);
                throw new InternalServerErrorException("Can not register user now!")
            }

        }

        return {
            msg: "user creation success"
        }
    }

}