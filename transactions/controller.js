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
        this.#transaction.user = request.user;

        return this.#transaction.findByUid().then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        });
    }

    create(request, response) {
        this.#transaction.user = request.user;

        return this.#transaction.create(request.body).then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        })
    }

    update(request, response) {
        this.#transaction.uid = request.params.uid;
        this.#transaction.user = request.user;

        return this.#transaction.update(request.body).then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        });
    }

}