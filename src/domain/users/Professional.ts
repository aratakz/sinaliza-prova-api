import {Professional, TwoFactorToken, User} from "../../models/entity";
import {ProfessionalDTO} from "../../dto";
import {ProfessionalRepository} from "../../repository/ProfessionalRepository";
import {EmailService} from "../../services/EmailService";
import {ulid} from "ulid";
import moment from "moment/moment";
import {UserDomain} from "./UserDomain";
import {TwoFactorTokenRepository} from "../../repository/TwoFactorTokenRepository";

export class ProfessionalDomain extends UserDomain {

    private professionalRepository: ProfessionalRepository = new ProfessionalRepository();
    private twoFactorTokenRepository: TwoFactorTokenRepository = new TwoFactorTokenRepository();

    async create(professionalDTO: ProfessionalDTO) {
       const professional = await this.professionalRepository.save(new Professional(professionalDTO));
        const tempUlid = ulid();

        const twoFactorToken: TwoFactorToken = new TwoFactorToken();
        twoFactorToken.professional = professional;
        twoFactorToken.expiration = moment().add(20, 'minutes').toDate();
        twoFactorToken.token = tempUlid;
        await this.twoFactorTokenRepository.save(twoFactorToken);


        const email = {
            from: "server@email.com",
            to: professionalDTO.email,
            subject: "Seu cadastro no Sinaliza Prova foi criado!",
            title: "Acesso a plataforma Sinaliza prova",
            text: "Olá, voce acaba de se cadastrar no Sinaliza prova. Para concluir o seu cadastro, basta acessar o link abaixo!"
        }
        await new EmailService(email, 'activation', [{
            studentName: professionalDTO.name,
            activationLink: `http://localhost:4200/auth/activate/${tempUlid}`,
        }]).sendEmail();
    }
}