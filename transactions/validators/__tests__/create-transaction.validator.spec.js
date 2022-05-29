import { BadRequestError } from "../../errors/bad-request.error.js";
import { validateCreateTransaction } from "../create-transaction.validator.js"

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

    test('given date not informed, then return 400 error', () => {
        request.body.date = null;

        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('given date not informed, then return error', () => {
        request.body.date = null;

        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('given date invalid, then return 400 error', () => {
        request.body.date = "invalidDate";

        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('given date invalid, then return error', () => {
        request.body.date = "invalidDate";

        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('given money not informed, then return 400 error', () => {
        request.body.money = null;

        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('given money not informed, then return error', () => {
        request.body.money = null;

        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('given currency not informed, then return 400 error', () => {
        request.body.money.currency = null;

        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('given currency not informed, then return error', () => {
        request.body.money.currency = null;

        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('given value not informed, then return 400 error', () => {
        request.body.money.value = 0;

        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('given value not informed, then return error', () => {
        request.body.money.value = 0;

        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('given transaction type not informed, then return 400 error', () => {
        request.body.transactionType = null;

        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('given transaction type not informed, then return error', () => {
        request.body.transactionType = null;

        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('given type not informed, then return 400 error', () => {
        request.body.type = null;

        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('given type not informed, then return error', () => {
        request.body.type = null;

        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('given type is not income or expense, then return 400 error', () => {
        request.body.type = "anyOtherType";

        validateCreateTransaction(request, response);

        expect(response._status).toEqual(400);
    })

    test('given type is not income or expense, then return error', () => {
        request.body.type = "anyOtherType";

        validateCreateTransaction(request, response);

        expect(response._json).toBeInstanceOf(BadRequestError);
    })

    test('given transaction is valid, then go to next step', () => {
        let hasCalledNext = false;
        const next = () => {hasCalledNext = true;}

        validateCreateTransaction(request, response, next);

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