import nodemailler from "../server/nodemailler"

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
        await connection.sendMail({
            from: `"${this.emailSettings.title}" <${this.emailSettings.from}>`,
            to: this.emailSettings.to,
            subject: this.emailSettings.subject,
            text: this.emailSettings.text,
            html: this.emailSettings.html
        })
    }
}