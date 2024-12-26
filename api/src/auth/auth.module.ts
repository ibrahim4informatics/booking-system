import { Module } from "@nestjs/common";
import  { AdminAuthController, ClientAuthController } from "./auth.controller";
import AuthService from "./auth.service";
import ArgonModule from "src/argon/argon.module";

@Module({
    imports:[ArgonModule],
    controllers:[AdminAuthController, ClientAuthController],
    providers:[AuthService]
})
export default class  AuthModule {}