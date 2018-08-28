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
    let query: string = '';
    let categories = [];
    let speechparts = [];
    let random = false;

    let previousWordId = '';

    request.url.split('?')
      .pop()
      .split('&')
      .map(param => {
        const key = param.split('=').shift();
        const value = param.split('=').pop();
        if (responseParams[key]) {
          responseParams[key] = parseInt(value);
        }
        if (key === 'query') {
          query = value;
        }
        if (key === 'userId') {
          userId = value;
        }
        if (key === 'categories') {
          categories = value.split(';');
        }
        if (key === 'speechparts') {
          speechparts = value.split(';');
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
            if (query) {
              responseParams['query'] = decodeURIComponent(query);
              data = data.filter(el => {
                return `${el.eng} ${el.ned} ${el.rus}`
                  .toLowerCase()
                  .includes(decodeURIComponent(query).toLowerCase());
              });
            }
            if (categories.length) {
              responseParams['categories'] = categories;
              data = data.filter(el => {
                return categories.some(cat => {
                  return el.categories ? el.categories[cat] : false;
                });
              });
            }
            if (speechparts.length) {
              responseParams['speechparts'] = speechparts;
              data = data.filter(el => {
                return speechparts.some(speechpart => {
                  return el.part === speechpart;
                });
              });
            }
            if (random) {
              if (data.length >= 2 && previousWordId) {
                data = data.filter(el => el.id !== previousWordId);
              }
              data = data.sort((a, b) => {
                if(!a.statistics) return -1;
                if(!b.statistics) return 1;
                if(a.statistics.mistakes === b.statistics.mistakes) return 0;
                return a.statistics.attempts / a.statistics.mistakes >= b.statistics.attempts / b.statistics.mistakes ? 1 : -1
              });
              const slicepoint = data.length <= 8 ? data.length : 8;
              const randomWord = data[Math.floor(Math.random() * slicepoint)];
              previousWordId = randomWord.id;
              response.send(randomWord);
            } else {
              responseParams.totalElements = data.length;
              data = data.sort((a, b) => (a.rus > b.rus ? 1 : -1));
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
