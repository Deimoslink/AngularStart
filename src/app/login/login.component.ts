import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/auth/authentication.service';

@Component({
  selector: 'app-component-b',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
