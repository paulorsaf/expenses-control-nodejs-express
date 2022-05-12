import { UserNotInformedError } from '../errors/user-not-informed.error.js';
import { Transaction } from '../model.js';

describe("Transaction model", () => {

    describe("given find user by uid", () => {

        let transactionRepositoryMock;
        let model;

        beforeEach(() => {
            transactionRepositoryMock = new TransactionRepositoryMock();
            model = new Transaction(transactionRepositoryMock);
        })

        test("when user is not informed, then return error 500", async () => {
            const response = model.findByUser();
    
            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })
    
        test("when user uid is not informed, then return error 500", async () => {
            model.user = {};
    
            const response = model.findByUser();
    
            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })
    
        test("when user is informed, then return transactions", async () => {
            model.user = {uid: "anyUserUid"};

            const transactions = [{uid: "transaction1"}, {uid: "transaction2"}];
            transactionRepositoryMock._response = Promise.resolve(transactions);
    
            const response = model.findByUser();
    
            await expect(response).resolves.toEqual(transactions);
        })

        class TransactionRepositoryMock {
            _response;
            findByUserUid() {
                return this._response
            }
        }

    })

})