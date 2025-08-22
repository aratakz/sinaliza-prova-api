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
   private replaces: Array<Object>;
   private template: string;

   constructor(email: Email, template: string, replaces: Array<Object> = []) {
    this.emailSettings = email;
    this.template = template;
    this.replaces = replaces;
   }
   
    async sendEmail() {
        const connection = nodemailler.getSMTPConnection();
        fs.readFile(`${__dirname}/../templates/email/basic_email.html`,'utf-8', async (err, pageContent) => {
            let emailHtml: string= await this.build(pageContent);
            emailHtml = emailHtml.replace("{{content}}", await this.buildContent());

            await connection.sendMail({
                from: `${this.emailSettings.from}" <${this.emailSettings.from}>`,
                to: this.emailSettings.to,
                subject: this.emailSettings.subject,
                html: emailHtml
            });
        });
    }

   private async  buildContent () {
        let emailContent =  await fs.promises.readFile(`${__dirname}/../templates/email/${this.template}.html`, 'utf-8');
        for (const replace of this.replaces) {
            for (const replaceKey of Object.keys(replace)) {
                // @ts-ignore
                emailContent = emailContent.replace(`{{${replaceKey}}}`,replace[replaceKey]);
            }
        }
        return emailContent;
    }

    private async build(pageContent:string) {
        const logo = await fs.promises.readFile(`${__dirname}/../templates/assets/logo.png`, {encoding: 'base64'});
        const xoteDigital = await fs.promises.readFile(`${__dirname}/../templates/assets/xoted.png`, {encoding: 'base64'});
        const logoInstagram = await fs.promises.readFile(`${__dirname}/../templates/assets/instagram.png`, {encoding: 'base64'});
        const logoWhatsapp = await fs.promises.readFile(`${__dirname}/../templates/assets/whatsapp.png`, {encoding: 'base64'});
        const logoLinkedin = await fs.promises.readFile(`${__dirname}/../templates/assets/linkedin.png`, {encoding: 'base64'});
        let replacement = pageContent.replace("{{logo}}", logo);
        replacement = replacement.replace("{{xote-digital}}", xoteDigital);
        replacement = replacement.replace("{{instagram}}", logoInstagram);
        replacement = replacement.replace("{{whatsapp}}", logoWhatsapp);
        replacement = replacement.replace("{{linkedin}}", logoLinkedin);

        return replacement;
    }
}