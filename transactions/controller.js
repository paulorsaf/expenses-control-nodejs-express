import admin from 'firebase-admin';

export class TransactionController {

    findByUser(request, response) {
        admin.firestore()
            .collection('transactions')
            .where('user.uid', '==', request.user.uid)
            .orderBy('date', 'desc')
            .get()
            .then(snapshot => {
                const transactions = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }))
                response.json(transactions);
            })
    }

}