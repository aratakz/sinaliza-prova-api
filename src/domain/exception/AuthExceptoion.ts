export class AuthException extends Error {
    private errorCode = 401
    constructor() {
     super();
     super.message = "Unauthorized!"
    }

    get error () {
        return this.errorCode;
    }
}