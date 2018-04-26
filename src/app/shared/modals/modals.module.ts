import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalAComponent} from "./modal-a/modal-a.component";
import {ModalBComponent} from './modal-b/modal-b.component';

@NgModule({
  imports: [
    CommonModule
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
