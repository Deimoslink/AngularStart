import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchByObjKeysPipe} from './search-by-obj-keys.pipe';

@NgModule({
  declarations: [
    SearchByObjKeysPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchByObjKeysPipe
  ]
})
export class PipesModule { }
