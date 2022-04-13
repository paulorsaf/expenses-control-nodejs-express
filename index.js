import express from 'express';
import admin from 'firebase-admin';

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

app.get('/transactions', (request, response) => {
    admin.firestore()
        .collection('transactions')
        .get()
        .then(snapshot => {
            const transactions = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
            response.json(transactions);
        })
})

app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'));