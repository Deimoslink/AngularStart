import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/auth/authentication.service';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.scss']
})
export class ComponentBComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  login() {
    this.authenticationService.login();
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {
  }

}
