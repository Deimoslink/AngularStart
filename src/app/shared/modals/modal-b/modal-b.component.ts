import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-b',
  templateUrl: './modal-b.component.html',
  styleUrls: ['./modal-b.component.scss']
})
export class ModalBComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
