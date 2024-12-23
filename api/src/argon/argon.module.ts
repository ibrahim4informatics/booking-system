import { Module } from "@nestjs/common";
import ArgonService from "./argon,service";

@Module({
    exports: [ArgonService],
    providers: [ArgonService]
})
export default class ArgonModule { }