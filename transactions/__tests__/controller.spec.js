import { TransactionController } from '../controller.js';

describe('Transaction controller', () => {

    let request;
    let response;

    beforeEach(() => {
        request = {};
        response = new ResponseMock();
    })

    test('given find transaction by user, when succes, then return transactions', (done) => {
        const transactions = [{uid: 1}, {uid: 2}];

        const controller = new TransactionController({
            findByUser: () => Promise.resolve(transactions)
        });

        controller.findByUser(request, response).then(() => {
            expect(response._json).toEqual(transactions);
            done();
        })
        
    })

    test('given find transactions by user, when fail, then return error', (done) => {
        const error = {code: 500};

        const controller = new TransactionController({
            findByUser: () => Promise.reject(error)
        });

        controller.findByUser(request, response).then(() => {
            expect(response._json).toEqual(error);
            done();
        })
    })

    test('given find transactions by user, when fail, then return error status 500', (done) => {
        const error = {code: 500};

        const controller = new TransactionController({
            findByUser: () => Promise.reject(error)
        });

        controller.findByUser(request, response).then(() => {
            expect(response._status).toEqual(500);
            done();
        })
    })

    class ResponseMock {
        _json = null;
        _status = 0;
        json(value) {
            this._json = value;
        }
        status(value) {
            this._status = value;
            return this;
        }
    }

})