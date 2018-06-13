import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../services/user.service";
import {ApiService} from "../../api/api.service";

@Component({
  selector: 'app-edit-word-categories-modal',
  templateUrl: './edit-word-categories.modal.component.html',
  styleUrls: ['./edit-word-categories.modal.component.scss']
})
export class EditWordCategoriesModalComponent implements OnInit {
  @Input() data;
  @Output() updateCategories = new EventEmitter<any>();
  categoriesMap;
  initialCategories;
  user;
  constructor(public activeModal: NgbActiveModal,
              private apiService: ApiService,
              private userService: UserService) {};

  toggleCategory(categoryId) {
    this.categoriesMap[categoryId] = !this.categoriesMap[categoryId];
    this.apiService.updateWordByKey(this.data.word.id, {categories: this.categoriesMap})
      .subscribe(res => {
        this.categoriesMap = res.categories;
        this.updateCategories.emit(this.categoriesMap);
      });
  }

  mapCategories() {
    this.initialCategories = this.data.word.categories;
    let bufferObj: any = {};
    this.data.categories.map(category => {
      bufferObj[category['id']] = !!this.initialCategories[category['id']];
    });
    return bufferObj;
  }

  ngOnInit() {
    this.categoriesMap = this.mapCategories();
    this.user = this.userService.getUserData();
  }
}
