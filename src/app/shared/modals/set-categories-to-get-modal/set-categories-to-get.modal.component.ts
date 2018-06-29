import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-set-categories-to-get-modal',
  templateUrl: './set-categories-to-get.modal.component.html',
  styleUrls: ['./set-categories-to-get.modal.component.scss']
})
export class SetCategoriesToGetModalComponent implements OnInit {
  @Input() data;
  @Output() updateCategories = new EventEmitter<any>();
  categoriesMap;
  user;

  constructor(public activeModal: NgbActiveModal) {}


  toggleCategory(categoryId) {
    this.categoriesMap[categoryId] = !this.categoriesMap[categoryId];
    this.updateCategories.emit(this.categoriesMap);
  }

  mapCategories() {
    const bufferObj: any = {};
    this.data.categories.map(category => {
      bufferObj[category['id']] = this.data.activeCategoriesMap[category['id']];
    });
    return bufferObj;
  }

  ngOnInit() {
    this.categoriesMap = this.mapCategories();
  }
}
