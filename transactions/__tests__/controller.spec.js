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

        describe('when success', () => {

            const transactions = [{uid: 1}, {uid: 2}];

            beforeEach(() => {
                controller = new TransactionController({
                    findByUser: () => Promise.resolve(transactions)
                });
            })

            test('then return 200', (done) => {
                controller.findByUser(request, response).then(() => {
                    expect(response._status).toEqual(200);
                    done();
                })
                
            })
    
            test('then return transactions', (done) => {
                controller.findByUser(request, response).then(() => {
                    expect(response._json).toEqual(transactions);
                    done();
                })
                
            })

        })

        describe('when fail', () => {

            const error = {code: 500};

            beforeEach(() => {
                controller = new TransactionController({
                    findByUser: () => Promise.reject(error)
                });
            })
    
            test('then return error', (done) => {
                controller.findByUser(request, response).then(() => {
                    expect(response._json).toEqual(error);
                    done();
                })
            })
        
            test('then return error status', (done) => {
                controller.findByUser(request, response).then(() => {
                    expect(response._status).toEqual(500);
                    done();
                })
            })

        })

    })

    describe('given find transaction by uid', () => {

        let controller;

        describe('when success', () => {

            const user = {uid: "anyUserUid"};
            const request = {params: {uid: 1}, user};
            let response;

            const transaction = {
                findByUid: () => Promise.resolve()
            };

            beforeEach(() => {
                response = new ResponseMock();
                controller = new TransactionController(transaction);
            })

            test('then return status 200', async () => {
                await controller.findByUid(request, response);
    
                expect(response._status).toEqual(200);
            })
    
            test('then return transaction', async () => {
                await controller.findByUid(request, response);
    
                expect(response._json).toEqual(transaction);
            })
    
            test('then transaction should have user from request', async () => {
                await controller.findByUid(request, response);
    
                expect(response._json.user).toEqual(user);
            })
    
            test('then transaction should have uid from request', async () => {
                await controller.findByUid(request, response);
    
                expect(response._json.uid).toEqual(1);
            })

        })

        describe('when fail', () => {

            const request = {params: {uid: 1}};
            let response;

            let controller;

            beforeEach(() => {
                response = new ResponseMock();

                controller = new TransactionController({
                    findByUid: () => Promise.reject({code: 500})
                });
            })

            test('then return error status', async () => {
                await controller.findByUid(request, response);
    
                expect(response._status).toEqual(500);
            })
    
            test('then return error status', async () => {
                await controller.findByUid(request, response);
    
                expect(response._json).toEqual({code: 500});
            })

        })

    })

    describe('given create new transaction', () => {

        const user = {uid: "anyUserUid"};
        const request = {body: {}, user};
        let response;

        beforeEach(() => {
            response = new ResponseMock();
        })

        test('then transaction should belong to user on request', async () => {
            const controller = new TransactionController({
                create: () => Promise.resolve()
            });

            await controller.create(request, response);

            expect(response._json.user).toEqual(user);
        })

        describe('when success', () => {

            let controller;
            let transaction = {
                create: () => Promise.resolve()
            }

            beforeEach(() => {
                controller = new TransactionController(transaction);
            })

            test('when success, then return status 200', async () => {
                await controller.create(request, response);
    
                expect(response._status).toEqual(200);
            })
    
            test('when success, then return transaction', async () => {
                await controller.create(request, response);
    
                expect(response._json).toEqual(transaction);
            })

        })

        describe('when fail', () => {

            let controller;

            beforeEach(() => {
                controller = new TransactionController({
                    create: () => Promise.reject({code: 500})
                });
            })

            test('then return error status', async () => {
                await controller.create(request, response);
    
                expect(response._status).toEqual(500);
            })
    
            test('then return error', async () => {
                await controller.create(request, response);
    
                expect(response._json).toEqual({code: 500});
            })

        })

    })

    describe('given update transaction', () => {

        const user = {uid: "anyUserUid"};
        
        const request = {params: {uid: 1}, user};
        let response;

        let model;

        beforeEach(() => {
            response = new ResponseMock();
            model = {
                _hasUpdated: false,
                update() {
                    this._hasUpdated = true;
                    return Promise.resolve();
                }
            };
        })

        test('when success, then return status 200', async () => {
            const controller = new TransactionController(model);

            await controller.update(request, response);

            expect(response._status).toEqual(200);
        })

        test('when success, then return updated transaction', async () => {
            const controller = new TransactionController(model);

            await controller.update(request, response);

            expect(response._json).toEqual(model);
        })

        test('then transaction should belong to user on request', async () => {
            const controller = new TransactionController(model);

            await controller.update(request, response);

            expect(response._json.user).toEqual(user);
        })

        test('then transaction should have uid from request', async () => {
            const controller = new TransactionController(model);

            await controller.update(request, response);

            expect(response._json.uid).toEqual(1);
        })

        test('then update transaction', async () => {
            const controller = new TransactionController(model);

            await controller.update(request, response);

            expect(model._hasUpdated).toBeTruthy();;
        })

        test('when fail, then return error status', async () => {
            const controller = new TransactionController({
                update: () => Promise.reject({code: 500})
            });

            await controller.update(request, response);

            expect(response._status).toEqual(500);
        })

        test('when fail, then return error status', async () => {
            const controller = new TransactionController({
                update: () => Promise.reject({code: 500})
            });

            await controller.update(request, response);

            expect(response._json).toEqual({code: 500});
        })

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