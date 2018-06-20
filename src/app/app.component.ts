import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {AuthenticationService} from './shared/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  private componentAlive: Subject<void> = new Subject();

  constructor(private authenticationService: AuthenticationService,
              private changeDetector: ChangeDetectorRef) {}

  authenticated = this.authenticationService.isAuthenticated();

  ngOnInit() {
    this.authenticationService.authenticationStateStream.pipe(
      distinctUntilChanged(),
      takeUntil(this.componentAlive)
    ).subscribe(
      (change) => {
        this.authenticated = change;
        this.changeDetector.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.componentAlive.next();
    this.componentAlive.complete();
  }

  logout() {
    this.authenticationService.logout();
  }

}
