import { Module } from "@nestjs/common";
import  { AdminAuthController } from "./auth.controller";
import AuthService from "./auth.service";
import ArgonModule from "src/argon/argon.module";
import NodeMailerModule from "src/nodemailer/nodemailer.module";

@Module({
    imports:[ArgonModule, NodeMailerModule],
    controllers:[AdminAuthController],
    providers:[AuthService]
})
export default class  AuthModule {}