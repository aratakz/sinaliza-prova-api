export class SigninDTO {
    username: string;
    password: string;

    constructor(entries = this) {
        this.username = entries.username;
        this.password = entries.password;
    }
}