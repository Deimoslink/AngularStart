import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PARTS_OF_SPEECH} from '../shared/constants';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SetCategoriesToGetModalComponent} from '../shared/modals/set-categories-to-get-modal/set-categories-to-get.modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  partsOfSpeech = PARTS_OF_SPEECH;
  targetWordIsSet = false;
  checkDone = false;
  errorStatus = {
    eng: false,
    rus: false,
    ned: false
  };
  targetWord;
  checkFilter = {
    eng: true,
    rus: true,
    ned: false,
    part: true
  };
  statistics = {
    mistakes: 0,
    rightAnswers: 0,
    wordsGenerated: 0,
    attempts: 0
  };
  categories = [];
  checkWordForm: FormGroup;
  modals = {
    setCategories: SetCategoriesToGetModalComponent
  };
  activeCategoriesMap = {};
  selectedCategoriesIds = [];

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private modalService: NgbModal) {
    this.checkWordForm = fb.group({
      'eng': new FormControl({value: null, disabled: true},
        Validators.required),
      'rus': new FormControl({value: null, disabled: true},
        Validators.required),
      'ned': new FormControl({value: null, disabled: true},
        Validators.required),
      'part': new FormControl({value: null, disabled: true})
    });
  }

  disableForm() {
    this.checkWordForm.controls['eng'].disable();
    this.checkWordForm.controls['rus'].disable();
    this.checkWordForm.controls['ned'].disable();
  }

  enableForm() {
    this.checkWordForm.controls['eng'].enable();
    this.checkWordForm.controls['rus'].enable();
    this.checkWordForm.controls['ned'].enable();
  }

  checkRandomWord() {
    this.statistics.attempts++;
    const answers = [];
    Object.keys(this.checkWordForm.value).map(key => {
      this.errorStatus[key] = this.checkWordForm.value[key].toLowerCase() === this.targetWord[key].toLowerCase();
      answers.push(this.errorStatus[key]);
    });
    if (answers.some(el => !el)) {
      this.statistics.mistakes++;
    } else {
      this.statistics.rightAnswers++;
      this.targetWordIsSet = false;
    }
    this.checkDone = true;
  }

  getCategories() {
    this.api.getCategories().subscribe(res => {
      this.categories = res.map(snapshot => {
        return Object.assign({id: snapshot.key}, snapshot.payload.val());
      });
    });
  }

  open(modalName) {
    const modalRef = this.modalService.open(this.modals[modalName], { size: 'lg' });
    modalRef.componentInstance.data = {categories: this.categories, activeCategoriesMap: this.activeCategoriesMap};
    modalRef.componentInstance.updateCategories.subscribe(($e) => {
      this.activeCategoriesMap = $e;
      this.selectedCategoriesIds = Object.keys(this.activeCategoriesMap).filter(key => this.activeCategoriesMap[key]);
    });
  }

  getRandomWord() {
    this.disableForm();
    this.api.getRandomWord(this.selectedCategoriesIds)
      .subscribe((res) => {
        this.targetWord = res;
        const bufferWord = Object.assign({}, this.targetWord);
        Object.keys(bufferWord).map(key => {
          bufferWord[key] = this.checkFilter[key] ? bufferWord[key] : '';
        });
        this.enableForm();
        this.checkWordForm.patchValue(bufferWord);
        this.errorStatus = {
          eng: false,
          rus: false,
          ned: false
        };
        this.checkDone = false;
        this.targetWordIsSet = true;
        this.statistics.wordsGenerated++;
      });
  }

  getTheAnswer() {
    this.checkWordForm.patchValue(this.targetWord);
    this.statistics.mistakes++;
    this.targetWordIsSet = false;
  }

  ngOnInit() {
    this.getCategories();
  }

}
