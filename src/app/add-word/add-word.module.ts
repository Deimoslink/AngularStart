import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddWordComponent} from './add-word.component';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '../shared/auth/auth-guards';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  { path: '', component: AddWordComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddWordComponent]
})
export class AddWordModule { }
