export class UserNotInformedError extends Error {

    constructor() {
        super("Usuário nao informado");
        this.name = "user-not-informed";
        this.code = 500;
    }

}