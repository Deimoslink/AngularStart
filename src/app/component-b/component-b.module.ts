import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentBComponent} from "./component-b.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: ComponentBComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [ComponentBComponent]
})
export class ComponentBModule { }
