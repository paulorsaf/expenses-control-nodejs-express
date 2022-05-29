export class UserNotAuthorizedError extends Error {

    constructor() {
        super();
        this.message = "Usuário nao autorizado";
        this.name = "user-not-authorized";
        this.code = 401;
    }

}