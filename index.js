import express from 'express';
import admin from 'firebase-admin';

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

app.get('/transactions', async (request, response) => {
    const jwt = request.headers.authorization;
    if (!jwt) {
        response.status(401).json({message: "Usuário nao autorizado"});
        return;
    }

    let decodedIdToken = "";
    try {
        decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
    } catch (e) {
        response.status(401).json({message: "Usuário nao autorizado"});
        return;
    }

    admin.firestore()
        .collection('transactions')
        .where('user.uid', '==', decodedIdToken.sub)
        .orderBy('date', 'desc')
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