export class AuthException extends Error {
    constructor() {
     super();
     super.message = "Unauthorized!"
     super.stack = "401";   
    }
}