import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {COLORS} from '../constants';


@Injectable()
export class ApiService {
  colors = COLORS;

  FUNCTIONS_URL = 'https://us-central1-testfirebaseproject-39110.cloudfunctions.net/';

  constructor(private http: HttpClient,
              private userService: UserService,
              private dbConnection: AngularFireDatabase) {

  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  saveNewWord(newWord) {
    const data = JSON.stringify(newWord);
    const userId = this.userService.getUserId();
    const query = 'https://testfirebaseproject-39110.firebaseio.com/' + userId + '/words.json';
    return this.http.post(query, data);
  }

  saveNewCategory(newCategory) {
    const data = JSON.stringify(Object.assign({color: this.getRandomColor()}, newCategory));
    const userId = this.userService.getUserId();
    const query = 'https://testfirebaseproject-39110.firebaseio.com/' + userId + '/categories.json';
    return this.http.post(query, data);
  }

  getWords(page?, size?, categories?): Observable<any> {
    const userId = this.userService.getUserId();
    let query = this.FUNCTIONS_URL + 'get_words?userId=' + userId;
    if (arguments.length) {
      const params = [];
      if (page) {
        params.push('page=' + page);
      }
      if (size) {
        params.push('size=' + size);
      }
      if (categories && categories.length) {
        query = query + '&categories=' + categories.join(';');
      }
      query = query + '&' + params.join('&');
    }
    return this.http.get(query);
  }

  getRandomWord(categories?): Observable<any> {
    console.log(categories);
    const userId = this.userService.getUserId();
    let query = this.FUNCTIONS_URL + 'get_words?userId=' + userId;
    if (categories && categories.length) {
      query = query + '&categories=' + categories.join(';');
    }
    query = query + '&random';
    return this.http.get(query);
  }

  deleteWordByKey(key): Observable<any> {
    const userId = this.userService.getUserId();
    const query = 'https://testfirebaseproject-39110.firebaseio.com/' + userId + '/words/' + key + '.json';
    return this.http.delete(query);
  }

  deleteCategoryByKey(key): Observable<any> {
    const userId = this.userService.getUserId();
    const query = 'https://testfirebaseproject-39110.firebaseio.com/' + userId + '/categories/' + key + '.json';
    return this.http.delete(query);
  }

  repaintCategoryByKey(key, color): Observable<any> {
    const data = JSON.stringify({color: color});
    const userId = this.userService.getUserId();
    const query = 'https://testfirebaseproject-39110.firebaseio.com/' + userId + '/categories/' + key + '.json';
    return this.http.patch(query, data);
  }

  deleteCategoryFromWord(wordId, categoryId) {
    const userId = this.userService.getUserId();
    const query = 'https://testfirebaseproject-39110.firebaseio.com/' + userId + '/words/' + wordId + '/categories/' + categoryId + '.json';
    return this.http.delete(query);
  }

  updateWordByKey(key, value): Observable<any> {
    const data = JSON.stringify(value);
    const userId = this.userService.getUserId();
    const query = 'https://testfirebaseproject-39110.firebaseio.com/' + userId + '/words/' + key + '.json';
    return this.http.patch(query, data);
  }

  getCategories(): Observable<any> {
    const userId = this.userService.getUserId();
    const query = '/' + userId + '/categories';
    return this.dbConnection.list(query).snapshotChanges();
  }

}
