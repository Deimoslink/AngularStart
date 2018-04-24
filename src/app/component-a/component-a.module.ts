import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentAComponent} from "./component-a.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: ComponentAComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [ComponentAComponent]
})
export class ComponentAModule { }
