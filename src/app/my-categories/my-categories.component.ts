import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {COLORS} from '../shared/constants';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.scss']
})
export class MyCategoriesComponent implements OnInit {
  loadingInProgress;
  addCategoryForm: FormGroup;
  colors = COLORS;
  categories = [];

  constructor(private fb: FormBuilder,
              private api: ApiService) {
    this.addCategoryForm = fb.group({
      'categoryName': new FormControl({value: null, disabled: false},
        Validators.required)
    });
  }

  ngOnInit() {
    this.loadingInProgress = true;
    this.getCategories();
  }

  saveNewCategory() {
    this.api.saveNewCategory(this.addCategoryForm.value)
      .subscribe(() => {
        this.addCategoryForm.reset();
      });
  }

  removeCategory(categoryId) {
    this.api.deleteCategoryByKey(categoryId).subscribe(() => {});
  }

  repaintCategory(categoryId, color) {
    this.api.repaintCategoryByKey(categoryId, color).subscribe(() => {});
  }

  getCategories() {
    this.api.getCategories().subscribe(res => {
      this.loadingInProgress = false;
      this.categories = res.map(snapshot => {
        return Object.assign({id: snapshot.key}, snapshot.payload.val());
      });
    }, () => {
      this.loadingInProgress = false;
    });
  }

}
