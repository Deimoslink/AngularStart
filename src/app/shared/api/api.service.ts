import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  simulateError(errCode): Observable<any> {
    return this.http.get('http://localhost:3000/get-error?error=' + errCode);
  }

  fetchData(): Observable<any> {
    return this.http.get('http://localhost:3000/posts');
  }

  recordData(): Observable<any> {
    return this.http.post('http://localhost:3000/posts', {fromClient: 'value from client'});
  }


}
