import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalAComponent} from "./modal-a/modal-a.component";
import {ModalBComponent} from './modal-b/modal-b.component';
import {SharedModule} from "../shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ModalAComponent,
    ModalBComponent
  ],
  entryComponents: [
    ModalAComponent,
    ModalBComponent
  ]
})
export class ModalsModule { }
