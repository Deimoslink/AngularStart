import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentAComponent} from "./component-a.component";
import {RouterModule, Routes} from "@angular/router";
import {LoggedInGuard} from "../app-guard";

const routes: Routes = [
  { path: '', component: ComponentAComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [ComponentAComponent]
})
export class ComponentAModule { }
