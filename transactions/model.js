import { UserNotInformedError } from "./errors/user-not-informed.error.js";
import { TransactionRepository } from "./repository.js";

export class Transaction {

    date;
    description;
    money;
    transactionType;
    type;
    user;

    #repository;

    constructor(transactionRepository) {
        this.#repository = transactionRepository || new TransactionRepository();
    }

    findByUser() {
        if (!this.user?.uid) {
            return Promise.reject(new UserNotInformedError());
        }

        return this.#repository.findByUserUid(this.user.uid);
    }

}