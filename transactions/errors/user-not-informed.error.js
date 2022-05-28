export class UserNotInformedError extends Error {

    constructor() {
        super();
        this.message = "Usuário nao informado";
        this.name = "user-not-informed";
        this.code = 500;
    }

}