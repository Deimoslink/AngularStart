import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'add-word', loadChildren: './add-word/add-word.module#AddWordModule'},
  {path: 'my-words', loadChildren: './my-words/my-words.module#MyWordsModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
