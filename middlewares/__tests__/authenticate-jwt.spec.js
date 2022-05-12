import { authenticateToken } from '../authenticate-jwt.js';

describe("Authenticate jwt", () => {

    let response;
    let next;

    const request = {headers: {authorization: ""}};

    beforeEach(() => {
        response = new ResponseMock();
        next = () => {};
    })

    test('given no authorization header, then return error 401', () => {
        authenticateToken(request, response, next);

        expect(response._status).toEqual(401);
    })

    describe('given authorization header', () => {

        let auth;

        beforeEach(() => {
            auth = new AuthMock();
        })

        test('when invalid, then return error 401', async () => {
            request.headers.authorization = "anyInvalidHeader";
            auth._response = Promise.reject();
    
            await authenticateToken(request, response, next, auth);
    
            expect(response._status).toEqual(401);
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
        _status;
        status(value) {
            this._status = value;
            return this;
        }
        json(value) {

        }
    }

})