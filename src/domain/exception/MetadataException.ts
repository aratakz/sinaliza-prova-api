export class MetadataExecption extends Error {
    private errorCode = 422;
    constructor(message:string) {
     super();
     super.message = message;
    }

    get error () {
        return this.errorCode;
    }
}