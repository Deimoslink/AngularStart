import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchByObjKeysPipe} from './search-by-obj-keys.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SearchByObjKeysPipe
  ]
})
export class PipesModule { }
