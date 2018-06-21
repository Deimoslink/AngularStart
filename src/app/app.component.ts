import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
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
  public showMenu = false;
  public authenticated = this.authenticationService.isAuthenticated();

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.showMenu = false;
  }

  constructor(private authenticationService: AuthenticationService,
              private changeDetector: ChangeDetectorRef) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

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
