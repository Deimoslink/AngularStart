import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  canActivate() {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      // this.router.navigate(['/login'], {queryParams: {redirectURL: window.location.href}});
      return false;
    }
  }

}

@Injectable()
export class LoggedOutGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  canActivate() {
    if (!this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}

