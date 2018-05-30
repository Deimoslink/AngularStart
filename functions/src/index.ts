import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp(functions.config().firebase);

// https://us-central1-testfirebaseproject-39110.cloudfunctions.net/helloWorld

export const get_words = functions.https.onRequest((request, response) => {
	return admin.database()
				.ref('/110100830308379008504/words')
				.once('value', (snapshot) => {
					const data = snapshot.val();
					response.send(data);
				})
});
