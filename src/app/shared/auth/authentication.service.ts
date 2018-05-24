import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {UserService} from '../services/user.service';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthenticationService {

  public authenticated = !!this.userService.getUser();
  constructor(private userService: UserService,
              private firebaseAuth: AngularFireAuth) {

  }

  private emitAuthenticationState = new Subject<any>();
  public authenticationStateStream = this.emitAuthenticationState.asObservable();

  signInWithGoogle(): Promise<any> {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  login(): void {
    if (this.authenticated) {
      return;
    }
    this.signInWithGoogle().then(res => {
      console.log('loggin in', res);
      this.userService.setUser(res);
      this.authenticated = true;
      this.emitAuthenticationState.next(this.authenticated);
    });
  }

  logout(): void {
    if (!this.authenticated) {
      return;
    }
    this.firebaseAuth.auth.signOut().then(res => {
      console.log('loggin out', res);
      this.userService.removeUser();
      this.authenticated = false;
      this.emitAuthenticationState.next(this.authenticated);
    });
  }

  isAuthenticated(): boolean {
    console.log('isAuthenticated asked');
    return this.authenticated;
  };

}
