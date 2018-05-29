import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './shared/api/http-interceptor.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalsModule} from './shared/modals/modals.module';
import {SharedModule} from './shared/shared.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { MainComponent } from './main/main.component';

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBUMeEqc_FZg2UAnWHVR9mH6fqpt9UIzEE',
  authDomain: 'testfirebaseproject-39110.firebaseapp.com',
  databaseURL: 'https://testfirebaseproject-39110.firebaseio.com',
  projectId: 'testfirebaseproject-39110',
  storageBucket: 'testfirebaseproject-39110.appspot.com',
  messagingSenderId: '966082447044'
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    NgbModule.forRoot(),
    ModalsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
