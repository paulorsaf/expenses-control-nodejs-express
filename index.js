import express, { json } from 'express';
import admin from 'firebase-admin';
import { transactionsRouter } from './transactions/routes.js';

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

app.use(json());
app.use((request, response, next) => {
  // TODO: allow only secure origins
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH,DELETE");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

app.use('/transactions', transactionsRouter);

app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'));