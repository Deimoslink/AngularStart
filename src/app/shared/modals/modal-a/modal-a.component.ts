import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-modal-a',
  templateUrl: './modal-a.component.html',
  styleUrls: ['./modal-a.component.scss']
})
export class ModalAComponent implements OnInit {
  @Input() name;
  user;
  constructor(public activeModal: NgbActiveModal,
              private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUserData();
  }
}
