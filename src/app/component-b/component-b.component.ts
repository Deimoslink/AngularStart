import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/auth/authentication.service';
import {environment} from '../../environments/environment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalAComponent} from '../shared/modals/modal-a/modal-a.component';
import {ModalBComponent} from '../shared/modals/modal-b/modal-b.component';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.scss']
})
export class ComponentBComponent implements OnInit {
  modals = {
    a: ModalAComponent,
    b: ModalBComponent
  };
  env = environment;

  constructor(private authenticationService: AuthenticationService,
              private modalService: NgbModal) { }

  open(modal) {
    const modalRef = this.modalService.open(this.modals[modal]);
    modalRef.componentInstance.name = modal;
  }

  login() {
    this.authenticationService.login();
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {
  }

}
