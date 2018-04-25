import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {

  public authenticated = true;
  constructor() { }

  private emitAuthenticationState = new Subject<any>();
  public authenticationStateStream = this.emitAuthenticationState.asObservable();

  login() {
    console.log('loggin in');
    this.authenticated = true;
    this.emitAuthenticationState.next(this.authenticated);
  }

  logout() {
    console.log('loggin out');
    this.authenticated = false;
    this.emitAuthenticationState.next(this.authenticated);
  }

  isAuthenticated() {
    console.log('isAuthenticated asked');
    return this.authenticated;
  };

}
