import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer";

@Injectable()
export default class NodemailerService {

    private readonly transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 465,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });



    async sendMail(mailOptions: Mail.Options) {
        try {
            await this.transport.sendMail(mailOptions);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}
