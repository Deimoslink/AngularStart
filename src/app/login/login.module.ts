import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {LoggedOutGuard} from '../shared/auth/auth-guards';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoggedOutGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
