import { TransactionController } from '../controller.js';

describe('Transaction controller', () => {

    let request;
    let response;

    beforeEach(() => {
        request = {};
        response = new ResponseMock();
    })

    describe('given find transaction by user', () => {

        let controller;
        let transaction;

        const error = {code: 500};
        const transactions = [{uid: 1}, {uid: 2}];

        beforeEach(() => {
            transaction = new TransactionMock();
            controller = new TransactionController(transaction);
        })

        test('when succes, then return transactions', (done) => {
            transaction._response = Promise.resolve(transactions);
    
            controller.findByUser(request, response).then(() => {
                expect(response._json).toEqual(transactions);
                done();
            })
            
        })

        describe('when fail', () => {
    
            test('then return error', (done) => {
                transaction._response = Promise.reject(error);
        
                controller.findByUser(request, response).then(() => {
                    expect(response._json).toEqual(error);
                    done();
                })
            })
        
            test('then return error status 500', (done) => {
                transaction._response = Promise.reject(error);
        
                controller.findByUser(request, response).then(() => {
                    expect(response._status).toEqual(500);
                    done();
                })
            })

        })

        class TransactionMock {
            _response;
            findByUser() {
                return this._response;
            }
        }

    })

    class ResponseMock {
        _json;
        _status;
        json(value) {
            this._json = value;
        }
        status(value) {
            this._status = value;
            return this;
        }
    }

})