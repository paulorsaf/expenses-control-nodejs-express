import { BadRequestError } from "../errors/bad-request.error.js";

export function validateTransaction(request, response, next) {
    const date = request.body.date;
    if (!date) {
        return response.status(400).json(new BadRequestError("Data nao informada"));
    }
    if (isNaN(new Date(date))) {
        return response.status(400).json(new BadRequestError("Data inválida"));
    }

    const money = request.body.money;
    if (!money) {
        return response.status(400).json(new BadRequestError("Dinheiro nao informado"));
    }
    if (!money.currency) {
        return response.status(400).json(new BadRequestError("Moeda nao informada"));
    }
    if (!money.value) {
        return response.status(400).json(new BadRequestError("Valor nao informado"));
    }

    const transactionType = request.body.transactionType;
    if (!transactionType) {
        return response.status(400).json(new BadRequestError("Tipo de transaçao nao informado"));
    }

    const type = request.body.type;
    if (!type) {
        return response.status(400).json(new BadRequestError("Tipo nao informado"));
    }
    if (type != "income" && type != "expense") {
        return response.status(400).json(new BadRequestError("Tipo nao inválido"));
    }

    next();
}