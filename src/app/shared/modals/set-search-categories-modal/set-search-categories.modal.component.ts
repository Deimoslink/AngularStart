import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-set-search-categories-modal',
  templateUrl: './set-search-categories.modal.component.html',
  styleUrls: ['./set-search-categories.modal.component.scss']
})
export class SetSearchCategoriesModalComponent implements OnInit {
  @Input() data;
  @Output() updateCategories = new EventEmitter<any>();
  categoriesMap;
  initialCategories;
  user;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService) {}

  falseToNull(obj) {
    Object.keys(obj).map(key => {
      if (obj[key] === false) {
        obj[key] = null;
      }
    });
  }

  toggleCategory(categoryId) {
    this.categoriesMap[categoryId] = !this.categoriesMap[categoryId];
    this.falseToNull(this.categoriesMap);
    this.updateCategories.emit(this.categoriesMap);
  }

  mapCategories() {
    this.initialCategories = [];
    const bufferObj: any = {};
    this.data.categories.map(category => {
      bufferObj[category['id']] = !!this.data.activeCategoriesMap[category['id']];
    });
    return bufferObj;
  }

  ngOnInit() {
    this.categoriesMap = this.mapCategories();
    this.user = this.userService.getUserData();
  }
}
