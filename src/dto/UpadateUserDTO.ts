export class UpdateUserDTO {
    name: string;
    birthday: Date;
    email: string;
    password?: string;
    passwordConfirm?: string;
    image?: string;

}