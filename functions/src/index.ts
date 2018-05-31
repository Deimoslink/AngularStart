import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
const corsHandler = cors({origin: true});

admin.initializeApp(functions.config().firebase);

// https://us-central1-testfirebaseproject-39110.cloudfunctions.net/get_words


export const get_words = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {

    const responseParams = {
      page: 1,
      totalPages: 1,
      size: 5
    };
    const responseData = {
      params: responseParams,
      data: []
    };

    let userId: string = '';

    request.url.split('?')
      .pop()
      .split('&')
      .map(param => {
        const key = param.split('=').shift();
        const value = param.split('=').pop();
        if (responseParams[key]) {
          responseParams[key] = parseInt(value);
        }
        if (key === 'userId') {
          userId = value;
        }
      });


    return admin.database()
          .ref('/' + userId + '/words')
          .once('value', (snapshot) => {
            const data = Object.keys(snapshot.val()).map(key => {
              return Object.assign({id: key}, snapshot.val()[key]);
            });
            responseParams.totalPages = Math.ceil(data.length / responseParams.size);
            responseParams.page = responseParams.page > responseParams.totalPages ? responseParams.totalPages : responseParams.page;
            const startWith = (responseParams.page - 1) * responseParams.size;
            const endWith = responseParams.size;
            responseData.data = [].concat(data).splice(startWith, endWith);
            response.send(responseData);
          })

  });
});
