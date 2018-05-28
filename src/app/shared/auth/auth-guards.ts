import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) {}

  canActivate() {

    // if (this.user.authenticated()) { return true; }
    // console.log('redirect from', window.location.href);
    // this.router.navigate(['/login'], {queryParams: {redirectURL: window.location.href}});
    // return false;

    return this.authenticationService.isAuthenticated();
  }

}

@Injectable()
export class LoggedOutGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) {}

  canActivate() {
    return !this.authenticationService.isAuthenticated();
  }

}

