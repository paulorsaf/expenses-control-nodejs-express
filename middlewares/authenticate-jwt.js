import { UserNotAuthorizedError } from "./errors/user-not-authorized.error.js";

const error = new UserNotAuthorizedError();

export async function authenticateToken(request, response, next, auth) {
    const jwt = request.headers.authorization;
    if (!jwt) {
        response.status(error.code).json(error);
        return;
    }

    let decodedIdToken = "";
    try {
        decodedIdToken = await auth.verifyIdToken(jwt, true);
    } catch (e) {
        response.status(error.code).json(error);
        return;
    }

    request.user = {
        uid: decodedIdToken.sub
    }
    
    next();
}