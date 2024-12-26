import { Injectable } from "@nestjs/common";
import * as ag from "argon2";
@Injectable()
export default class ArgonService {

    async hashValue(value: string): Promise<string> {
        const hash = await ag.hash(value)
        return hash;
    }

    async compare(hash: string, value: string): Promise<boolean> {

        return await ag.verify(hash,value);
    }
}