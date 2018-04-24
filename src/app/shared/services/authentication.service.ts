import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {

  constructor() { }

  private emitAuthenticationState = new Subject<any>();
  public authenticationStateStream = this.emitAuthenticationState.asObservable();

  login() {
    console.log('loggin in');
    this.emitAuthenticationState.next(true);
  }

  logout() {
    console.log('loggin out');
    this.emitAuthenticationState.next(false);
  }


}
