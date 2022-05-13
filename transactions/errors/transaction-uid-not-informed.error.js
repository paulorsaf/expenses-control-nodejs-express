export class TransactionUidNotInformedError extends Error {

    constructor() {
        super("Uid da transaçao nao informado");
        this.name = "transaction-uid-not-informed";
        this.code = 500;
    }

}