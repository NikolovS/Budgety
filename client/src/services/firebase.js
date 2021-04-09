import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
	apiKey: "AIzaSyBAAT_R3amiVUf5qXa8syYYeXHFAxfAMvA",
	authDomain: "budgety-a6dd3.firebaseapp.com",
	databaseURL: "https://budgety-a6dd3.firebaseio.com",
	projectId: "budgety-a6dd3",
	storageBucket: "budgety-a6dd3.appspot.com",
	messagingSenderId: "SENDER_ID",
	appId: "1:724447527490:web:5fe81c48e7cafd10a4a3db",
	measurementId: "G-EDE2Z9EYS0",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const streamTransactionsForUser = (
	userId,
	observer,
	selectType,
	order
) => {
	let query = db.collection("transactions").where("user", "==", userId);
	if (selectType) {
		query = query.where("selectType", "==", selectType);
	}
	if (order) {
		query = query.orderBy(order.name, order.type);
	}
	return query.onSnapshot(observer);
};

export const userRecord = (recordId) => {
	return db.collection("transactions").doc(recordId).get();
};

export default firebase;

export const getTransactions = (observer, type, order) => {
	return firebase.auth().onAuthStateChanged((user) => {
		const filter = type !== "" ? type : null;
		const orderBy = order.name !== "" && order.type !== "" ? order : null;
		if (user) {
			let query = db
				.collection("transactions")
				.where("user", "==", user.uid);
			if (filter) {
				query = query.where("selectType", "==", filter);
			}
			if (orderBy) {
				query = query.orderBy(orderBy.name, orderBy.type);
			}
			return query.onSnapshot(observer);
		}
	});
};
