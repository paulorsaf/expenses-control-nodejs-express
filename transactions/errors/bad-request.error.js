export class BadRequestError extends Error {

    constructor(description) {
        super();
        this.message = description;
        this.name = "bad-request";
        this.code = 400;
    }

}