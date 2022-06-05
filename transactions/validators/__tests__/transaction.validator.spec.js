import { BadRequestError } from "../../errors/bad-request.error.js";
import { validateTransaction } from "../transaction.validator.js"

describe('Create transaction validator', () => {

    let request;
    let response;

    beforeEach(() => {
        request = {
            body: {
                date: "2030-01-01",
                money: {
                    currency: "anyCurrency",
                    value: 100
                },
                transactionType: "anyTransactionType",
                type: "income"
            }
        };
        response = new ResponseMock();
    })

    describe('given date', () => {

        describe('when not informed', () => {

            beforeEach(() => {
                request.body.date = null;
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);
        
                expect(response._status).toEqual(400);
            })
        
            test('then return error', () => {
                validateTransaction(request, response);
        
                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })

        describe('when invalid', () => {

            beforeEach(() => {
                request.body.date = "invalidDate";
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);
        
                expect(response._status).toEqual(400);
            })
        
            test('then return error', () => {
                validateTransaction(request, response);
        
                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })

    })

    describe('given money', () => {

        describe('when not informed', () => {

            beforeEach(() => {
                request.body.money = null;
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);
        
                expect(response._status).toEqual(400);
            })
        
            test('then return error', () => {
                validateTransaction(request, response);
        
                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })

        describe('when currency not informed', () => {

            beforeEach(() => {
                request.body.money.currency = null;
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);
        
                expect(response._status).toEqual(400);
            })
        
            test('then return error', () => {
                validateTransaction(request, response);
        
                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })

        describe('when value not informed', () => {

            beforeEach(() => {
                request.body.money.value = 0;
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);
        
                expect(response._status).toEqual(400);
            })
        
            test('then return error', () => {
                validateTransaction(request, response);
        
                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })

    })

    describe('given transaction type not informed', () => {

        beforeEach(() => {
            request.body.transactionType = null;
        })

        test('then return 400 error', () => {
            validateTransaction(request, response);
    
            expect(response._status).toEqual(400);
        })
    
        test('then return error', () => {
            validateTransaction(request, response);
    
            expect(response._json).toBeInstanceOf(BadRequestError);
        })

    })

    describe('given type', () => {

        describe('when not informed', () => {

            beforeEach(() => {
                request.body.type = null;
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);
        
                expect(response._status).toEqual(400);
            })
        
            test('then return error', () => {
                validateTransaction(request, response);
        
                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })

        describe('when is not income or expense', () => {

            beforeEach(() => {
                request.body.type = "anyOtherType";
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);
        
                expect(response._status).toEqual(400);
            })
        
            test('then return error', () => {
                validateTransaction(request, response);
        
                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })

    })

    test('given transaction is valid, then go to next step', () => {
        let hasCalledNext = false;
        const next = () => {hasCalledNext = true;}

        validateTransaction(request, response, next);

        expect(hasCalledNext).toBeTruthy();
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