import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../../services/user.service";
import {ApiService} from "../../api/api.service";

@Component({
  selector: 'app-modal-a',
  templateUrl: './modal-a.component.html',
  styleUrls: ['./modal-a.component.scss']
})
export class ModalAComponent implements OnInit {
  @Input() data;
  categoriesMap;
  initialCategories;
  user;
  constructor(public activeModal: NgbActiveModal,
              private apiService: ApiService,
              private userService: UserService) {};

  toggleCategory(categoryId) {
    this.categoriesMap[categoryId] = !this.categoriesMap[categoryId];
    this.apiService.updateWordByKey(this.data.word.id, {categories: this.categoriesMap})
      .subscribe(res => this.categoriesMap = res.categories);
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
