import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationService} from './authentication.service';
import {LoggedInGuard} from "./auth-guards";
import {AngularFireAuth} from "angularfire2/auth";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    LoggedInGuard,
    AngularFireAuth
  ]
})
export class AuthModule { }
