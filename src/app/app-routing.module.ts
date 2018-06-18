import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoggedInGuard} from './shared/auth/auth-guards';
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [LoggedInGuard]},
  {path: 'add-word', loadChildren: './add-word/add-word.module#AddWordModule'},
  {path: 'my-words', loadChildren: './my-words/my-words.module#MyWordsModule'},
  {path: 'my-categories', loadChildren: './my-categories/my-categories.module#MyCategoriesModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
