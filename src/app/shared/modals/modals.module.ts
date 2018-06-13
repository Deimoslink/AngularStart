import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared.module';
import {EditWordCategoriesModalComponent} from './edit-word-categories-modal/edit-word-categories.modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    EditWordCategoriesModalComponent
  ],
  entryComponents: [
    EditWordCategoriesModalComponent
  ]
})
export class ModalsModule { }
