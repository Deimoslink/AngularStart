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
      size: 5,
      totalElements: 1
    };
    const responseData = {
      params: responseParams,
      data: []
    };

    let userId: string = '';
    let categories = [];
    let random = false;

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
        if (key === 'categories') {
          categories = value.split(';');
        }
        if (key === 'random') {
          random = true;
        }
      });

    return admin.database()
          .ref('/' + userId + '/words')
          .once('value', (snapshot) => {
            let data = Object.keys(snapshot.val()).map(key => {
              return Object.assign({id: key}, snapshot.val()[key]);
            });
            if (categories.length) {
              responseParams['categories'] = categories;
              data = data.filter(el => {
                return categories.some(cat => {
                  return el.categories[cat]
                });
              });
            }
            responseParams.totalElements = data.length;
            if (random) {
              response.send(data[Math.floor(Math.random() * data.length)]);
            } else {
              responseParams.totalPages = Math.ceil(data.length / responseParams.size);
              responseParams.page = responseParams.page > responseParams.totalPages ? responseParams.totalPages : responseParams.page;
              const startWith = (responseParams.page - 1) * responseParams.size;
              const endWith = responseParams.size;
              responseData.data = [].concat(data).splice(startWith, endWith);
              response.send(responseData);
            }
          })
  });
});

// https://us-central1-testfirebaseproject-39110.cloudfunctions.net/get_words?userId=110100830308379008504
