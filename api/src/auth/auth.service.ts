import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import LoginDto from "./dto/login.dto";
import PrismaService from "src/prisma/prisma.service";
import ArgonService from "src/argon/argon,service";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { Response } from "express";
import { Admin, User } from "@prisma/client";

@Injectable()
export default class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly argonService: ArgonService,
        private readonly jwtService: JwtService
    ) { }


    async generateToken(payload: {}, secret: string, options?:JwtSignOptions): Promise<string | null> {
        try {
            const token = await this.jwtService.signAsync(payload, { secret });
            return token;
        }

        catch (err){
            console.log(`error is ${err}`);
            return null;
        }
    }

    async loginUser(loginUserDto: LoginDto, userType: 'client' | 'admin', res: Response) {
        const { email, password } = loginUserDto;
    
        let user:User | Admin;
        let role:string;
    
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
    
        const accessToken = this.generateToken({ uid: user.id, role }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
        const refreshToken = this.generateToken({ uid: user.id, role }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
    
        if (!accessToken || !refreshToken) {
            throw new InternalServerErrorException("Error while trying to login user");
        }
    
        res.cookie('access', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.cookie('refresh', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    
        return {
            msg: "user login success"
        };
    }


    registerUser(){}

}