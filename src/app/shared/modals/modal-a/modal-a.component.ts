import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-a',
  templateUrl: './modal-a.component.html',
  styleUrls: ['./modal-a.component.scss']
})
export class ModalAComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
