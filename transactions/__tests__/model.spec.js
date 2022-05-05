import { UserNotInformedError } from '../errors/user-not-informed.error.js';
import { Transaction } from '../model.js';

describe("Transaction model", () => {

    const transactionRepositoryMock = {
        findByUserUid: () => Promise.resolve([
            {uid: "transaction1"}, {uid: "transaction2"}
        ])
    };

    describe("given find user by uid", () => {

        test("when user is not informed, then return error 500", async () => {
            const model = new Transaction();
    
            const response = model.findByUser();
    
            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })
    
        test("when user uid is not informed, then return error 500", async () => {
            const model = new Transaction();
            model.user = {};
    
            const response = model.findByUser();
    
            await expect(response).rejects.toBeInstanceOf(UserNotInformedError);
        })
    
        test("when user is informed, then return transactions", async () => {
            const model = new Transaction(transactionRepositoryMock);
            model.user = {uid: "anyUserUid"};
    
            const response = model.findByUser();
    
            await expect(response).resolves.toEqual([
                {uid: "transaction1"}, {uid: "transaction2"}
            ]);
        })

    })

})