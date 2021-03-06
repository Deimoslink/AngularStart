import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import {ApiService} from './api/api.service';
import {PipesModule} from './pipes/pipes.module';
import {UserService} from './services/user.service';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    PipesModule
  ],
  providers: [
    HttpClient,
    ApiService,
    UserService
  ],
  declarations: []
})
export class SharedModule { }
