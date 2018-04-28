import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {PipesModule} from './pipes/pipes.module';
import {SharedModule} from './shared.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterTestingModule,
    PipesModule,
    SharedModule
  ],
  providers: [
    NgbActiveModal,
    NgbModal,
    NgbModalStack
  ],
  declarations: []
})
export class TestingDepsModule { }
