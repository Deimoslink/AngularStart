import { Component, OnInit } from '@angular/core';
import {ApiService} from "../shared/api/api.service";
import {COLORS} from "../shared/constants";

@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.scss']
})
export class MyCategoriesComponent implements OnInit {
  colors = COLORS;
  categories = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getCategories();
  }

  removeCategory(categoryId) {
    this.api.deleteCategoryByKey(categoryId).subscribe(res => console.log(res));
  }

  repaintCategory(categoryId, color) {
    this.api.repaintCategoryByKey(categoryId, color).subscribe(res => console.log(res));
  }

  getCategories() {
    this.api.getCategories().subscribe(res => {
      this.categories = res.map(snapshot => {
        return Object.assign({id: snapshot.key}, snapshot.payload.val());
      });
    })
  }

}
