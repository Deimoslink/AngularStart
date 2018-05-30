import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp(functions.config().firebase);

// https://us-central1-testfirebaseproject-39110.cloudfunctions.net/get_words


export const get_words = functions.https.onRequest((request, response) => {
  const responseParams = {
    page: 1,
    totalPages: 1,
    size: 5
  };
  const responseData = {
    params: responseParams,
    data: []
  };

  request.url.split('?')
    .pop()
    .split('&')
    .map(param => {
      const key = param.split('=').shift();
      const value = parseInt(param.split('=').pop());
      if (responseParams[key]) {
        responseParams[key] = value;
      }
    });


	return admin.database()
				.ref('/110100830308379008504/words')
				.once('value', (snapshot) => {
					const data = Object.keys(snapshot.val()).map(key => {
					  return Object.assign({id: key}, snapshot.val()[key]);
          });
          responseParams.totalPages = Math.ceil(data.length / responseParams.size);
          responseParams.page = responseParams.page > responseParams.totalPages ? responseParams.totalPages : responseParams.page;
          const startWith = (responseParams.page - 1) * responseParams.size;
          const endWith = responseParams.page * responseParams.size;
          responseData.data = [].concat(data).splice(startWith, endWith);
					response.send(responseData);
				})
});
