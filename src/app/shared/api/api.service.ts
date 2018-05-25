import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from "../services/user.service";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private dbConnection: AngularFireDatabase) {

  }

  saveNewWord(newWord) {
    const data = JSON.stringify(newWord);
    const userId = this.userService.getUserId();
    const query = 'https://testfirebaseproject-39110.firebaseio.com/' + userId + '/words.json';
    return this.http.post(query, data);
  }

  getWords(): Observable<any> {
    const userId = this.userService.getUserId();
    const query = '/' + userId + '/words';
    return this.dbConnection.list(query, ref => ref).snapshotChanges()
  }

}
