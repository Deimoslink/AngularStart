import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationService} from './authentication.service';
import {LoggedInGuard} from "./auth-guards";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationService,
    LoggedInGuard
  ]
})
export class AuthModule { }
