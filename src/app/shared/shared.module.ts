import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import {ApiService} from './api/api.service';
import {PipesModule} from './pipes/pipes.module';
import {UserService} from './services/user.service';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    PipesModule
  ],
  providers: [
    HttpClient,
    ApiService,
    UserService
  ],
  exports: [
    AuthModule,
    PipesModule,
    PaginatorComponent
  ]
})
export class SharedModule { }
