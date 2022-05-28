export class TransactionNotFoundError extends Error {

    constructor() {
        super();
        this.message = "Transaçao nao encontrada";
        this.name = "transaction-not-found";
        this.code = 404;
    }

}