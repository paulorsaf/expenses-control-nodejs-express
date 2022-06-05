import { TransactionController } from '../controller.js';

describe('Transaction controller', () => {

    let request;
    let response;
    let controller;

    const user = {uid: "anyUserUid"};
    const error = {code: 500};

    beforeEach(() => {
        request = {};
        response = new ResponseMock();
    })

    describe('given find transaction by user', () => {

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
                    expect(response._status).toEqual(error.code);
                    done();
                })
            })

        })

    })

    describe('given find transaction by uid', () => {

        describe('when success', () => {

            const transaction = {
                findByUid: () => Promise.resolve()
            };

            beforeEach(() => {
                request = {params: {uid: 1}, user};
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

            beforeEach(() => {
                request = {params: {uid: 1}}
                response = new ResponseMock();

                controller = new TransactionController({
                    findByUid: () => Promise.reject(error)
                });
            })

            test('then return error status', async () => {
                await controller.findByUid(request, response);
    
                expect(response._status).toEqual(error.code);
            })
    
            test('then return error status', async () => {
                await controller.findByUid(request, response);
    
                expect(response._json).toEqual(error);
            })

        })

    })

    describe('given create new transaction', () => {

        beforeEach(() => {
            request = {body: {}, user};
        })

        test('then transaction should belong to user on request', async () => {
            const controller = new TransactionController({
                create: () => Promise.resolve()
            });

            await controller.create(request, response);

            expect(response._json.user).toEqual(user);
        })

        describe('when success', () => {

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

            beforeEach(() => {
                controller = new TransactionController({
                    create: () => Promise.reject(error)
                });
            })

            test('then return error status', async () => {
                await controller.create(request, response);
    
                expect(response._status).toEqual(error.code);
            })
    
            test('then return error', async () => {
                await controller.create(request, response);
    
                expect(response._json).toEqual(error);
            })

        })

    })

    describe('given update transaction', () => {

        let model;

        beforeEach(() => {
            request = {params: {uid: 1}, user};
            model = {
                _hasUpdated: false,
                update() {
                    this._hasUpdated = true;
                    return Promise.resolve();
                }
            };
        })

        test('then transaction should have uid from request', async () => {
            const controller = new TransactionController(model);

            await controller.update(request, response);

            expect(response._json.uid).toEqual(1);
        })

        test('then transaction should belong to user on request', async () => {
            const controller = new TransactionController(model);

            await controller.update(request, response);

            expect(response._json.user).toEqual(user);
        })

        test('then update transaction', async () => {
            const controller = new TransactionController(model);

            await controller.update(request, response);

            expect(model._hasUpdated).toBeTruthy();;
        })

        describe('when success', () => {

            beforeEach(async () => {
                const controller = new TransactionController(model);
                await controller.update(request, response);
            })

            test('then return status 200', async () => {
                expect(response._status).toEqual(200);
            })
    
            test('then return updated transaction', async () => {
                expect(response._json).toEqual(model);
            })

        })

        describe('when fail', () => {

            beforeEach(async () => {
                const controller = new TransactionController({
                    update: () => Promise.reject(error)
                });
    
                await controller.update(request, response);
            })

            test('then return error status', async () => {
                expect(response._status).toEqual(error.code);
            })
    
            test('then return error status', async () => {
                expect(response._json).toEqual(error);
            })

        })

    })

    describe('given remove transaction', () => {

        const model = {
            _hasDeleted: false,
            delete() {
                this._hasDeleted = true;
                return Promise.resolve();
            }
        }
        beforeEach(() => {
            request = {params: {uid: 1}, user};
            response = new ResponseMock();

            controller = new TransactionController(model);
        })

        test('then remove transaction', async () => {
            await controller.delete(request, response);

            expect(model._hasDeleted).toBeTruthy();
        })

        test('then transaction should belong to user from request', async () => {
            await controller.delete(request, response);

            expect(model.user).toEqual(user);
        })

        test('then transaction should have uid from request', async () => {
            await controller.delete(request, response);

            expect(model.uid).toEqual(1);
        })

        describe('when success', () => {

            test('then return status 200', async () => {
                await controller.delete(request, response);
    
                expect(response._status).toEqual(200);
            })
    
            test('then return deleted transaction', async () => {
                await controller.delete(request, response);
    
                expect(response._json).toEqual(model);
            })

        })

        describe('when error', () => {

            beforeEach(async () => {
                controller = new TransactionController({
                    delete: () => Promise.reject(error)
                });

                await controller.delete(request, response);
            })

            test('then return error status', () => {
                expect(response._status).toEqual(error.code);
            })
    
            test('then return error', () => {
                expect(response._json).toEqual(error);
            })

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