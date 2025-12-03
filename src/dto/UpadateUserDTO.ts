export class UpdateUserDTO {
    name: string;
    birthday: Date;
    email: string;
    login?: string;
    password?: string;
    passwordConfirm?: string;
    image?: string;

}