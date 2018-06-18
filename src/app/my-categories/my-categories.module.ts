import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyCategoriesComponent} from './my-categories.component';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '../shared/auth/auth-guards';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: MyCategoriesComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  declarations: [MyCategoriesComponent]
})

export class MyCategoriesModule { }
