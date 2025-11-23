import {SigninDTO} from "../signinDTO";

export class SigninDTOValidator {

    private dto: SigninDTO;

    constructor(dto: SigninDTO) {
        this.dto =  dto;
    }

    get isValid(): boolean {
        if (!this.dto.username || !this.dto.password) {
            throw Error('Invalid login or password!');
        }
        return true;
    }
}