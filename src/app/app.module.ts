import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './shared/api/http-interceptor.service';
import {AuthModule} from './shared/auth/auth.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalsModule} from './shared/modals/modals.module';
import {ApiService} from './shared/api/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule.forRoot(),
    ModalsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
