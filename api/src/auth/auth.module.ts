import { Module } from "@nestjs/common";
import  { AdminAuthController, ClientAuthController } from "./auth.controller";
import AuthService from "./auth.service";

@Module({
    controllers:[AdminAuthController, ClientAuthController],
    providers:[AuthService]
})
export default class  AuthModule {}