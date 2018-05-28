import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {UserService} from '../services/user.service';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {

  public authenticated = !!this.userService.getUser();
  constructor(private userService: UserService,
              private firebaseAuth: AngularFireAuth,
              private router: Router,
              private zone: NgZone) {

  }

  private emitAuthenticationState = new Subject<any>();
  public authenticationStateStream = this.emitAuthenticationState.asObservable();

  signInWithGoogle(): Promise<any> {
    return this.firebaseAuth.auth.signInWithPopup(
      (new firebase.auth.GoogleAuthProvider()).setCustomParameters({prompt: 'select_account'})
    );
  }

  login(): void {
    this.zone.runOutsideAngular(() => {
      if (this.authenticated) {
        return;
      }
      this.signInWithGoogle().then(res => {
        this.zone.run(() => {
          this.userService.setUser(res);
          this.authenticated = true;
          this.emitAuthenticationState.next(this.authenticated);
          this.router.navigate(['']);
        });
      });
    });
  }

  logout(): void {
    if (!this.authenticated) {
      return;
    }
    this.firebaseAuth.auth.signOut().then(res => {
      this.userService.removeUser();
      this.authenticated = false;
      this.emitAuthenticationState.next(this.authenticated);
      this.router.navigate(['/login']);
    });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  };

}
