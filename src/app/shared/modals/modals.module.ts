import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared.module';
import {EditWordCategoriesModalComponent} from './edit-word-categories-modal/edit-word-categories.modal.component';
import {SetCategoriesToGetModalComponent} from './set-categories-to-get-modal/set-categories-to-get.modal.component';
import {SetSearchCategoriesModalComponent} from './set-search-categories-modal/set-search-categories.modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    EditWordCategoriesModalComponent,
    SetCategoriesToGetModalComponent,
    SetSearchCategoriesModalComponent
  ],
  entryComponents: [
    EditWordCategoriesModalComponent,
    SetCategoriesToGetModalComponent,
    SetSearchCategoriesModalComponent
  ]
})
export class ModalsModule { }
