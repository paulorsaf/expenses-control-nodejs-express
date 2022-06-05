import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { TransactionController } from './controller.js';
import { validateTransaction } from './validators/transaction.validator.js';

const app = express();

app.get('/',
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => new TransactionController().findByUser(request, response)
);
app.get('/:uid',
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => new TransactionController().findByUid(request, response)
);
app.post('/',
    (request, response, next) => validateTransaction(request, response, next),
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => new TransactionController().create(request, response)
);
app.patch('/:uid',
    (request, response, next) => validateTransaction(request, response, next),
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => new TransactionController().update(request, response)
);
app.delete('/:uid',
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => new TransactionController().delete(request, response)
);

export const transactionsRouter = app;