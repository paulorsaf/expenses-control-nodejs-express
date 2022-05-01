import { Transaction } from './model.js';

export class TransactionController {

    findByUser(request, response) {
        const transaction = new Transaction();
        transaction.user = request.user;

        transaction.findByUser().then(transactions => {
            response.json(transactions);
        }).catch(error => {
            response.status(error.code).json(error);
        })
    }

}