import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyBAAT_R3amiVUf5qXa8syYYeXHFAxfAMvA',
    authDomain: 'budgety-a6dd3.firebaseapp.com',
    databaseURL: 'https://budgety-a6dd3.firebaseio.com',
    projectId: 'budgety-a6dd3',
    storageBucket: 'budgety-a6dd3.appspot.com',
    messagingSenderId: 'SENDER_ID',
    appId: 'APP_ID',
    measurementId: 'G-MEASUREMENT_ID',
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export const streamTransactionsForUser = (userId, observer) => {
    return db
        .collection('transactions')
        .where('user', '==', userId)
        .onSnapshot(observer)
}
export const streamTransactionsForExpense = (userId, observer) => {
    return db
        .collection('transactions')
        .where('user', '==', userId)
        .where('selectType', '==', 'Expense')
        .onSnapshot(observer)
}
export const streamTransactionsForIncome = (userId, observer) => {
    return db
        .collection('transactions')
        .where('user', '==', userId)
        .where('selectType', '==', 'Income')
        .onSnapshot(observer)
}


export const userRecord = (recordId) => {
    return db.collection('transactions').doc(recordId).get()
}
export default firebase
