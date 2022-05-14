import { Transaction } from './model.js';

export class TransactionController {

    #transaction;

    constructor(transaction) {
        this.#transaction = transaction || new Transaction();
    }

    findByUser(request, response) {
        this.#transaction.user = request.user;

        return this.#transaction.findByUser().then(transactions => {
            response.status(200).json(transactions);
        }).catch(error => {
            response.status(error.code).json(error);
        })
    }

    findByUid(request, response) {
        this.#transaction.uid = request.params.uid;

        return this.#transaction.findByUid().then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        });
    }

}