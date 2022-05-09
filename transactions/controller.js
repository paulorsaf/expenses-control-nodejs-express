import { Transaction } from './model.js';

export class TransactionController {

    #transaction;

    constructor(transaction) {
        this.#transaction = transaction || new Transaction();
    }

    findByUser(request, response) {
        this.#transaction.user = request.user;

        return this.#transaction.findByUser().then(transactions => {
            response.json(transactions);
        }).catch(error => {
            response.status(error.code).json(error);
        })
    }

}