import { createTransport } from "nodemailer";
import 'dotenv/config';

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth:{
        user: process.env.NODEMAILER,
        pass: process.env.NODEMAILER_PASS
    }
});

export {
    transporter
}