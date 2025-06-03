export class ExitentRecordException extends Error {
    private errorCode = 422;
    constructor() {
     super();
     super.message = "pre-registered record"
    }

    get error () {
        return this.errorCode;
    }
}