import {SigninDTOValidator} from "./validation/signinDTOValidator";

export class SigninDTO {
    username: string;
    password: string;

    constructor(entries = this) {
        this.username = entries.username;
        this.password = entries.password;

        new SigninDTOValidator(this).isValid();
    }
}