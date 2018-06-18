import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import {ApiService} from './api/api.service';
import {PipesModule} from './pipes/pipes.module';
import {UserService} from './services/user.service';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomColorpickerComponent} from "./components/custom-colorpicker/custom-colorpicker.component";

@NgModule({
  declarations: [
    PaginatorComponent,
    CustomColorpickerComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    ApiService,
    UserService
  ],
  exports: [
    AuthModule,
    PipesModule,
    PaginatorComponent,
    CustomColorpickerComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
