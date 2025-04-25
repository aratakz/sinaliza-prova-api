import { Transporter } from './../../node_modules/@types/nodemailer/index.d';
import * as nodemailer from 'nodemailer';
import 'dotenv/config'

class NodeMailler {
    
    private transporter: Transporter;
    
    constructor () {
        if (process.env.SMTP_PORT && process.env.SMTP_SECURE) {
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number.parseInt(process.env.SMTP_PORT),
                secure: JSON.parse(process.env.SMTP_SECURE),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                },
            });
        } else {
            throw Error('Cannot init email settings');        }
    }

    getSMTPConnetion(): Transporter {
        return this.transporter;
    }
}

export default new NodeMailler();