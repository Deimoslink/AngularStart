import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PARTS_OF_SPEECH} from '../shared/constants';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  addWordForm: FormGroup;
  partsOfSpeech = PARTS_OF_SPEECH;
  categories = [];
  loadingInProgress = false;
  categoriesMap;

  constructor(private fb: FormBuilder,
              private api: ApiService) {
    this.addWordForm = fb.group({
      'eng': new FormControl({value: null, disabled: false},
        Validators.required),
      'rus': new FormControl({value: null, disabled: false},
        Validators.required),
      'ned': new FormControl({value: null, disabled: false},
        Validators.required),
      'part': new FormControl({value: null, disabled: false},
        Validators.required)
    });
  }

  saveNewWord() {
    const addedCategories = {};
    Object.keys(this.categoriesMap)
      .filter(key => this.categoriesMap[key])
      .map(key => { addedCategories[key] = true; });
    this.api.saveNewWord(Object.assign(this.addWordForm.value, {categories: addedCategories}))
      .subscribe(() => {
        this.addWordForm.reset();
        this.categoriesMap = this.mapCategories();
      });
  }

  getCategories() {
    this.api.getCategories().subscribe(res => {
      this.loadingInProgress = false;
      this.categories = res.map(snapshot => {
        return Object.assign({id: snapshot.key}, snapshot.payload.val());
      });
      this.categoriesMap = this.mapCategories();
    });
  }

  toggleCategory(categoryId) {
    this.categoriesMap[categoryId] = !this.categoriesMap[categoryId];
  }

  mapCategories() {
    const bufferObj: any = {};
    this.categories.map(category => {
      bufferObj[category['id']] = false;
    });
    return bufferObj;
  }

  ngOnInit() {
    this.loadingInProgress = true;
    this.getCategories();
  }

}
