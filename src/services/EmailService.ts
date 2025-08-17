import nodemailler from "../server/nodemailler"
import * as fs from 'fs';
type Email = {
    title: string,
    from: string,
    to: string,
    subject: string,
    text?: string,
    html?: string
}

export class EmailService {
   private emailSettings: Email;

   constructor(email: Email) {
    this.emailSettings = email;
   }
   
    async sendEmail() {
        const connection = nodemailler.getSMTPConnetion();
        fs.readFile(`${__dirname}/../templates/email/activation.html`,'utf-8', async (err, data) => {
            const replacement = data.replace("{{activation_token}}", `<a href="https://github.com" target="_blank">TESTE</a>`);
            await connection.sendMail({
                from: `"${this.emailSettings.title}" <${this.emailSettings.from}>`,
                to: this.emailSettings.to,
                subject: this.emailSettings.subject,
                html: replacement
            });
        });
    }
}