import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'componentA', loadChildren: './component-a/component-a.module#ComponentAModule'},
  {path: 'componentB', loadChildren: './component-b/component-b.module#ComponentBModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
