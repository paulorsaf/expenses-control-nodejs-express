export class TransactionUidNotInformedError extends Error {

    constructor() {
        super();
        this.message = "Uid da transaçao nao informado";
        this.name = "transaction-uid-not-informed";
        this.code = 500;
    }

}