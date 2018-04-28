import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {UserService} from '../services/user.service';

@Injectable()
export class AuthenticationService {

  public authenticated = !!this.userService.getUser();
  constructor(private userService: UserService) { }

  private emitAuthenticationState = new Subject<any>();
  public authenticationStateStream = this.emitAuthenticationState.asObservable();

  login() {
    console.log('loggin in');
    this.userService.setUser({name: 'Deimos'});
    this.authenticated = true;
    this.emitAuthenticationState.next(this.authenticated);
  }

  logout() {
    console.log('loggin out');
    this.userService.removeUser();
    this.authenticated = false;
    this.emitAuthenticationState.next(this.authenticated);
  }

  isAuthenticated() {
    console.log('isAuthenticated asked');
    return this.authenticated;
  };

}
