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

export default firebase
