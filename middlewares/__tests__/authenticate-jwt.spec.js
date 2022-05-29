import { UserNotAuthorizedError } from '../errors/user-not-authorized.error.js';
import { authenticateToken } from '../authenticate-jwt.js';

describe("Authenticate jwt", () => {

    let response;
    let next;

    const request = {headers: {authorization: ""}};

    beforeEach(() => {
        response = new ResponseMock();
        next = () => {};
    })

    describe('given no authorization header', () => {

        test('then return error 401', () => {
            authenticateToken(request, response, next);
    
            expect(response._status).toEqual(401);
        })
    
        test('then return error', () => {
            authenticateToken(request, response, next);
    
            expect(response._json).toBeInstanceOf(UserNotAuthorizedError);
        })

    })

    describe('given authorization header', () => {

        let auth;

        beforeEach(() => {
            auth = new AuthMock();
        })

        describe('when invalid', () => {

            beforeEach(() => {
                request.headers.authorization = "anyInvalidHeader";
                auth._response = Promise.reject();
            })

            test('then return error 401', async () => {
                await authenticateToken(request, response, next, auth);
        
                expect(response._status).toEqual(401);
            })

            test('then return error', async () => {
                await authenticateToken(request, response, next, auth);
        
                expect(response._json).toBeInstanceOf(UserNotAuthorizedError);
            })

        })
    
        test('when valid, then add user to request', async () => {
            request.headers.authorization = "anyValidHeader";
            auth._response = Promise.resolve({sub: "anyUserUid"});
    
            await authenticateToken(request, response, next, auth);
    
            expect(request.user).toEqual({uid: "anyUserUid"});
        })

        class AuthMock {
            _response;
            verifyIdToken() {
                return this._response;
            }
        }

    })

    class ResponseMock {
        _json;
        _status;
        status(value) {
            this._status = value;
            return this;
        }
        json(value) {
            this._json = value;
        }
    }

})