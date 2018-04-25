import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/auth/authentication.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.scss']
})
export class ComponentBComponent implements OnInit {

  env = environment;

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
