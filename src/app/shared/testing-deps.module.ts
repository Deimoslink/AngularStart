import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthModule} from './auth/auth.module';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {ApiService} from './api/api.service';
import {PipesModule} from './pipes/pipes.module';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterTestingModule,
    PipesModule
  ],
  providers: [
    HttpClient,
    NgbActiveModal,
    NgbModal,
    NgbModalStack,
    ApiService
  ],
  declarations: []
})
export class TestingDepsModule { }
