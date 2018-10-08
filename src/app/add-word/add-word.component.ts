import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PARTS_OF_SPEECH} from '../shared/constants';
import {from} from 'rxjs';
import {map, zip, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Rx';

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
  selectedFilename: string;
  fileCorrect: boolean;
  CSVImportMode = false;
  currentFile: any;
  private wordsSubject: Subject<void>;
  private ngUnsubscribe = new Subject<void>();
  totalWordsToAdd: number;
  numberOfProcessedWords: any = 0;

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
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.addWordForm.reset();
        this.categoriesMap = this.mapCategories();
        this.wordsSubject.next();
      });
  }

  fileInput(event) {
    const files = event.target.files;
    if (files.length) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFilename = files[0].name;
        const contents = e.target.result.split(/\r\n|\n/);
        const importedWords = contents.map(word => (word.split(','))).filter(el => el.length === 3);
        this.fileCorrect = importedWords.every(el => el.length === 3) && importedWords.length;
        if (this.fileCorrect) {
          this.totalWordsToAdd = importedWords.length;
          this.wordsSubject = new Subject<any>();
          this.CSVImportMode = true;
          from(importedWords).pipe(
            takeUntil(this.wordsSubject),
            zip(this.wordsSubject),
            map((el, index) => ([el[0], index + 1]))
          ).subscribe(
            (el) => {
              this.numberOfProcessedWords = el[1];
              this.addWordForm.controls['eng'].setValue(el[0][0]);
              this.addWordForm.controls['rus'].setValue(el[0][1]);
              this.addWordForm.controls['ned'].setValue(el[0][2]);
              console.log(el)
            },
            () => {} ,
            () => {this.quitAdding()}
          );
          this.wordsSubject.next();
        }
      };
      reader.readAsText(files[0], 'Windows-1251')
    }
  }

  quitAdding() {
    this.numberOfProcessedWords = 0;
    this.CSVImportMode = false;
    this.selectedFilename = '';
    this.currentFile = null;
    this.wordsSubject.complete();
  }

  skipWord() {
    this.wordsSubject.next();
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

  ngOnDestroy() {
    this.wordsSubject.complete();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
