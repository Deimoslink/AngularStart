import {Component, OnDestroy, OnInit} from '@angular/core';
import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {AuthenticationService} from './shared/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private componentAlive: Subject<void> = new Subject();

  constructor(private authenticationService: AuthenticationService) {}

  authenticated = this.authenticationService.isAuthenticated();

  ngOnInit() {
    this.authenticationService.authenticationStateStream.pipe(
      distinctUntilChanged(),
      takeUntil(this.componentAlive)
    ).subscribe(
      (change) => {this.authenticated = change; console.log('change')}
    )
  }

  ngOnDestroy() {
    this.componentAlive.next();
    this.componentAlive.complete();
  }

}
