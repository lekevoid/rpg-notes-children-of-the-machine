import firebase from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDz7MNWF98N1pH92fteJgpM3ouMW_lR0qQ",
	authDomain: "rpg-notes-cotm.firebaseapp.com",
	projectId: "rpg-notes-cotm",
	storageBucket: "rpg-notes-cotm.appspot.com",
	messagingSenderId: "559069012644",
	appId: "1:559069012644:web:9e784709bb648dfa23fc31",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

firebase.getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			unsubscribe();
			resolve(user);
		}, reject);
	});
};

export { firebase, db };
