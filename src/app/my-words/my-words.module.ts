import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyWordsComponent} from "./my-words.component";
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '../shared/auth/auth-guards';

const routes: Routes = [
  { path: '', component: MyWordsComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [MyWordsComponent]
})
export class MyWordsModule { }
