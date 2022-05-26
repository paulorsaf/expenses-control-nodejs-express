import admin from 'firebase-admin';

export class TransactionRepository {

    findByUserUid(uid) {
        return admin.firestore()
            .collection('transactions')
            .where('user.uid', '==', uid)
            .orderBy('date', 'desc')
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }))
            })
    }

    findByUid(uid) {
        return admin.firestore()
            .collection('transactions')
            .doc(uid)
            .get()
            .then(snapshot => snapshot.data());
    }

    save(transaction) {
        return admin.firestore()
            .collection('transactions')
            .add(JSON.parse(JSON.stringify(transaction)))
            .then(response => ({uid: response.id}));
    }

}