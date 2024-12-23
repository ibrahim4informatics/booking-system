import { Module } from "@nestjs/common";
import  { AdminAuthController, ClientAuthController } from "./auth.controller";
import AuthService from "./auth.service";
import ArgonService from "src/argon/argon,service";

@Module({
    imports:[ArgonService],
    controllers:[AdminAuthController, ClientAuthController],
    providers:[AuthService]
})
export default class  AuthModule {}